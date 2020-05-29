'use strict';
const fs = require('fs');
const { ReadableStreamClone, StreamUtils } = require('./stream-utils');
const { DigestAlgorithmAndValue } = require('./digest-algorithm-and-value');

class FileReference {

    getStream(){
        let t = new ReadableStreamClone(this._stream);
        this._stream = new ReadableStreamClone(this._stream);
        return t;
    }

    getPath(){
        return this._path;
    }

    getBlob(){
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
        if (this._blobToken) {
            return new FileModel({ blobToken: this._blobToken });

        } else if (this._content && (this._content.length < client.multipartUploadThreshold)) {
            return new FileModel({ content: new Buffer(this._content).toString('base64') });

        } else if (this._content) { // content is bigger then threshold
            let blobToken = await client.uploadFileFromContent(this._content);
            return new FileModel({blobToken: blobToken});

        } else if(this._stream){
            let blobToken = await client.uploadFileFromStream(this._stream);
            return new FileModel({blobToken: blobToken});

        } else if(this._path){
            let content = fs.readFileSync(this._path);

            if(content.length > client.multipartUploadThreshold){
                let blobToken = await client.uploadFileFromContent(content);
                return new FileModel({blobToken: blobToken});

            } else { // content is bigger then threshold
                return new FileModel({ content: new Buffer(content).toString('base64') });
            }
        }
    }
    // endregion

    // region GetContent
    async getContent() {
        if (this._content) {
            return this._content;
        } else if(this._stream){
            let stream = new ReadableStreamClone(this._stream);
            this._stream = new ReadableStreamClone(this._stream);
            return await StreamUtils.streamToBufferAsync(stream);
        } else if(this._path){
            return fs.readFileSync(this._path);
        } else {
            throw new Error('Invalid operation.');
        }
    }
    // endregion

    // region ComputeDataHashes
    async computeDataHashes(algorithms) {
        let content = null;
        if (this._content) {
            content = _computeDataHashes(this._content);

        } else if(this._stream){
            let stream = new ReadableStreamClone(this._stream);
            this._stream = new ReadableStreamClone(this._stream);
            content = await StreamUtils.streamToBufferAsync(stream);

        } else if(this._path){
            content = fs.readFileSync(this._path);

        } else {
            throw new Error('Invalid operation.');
        }

        let dataHashes = new [];

        for(digestAlg of algorithms){
            let model = {
                algorithm: digestAlg.apiModel,
                value: digestAlg.computeHash(content)
            };

            let dataHash = new DigestAlgorithmAndValue(model);
            dataHashes.push(dataHash.toModel());
        }
        return dataHashes;
    }
    // endregion
}

exports.FileReference = FileReference;