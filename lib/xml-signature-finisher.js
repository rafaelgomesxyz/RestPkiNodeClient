'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');

class XmlSignatureFinisher extends SignatureFinisher {

   constructor(client) {
      super(client);
      this._signedXml = null;
   }

   finish() {

      if (!this._token) {
         throw new Error('The token was not set');
      }

      return new Promise((resolve, reject) => {

         let self = this;
         this._client.post(`Api/XmlSignatures/${this._token}/Finalize`)
         .then((response) => {
            resolve(new SignatureResult(
                self._client,
                response['signedXml'],
                response['certificate']
            ));
         })
         .catch((err) => reject(err));
      });
   }

}

exports.XmlSignatureFinisher = XmlSignatureFinisher;