'use strict';

class FileModel {
	constructor(file) {
		this.mimeType = file['mimeType'] || null;
		this.content = file['content'] || null;
		this.blobToken = file['blobToken'] || null;
		this.url = file['url'] || null;
	}

}

exports.FileModel = FileModel;