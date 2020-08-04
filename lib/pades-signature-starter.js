'use strict';
const fs = require('fs');

const {SignatureStarter} = require('./signature-starter');
const {PKCertificate} = require('./pk-certificate');
const {FileReference} = require('./file-reference');
const {Apis} = require('./enums');

class PadesSignatureStarter extends SignatureStarter {

	constructor(client) {
		super(client);
		this._bypassMarksIfSigned = true;
		this._pdfMarks = [];

		this._pdfToSign = null;
		this._measurementUnits = null;
		this._pageOptimization = null;
		this._visualRepresentation = null;
		this._customSignatureFieldName = null;
		this._certificationLevel = null;
	}

	//region setPdfToSign

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

	setPdfToSignFromPath(path) {
		this._pdfToSign = FileReference.fromFile(path);
	}

	setPdfToSignFromStream(stream) {
		this._pdfToSign = FileReference.fromStream(stream);
	}

	setPdfToSignFromResult(result) {
		this._pdfToSign = FileReference.fromResult(result);
	}

	setPdfToSignFromContentRaw(contentRaw) {
		this._pdfToSign = FileReference.fromContent(contentRaw);
	}

	setPdfToSignFromContentBase64(contentBase64) {
		this._pdfToSign = FileReference.fromContent(new Buffer(contentBase64, 'base64'));
	}

	/**
	 * @param {string} path
	 */
	set pdfToSign(path) {
		this.setPdfToSignFromPath(path);
	}

	/**
	 * @param {Buffer} contentRaw
	 */
	set pdfToSignContent(contentRaw) {
		this.setPdfToSignFromContentRaw(contentRaw);
	}

	//endregion

	set visualRepresentation(value) {
		this._visualRepresentation = value;
	}

	set bypassMarksIfSigned(value) {
		this._bypassMarksIfSigned = value;
	}

	set pdfMarks(value) {
		this._pdfMarks = value;
	}

	set measurementUnits(value) {
		this._measurementUnits = value;
	}

	set pageOptimization(value) {
		this._pageOptimization = value;
	}

	get customSignatureFieldName() {
		return this._customSignatureFieldName;
	}

	set customSignatureFieldName(value) {
		this._customSignatureFieldName = value;
	}

	get certificationLevel() {
		return this._certificationLevel;
	}

	set certificationLevel(value) {
		this._certificationLevel = value;
	}

	async start() {
		try {
			let response = await this._startCommon();
			let result = SignatureStarter._getClientSideInstructionsObject(response);

			if (response['certificate']) {
				result['certificate'] = new PKCertificate(response['certificate']);
			}

			return result;

		} catch (err) {
			throw err;
		}
	}

	async startWithWebPki() {
		try {
			let response = await this._startCommon();

			let result = {
				token: response['token']
			};

			if (response['certificate']) {
				result['certificate'] = new PKCertificate(response['certificate']);
			}

			return result;

		} catch (err) {
			throw err;
		}
	}

	async _startCommon() {

		if (!this._pdfToSign) {
			throw new Error('The PDF to sign was not set');
		}
		if (!this._signaturePolicyId) {
			throw new Error('The signature policy was not set');
		}

		try {
			let request = await this._startCommonGetRequest();

			let apiVersion = await this._client.getApiVersion(Apis.StartPades);
			if (apiVersion >= 2) {
				let response = await this._client.getRestClient().post('Api/v2/PadesSignatures', request);
				return response.data;
			}
			let response = await this._client.getRestClient().post('Api/PadesSignatures', request);
			return response.data;
		} catch (err) {
			throw err;
		}
	}

	async _startCommonGetRequest() {
		let request = {
			signaturePolicyId: this._signaturePolicyId,
			securityContextId: this._securityContextId,
			callbackArgument: this._callbackArgument,
			pdfMarks: this._pdfMarks,
			bypassMarksIfSigned: this._bypassMarksIfSigned,
			measurementUnits: this._measurementUnits,
			pageOptimization: this._pageOptimization,
			visualRepresentation: this._visualRepresentation,
			customSignatureFieldName: this._customSignatureFieldName,
			certificationLevel: this._certificationLevel,
		};

		if (this._ignoreRevocationStatusUnknown) {
			request['ignoreRevocationStatusUnknown'] = this._ignoreRevocationStatusUnknown;
		}

		try {
			let apiVersion = await this._client.getApiVersion(Apis.StartPades);
			if (apiVersion >= 2) {
				request['pdfToSign'] = await this._pdfToSign.uploadOrReference(this._client);
			} else {
				request['pdfToSign'] = new Buffer(await this._pdfToSign.getContent()).toString('base64');
			}

			if (this._signerCertificate) {
				request['certificate'] = new Buffer(this._signerCertificate).toString('base64');
			}
			return request;

		} catch (err) {
			throw err;
		}
	}
}

exports.PadesSignatureStarter = PadesSignatureStarter;