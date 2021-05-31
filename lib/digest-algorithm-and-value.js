'use strict';
const {DigestAlgorithm} = require('./digest-algorithm');

class DigestAlgorithmAndValue {

	constructor(model) {

		if (model['algorithm']) {
			this._algorithm = DigestAlgorithm.getInstanceByApiModel(model['algorithm']);
		}

		if (model['value']) {
			this._value = new Buffer(model['value'], 'base64');
		}

	}

	get algorithm() {
		return this._algorithm;
	}

	get value() {
		return this._value;
	}

	get hexValue() {
		return this._value.toString('hex');
	}

	toModel() {
		return {
			algorithm: this._algorithm.apiModel,
			value: this._value.toString('base64')
		};
	}
}

exports.DigestAlgorithmAndValue = DigestAlgorithmAndValue;