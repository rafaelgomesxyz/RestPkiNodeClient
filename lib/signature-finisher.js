'use strict';

class SignatureFinisher {

	constructor(client) {
		this._client = client;
		this._token = null;
		this._signature = null;
	}

	set token(value) {
		this._token = value;
	}

	set signature(value) {
		this._signature = value;
	}

	finish() {
		throw new Error('This method should be implemented!');
	}
}

exports.SignatureFinisher = SignatureFinisher;