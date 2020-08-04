'use strict';

class ResourceContentOrReference {

	constructor() {
		this._url = null;
		this._mimeType = null;
		this._content = null;
	}

	get url() {
		return this._url;
	}

	set url(value) {
		this._url = value;
	}

	get mimeType() {
		return this._mimeType;
	}

	set mimeType(value) {
		this._mimeType = value;
	}

	get content() {
		return this._content;
	}

	set content(value) {
		this._content = value;
	}
}

exports.ResourceContentOrReference = ResourceContentOrReference;