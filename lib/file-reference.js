'use strict';
const fs = require('fs');
const {ReadableStreamClone, StreamUtils} = require('./stream-utils');
const {DigestAlgorithmAndValue} = require('./digest-algorithm-and-value');
const {FileModel} = require('./file-model');
const {Readable} = require('stream');

class FileReference {

	getStream() {
		let t = new ReadableStreamClone(this._stream);
		this._stream = new ReadableStreamClone(this._stream);
		return t;
	}

	getPath() {
		return this._path;
	}

	getBlob() {
		return this._blobToken;
	}

	static fromStream(stream) {
		let file = new FileReference();

		file._stream = new ReadableStreamClone(stream);
		stream = new ReadableStreamClone(stream);
		return file;
	}

	static fromFile(path) {
		let file = new FileReference();
		file._path = path;
		return file;
	}

	static fromContent(content) {
		let file = new FileReference();
		file._content = content;
		return file;
	}

	static fromResult(result) {
		if (result.getFile().getBlobToken()) {
			let file = new FileReference();
			file._blobToken = result.getFile().getBlobToken();
			return file;
		} else {
			return this.fromContent(result.getFile().getContent());
		}
	}

	static fromBlob(blob) {
		let file = new FileReference();
		file._blobToken = blob.Token;
		return file;
	}

	// endregion

	// region UploadOrReference
	async uploadOrReference(client) {
		try {
			if (this._blobToken) {
				return new FileModel({blobToken: this._blobToken}).toModel();

			} else if (this._content && (this._content.length < client.multipartUploadThreshold)) {
				return new FileModel({content: new Buffer(this._content).toString('base64')}).toModel();

			} else if (this._content) { // content is bigger then threshold
				let blobToken = await client.uploadFileFromContent(this._content);
				return new FileModel({blobToken: blobToken}).toModel();

			} else if (this._stream) {
				let blobToken = await client.uploadFileFromStream(this._stream);
				return new FileModel({blobToken: blobToken}).toModel();

			} else if (this._path) {
				let content = fs.readFileSync(this._path);

				if (content.length > client.multipartUploadThreshold) {
					let blobToken = await client.uploadFileFromContent(content);
					return new FileModel({blobToken: blobToken}).toModel();

				} else { // content is bigger then threshold
					return new FileModel({content: new Buffer(content).toString('base64')}).toModel();
				}
			}
		} catch (err) {
			throw err;
		}
	}

	// endregion

	// region GetContent
	async getContent() {
		if (this._content) {
			return this._content;
		} else if (this._stream) {
			try {
				let stream = new ReadableStreamClone(this._stream);
				this._stream = new ReadableStreamClone(this._stream);
				return await StreamUtils.streamToBuffer(stream);
			} catch (err) {
				throw err;
			}
		} else if (this._path) {
			return fs.readFileSync(this._path);
		} else {
			throw new Error('Invalid operation.');
		}
	}

	// endregion

	// region ComputeDataHashes
	async computeDataHashes(algorithms) {
		try {
			let stream = null;
			if (this._content) {
				stream = new Readable();
				stream._read = () => {
				};
				stream.push(this._content);
				stream.push(null);

			} else if (this._stream) {
				stream = new ReadableStreamClone(this._stream);
				this._stream = new ReadableStreamClone(this._stream);

			} else if (this._path) {
				stream = fs.createReadStream(this._path);

			} else {
				throw new Error('Invalid operation.');
			}
			return await this._computeDataHashes(algorithms, stream);

		} catch (err) {
			throw err;
		}
	}

	_computeDataHashes(algorithms, stream) {
		return new Promise((resolve) => {
			let dataHashes = [];
			let hashersWithApiModel = [];
			let buffer = null;

			// get digestAlgorithm cryptoHash instance and API Model
			algorithms.forEach(digestAlg => {
				let obj = {
					hasher: digestAlg.cryptoHash,
					apiModel: digestAlg.apiModel
				};
				hashersWithApiModel.push(obj)
			});

			stream.on("readable", async () => {
				// Process stream in 2M parts
				while ((buffer = stream.read(2097152)) != null) {
					hashersWithApiModel.forEach(algorithm => {
						algorithm.hasher.write(buffer);
					});
				}
				// Generate dataHashes
				hashersWithApiModel.forEach(algorithm => {
					let model = {
						algorithm: algorithm.apiModel,
						value: algorithm.hasher.digest()
					};

					let dataHash = new DigestAlgorithmAndValue(model);
					dataHashes.push(dataHash.toModel());
				});
				resolve(dataHashes);
			});
		});
	}

	// endregion
}

exports.FileReference = FileReference;