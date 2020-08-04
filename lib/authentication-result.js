'use strict';
const {ValidationResults} = require('./validation');
const {PKCertificate} = require('./pk-certificate');

class AuthenticationResult {

	constructor(model) {
		if (model['validationResults']) {
			this._validationResults = new ValidationResults(model['validationResults']);
		}
		if (model['certificate']) {
			this._certificate = new PKCertificate(model['certificate']);
		}
	}

	get validationResults() {
		return this._validationResults;
	}

	get certificate() {
		return this._certificate;
	}
}

exports.AuthenticationResult = AuthenticationResult;