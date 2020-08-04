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
		if (result.getFile().blobToken) {
			let file = new FileReference();
			file._blobToken = result.getFile().blobToken;
			return file;
		} else {
			return this.fromContent(result.getFile().content);
		}
	}

	static fromBlob(blob) {
		let file = new FileReference();
		file._blobToken = blob.token;
		return file;
	}

	// endregion

	// region UploadOrReference
	async uploadOrReference(client) {
		try {
			if (this._blobToken) {
				return new FileModel({blobToken: this._blobToken}).toModel();

			} else if (this._content && (this._content.length < client.multipartUploadThreshold)) {
				return new FileModel({content: new Buffer(this._content).toString('base64')});

			} else {
				return this._openOrUseExistingStream(async s => {
					if (s.readableLength < client.multipartUploadThreshold) {
						let buf = await StreamUtils.streamToBuffer(s);
						return new FileModel({content: new Buffer(buf).toString('base64')});
					} else {
						let uploadResult = await client._uploadOrRead(s);
						if ((typeof uploadResult) == 'string') {
							return new FileModel({blobToken: uploadResult});
						} else {
							return new FileModel({content: new Buffer(uploadResult).toString('base64')});
						}
					}
				});
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

			return this._openOrUseExistingStream(async s => await this._computeDataHashes(algorithms, s));

		} catch (err) {
			throw err;
		}
	}

	_computeDataHashes(algorithms, stream) {
		return new Promise((resolve) => {
			let dataHashes = [];
			let buffer = null;

			// get digestAlgorithm cryptoHash instance and API Model
			let hashersWithApiModel = algorithms.map(digestAlg => {
				return {
					hasher: digestAlg.cryptoHash,
					apiModel: digestAlg.apiModel
				};
			});

			stream.on("readable", () => {
				// Process stream in 2M parts
				while ((buffer = stream.read(2097152)) != null) {
					hashersWithApiModel.forEach(algorithm => {
						algorithm.hasher.write(buffer);
					});
				}
			});

			stream.on("end", () => {
				// Generate dataHashes
				for (let algorithm of hashersWithApiModel) {
					let model = {
						algorithm: algorithm.apiModel,
						value: algorithm.hasher.digest()
					};

					let dataHash = new DigestAlgorithmAndValue(model);
					dataHashes.push(dataHash.toModel());
				}

				resolve(dataHashes);
			});
		});
	}

	// endregion

	_openOrUseExistingStream(actionCallback) {
		if (this._content) {
			let stream = new Readable();
			stream._read = () => {
			};
			stream.push(this._content);
			stream.push(null);
			return actionCallback(stream);

		} else if (this._stream) {
			let stream = new ReadableStreamClone(this._stream);
			this._stream = new ReadableStreamClone(this._stream);
			return actionCallback(stream);

		} else if (this._path) {
			let stream = fs.createReadStream(this._path);
			return actionCallback(stream);
		} else {
			throw new Error('Invalid operation.');
		}
	}
}

exports.FileReference = FileReference;