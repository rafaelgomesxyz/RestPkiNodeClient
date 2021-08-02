'use strict';
const {CadesSignerInfo} = require('./cades-signature');

class PadesSignerInfo extends CadesSignerInfo {

	constructor(model) {
		super(model);
		this._isDocumentTimestamp = model['isDocumentTimestamp'];
		this._signatureFieldName = model['signatureFieldName'];
		this._hasLtv = model['hasLtv'];
	}

	get isDocumentTimestamp() {
		return this._isDocumentTimestamp;
	}

	get signatureFieldName() {
		return this._signatureFieldName;
	}

	get hasLtv() {
		return this._hasLtv;
	}
}

exports.PadesSignerInfo = PadesSignerInfo;