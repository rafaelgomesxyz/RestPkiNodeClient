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
      try{
         let request = this._getRequest();

         let response = await this._client.getRestClient().post('Api/XmlSignatures/FullXmlSignature', request);
         let result = {
            token: response.data['token']
         };
         if (response.data['certificate']) {
            result['certificate'] = new PKCertificate(response.data['certificate']);
         }

         return result;

      } catch(err) { throw err; }
   }
}

exports.FullXmlSignatureStarter = FullXmlSignatureStarter;