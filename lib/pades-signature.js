'use strict';
const {PadesSignerInfo} = require('./pades-signer-info');

class PadesSignature {

	constructor(model) {
		this._signers = [];
		for (let signer of model['signers']) {
			this._signers.push(new PadesSignerInfo(signer));
		}
	}

	get signers() {
		return this._signers;
	}
}

exports.PadesSignature = PadesSignature;