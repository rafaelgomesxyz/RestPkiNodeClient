'use strict';
const { XmlSignatureStarter } = require('./xml-signature-starter');
const { PKCertificate } = require('./pk-certificate');

class FullXmlSignatureStarter extends XmlSignatureStarter {

   constructor(client) {
      super(client);
   }

   async startWithWebPki() {

      this._verifyCommonParameters(true);

      if (!this._xmlContent) {
         throw new Error('The XML was not set');
      }

      let request = this._getRequest();

      let response = await this._client.post('Api/XmlSignatures/FullXmlSignature', request);
      let result = {
         token: response['token']
      };
      if (response['certificate']) {
         result['certificate'] = new PKCertificate(response['certificate']);
      }

      return result;
   }
}

exports.FullXmlSignatureStarter = FullXmlSignatureStarter;