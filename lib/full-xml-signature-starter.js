'use strict';
const { XmlSignatureStarter } = require('./xml-signature-starter');
const { PKCertificate } = require('./pk-certificate');

class FullXmlSignatureStarter extends XmlSignatureStarter {

   constructor(client) {
      super(client);
   }

   startWithWebPki() {

      this._verifyCommonParameters(true);

      if (!this._xmlContent) {
         throw new Error('The XML was not set');
      }

      let request = this._getRequest();
      return new Promise((resolve, reject) => {

         this._client.post('Api/XmlSignatures/FullXmlSignature', request)
         .then((response) => {

            let result = {
               token: response['token']
            };
            if (response['certificate']) {
               result['certificate'] = new PKCertificate(response['certificate']);
            }
            resolve(result);

         })
         .catch((err) => reject(err));

      });
   }
}

exports.FullXmlSignatureStarter = FullXmlSignatureStarter;