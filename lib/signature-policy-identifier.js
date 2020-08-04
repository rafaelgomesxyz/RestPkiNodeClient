'use strict';
const {DigestAlgorithmAndValue} = require('./digest-algorithm-and-value');

class SignaturePolicyIdentifier {

	constructor(model) {
		this._digest = new DigestAlgorithmAndValue(model['digest']);
		this._oid = model['oid'];
		this._uri = model['uri'];
	}

	get digest() {
		return this._digest;
	}

	get oid() {
		return this._oid;
	}

	get uri() {
		return this._uri;
	}
}

exports.SignaturePolicyIdentifier = SignaturePolicyIdentifier;