'use strict';
const fs = require('fs');

class SignatureExplorer {

	constructor(client) {
		this._client = client;
		this._signatureFileContent = null;
		this._validate = true;
		this._defaultSignaturePolicyId = null;
		this._acceptableExplicitPolicies = null;
		this._securityContextId = null;
		this._ignoreRevocationStatusUnknown = null;
		this._trustUncertifiedSigningTime = null;
	}

	//region setSignatureFile

	setSignatureFileFromPath(path) {
		this._signatureFileContent = fs.readFileSync(path);
	}

	setSignatureFileFromContentRaw(contentRaw) {
		this._signatureFileContent = contentRaw;
	}

	setSignatureFileFromContentBase64(contentBase64) {
		this._signatureFileContent = new Buffer(contentBase64, 'base64');
	}

	set signatureFile(path) {
		this.setSignatureFileFromPath(path);
	}

	set signatureFileContent(contentRaw) {
		this.setSignatureFileFromContentRaw(contentRaw);
	}

	//endregion

	//region setIgnoreRevocationStatusUnknown
	
	setIgnoreRevocationStatusUnknown(value) {
		this._ignoreRevocationStatusUnknown = value;
	}

	getIgnoreRevocationStatusUnknown() {
		return this._ignoreRevocationStatusUnknown;
	}

	set ignoreRevocationStatusUnknown(value) {
		this.setIgnoreRevocationStatusUnknown(value);
	}

	get ignoreRevocationStatusUnknown() {
		return this.getIgnoreRevocationStatusUnknown();
	}

	//endregion

	//region setTrustUncertifiedSigningTime
	
	setTrustUncertifiedSigningTime(value) {
		this._trustUncertifiedSigningTime = value;
	}

	getTrustUncertifiedSigningTime() {
		return this._trustUncertifiedSigningTime;
	}

	set trustUncertifiedSigningTime(value) {
		this.setTrustUncertifiedSigningTime(value);
	}

	get trustUncertifiedSigningTime() {
		return this.getTrustUncertifiedSigningTime();
	}

	//endregion

	set validate(validate) {
		this._validate = validate;
	}

	set defaultSignaturePolicyId(signaturePolicyId) {
		this._defaultSignaturePolicyId = signaturePolicyId;
	}

	set acceptableExplicitPolicies(policyCatalog) {
		this._acceptableExplicitPolicies = policyCatalog;
	}

	set securityContextId(securityContextId) {
		this._securityContextId = securityContextId;
	}

	_getRequest(mimeType) {

		let request = {
			validate: this._validate,
			defaultSignaturePolicyId: this._defaultSignaturePolicyId,
			securityContextId: this._securityContextId,
			acceptableExplicitPolicies: this._acceptableExplicitPolicies
		};

		if (this._signatureFileContent) {
			request['file'] = {
				content: new Buffer(this._signatureFileContent).toString('base64'),
				mimeType: mimeType
			};
		}

		if (this._ignoreRevocationStatusUnknown) {
			request['ignoreRevocationStatusUnknown'] = this._ignoreRevocationStatusUnknown;
		}

		if (this._trustUncertifiedSigningTime) {
			request['trustUncertifiedSigningTime'] = this._trustUncertifiedSigningTime;
		}

		return request;
	}
}

exports.SignatureExplorer = SignatureExplorer;