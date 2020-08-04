'use strict';
const fs = require('fs');

const {SignatureStarter} = require('./signature-starter');

class XmlSignatureStarter extends SignatureStarter {

	constructor(client) {
		super(client);
		this._xmlContent = null;
		this._signatureElementId = null;
		this._signatureElementLocationXPath = null;
		this._signatureElementLocationNsm = null;
		this._signatureElementLocationInsertionOption = null;
	}

	// region setXmlToSign

	setXmlToSignFromPath(path) {
		this._xmlContent = fs.readFileSync(path);
	}

	setXmlToSignFromContentRaw(contentRaw) {
		this._xmlContent = contentRaw;
	}

	setXmlToSignFromContentBase64(contentBase64) {
		this._xmlContent = new Buffer(contentBase64, 'base64');
	}

	set xmlToSign(path) {
		this.setXmlToSignFromPath(path);
	}

	set xmlToSignContent(contentRaw) {
		this.setXmlToSignFromContentRaw(contentRaw);
	}

	// endregion

	setSignatureElementLocation(xpath, insertionOption, namespaceManager) {
		this._signatureElementLocationXPath = xpath;
		this._signatureElementLocationInsertionOption = insertionOption;
		this._signatureElementLocationNsm = namespaceManager || null;
	}

	set signatureElementId(signatureElementId) {
		this._signatureElementId = signatureElementId;
	}

	/**
	 *
	 * @param isWithWebPki
	 * @protected
	 */
	_verifyCommonParameters(isWithWebPki) {
		isWithWebPki = isWithWebPki || false;

		if (!isWithWebPki) {
			if (!this._signerCertificate) {
				throw new Error('The certificate was not set');
			}
		}

		if (!this._xmlContent) {
			throw new Error('The XML was not set');
		}

		if (!this._signaturePolicyId) {
			throw new Error('The signature policy was not set');
		}
	}

	/**
	 *
	 * @protected
	 */
	_getRequest() {

		let request = {
			signaturePolicyId: this._signaturePolicyId,
			securityContextId: this._securityContextId,
			signatureElementId: this._signatureElementId
		};

		if (this._xmlContent) {
			request['xml'] = new Buffer(this._xmlContent).toString('base64');
		}

		if (this._signatureElementLocationXPath &&
			this._signatureElementLocationInsertionOption) {

			request['signatureElementLocation'] = {
				xPath: this._signatureElementLocationXPath,
				insertionOption: this._signatureElementLocationInsertionOption
			};

			if (this._signatureElementLocationNsm) {
				request['signatureElementLocation']['namespaces'] = this._signatureElementLocationNsm;
			}
		}

		return request;
	}
}

exports.XmlSignatureStarter = XmlSignatureStarter;