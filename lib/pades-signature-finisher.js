'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');

class PadesSignatureFinisher extends SignatureFinisher {

   constructor(client) {
      super(client);
      this._signedPdf = null;
   }

   finish() {

      if (!this._token) {
         throw new Error('The token was not set');
      }

      return new Promise((resolve, reject) => {

         let self = this;
         if (!self._signature) {

            self._client.post(`Api/PadesSignatures/${self._token}/Finalize`)
            .then((response) => {

               resolve(new SignatureResult(
                   self._client,
                   response['signedPdf'],
                   response['certificate'],
                   response['callbackArgument']
               ));

            })
            .catch((err) => reject(err));

         } else {

            let request = {
               signature: self._signature
            };
            self._client.post(`Api/PadesSignatures/${self._token}/SignedBytes`, request)
            .then((response) => {

               resolve(new SignatureResult(
                   self._client,
                   response['signedPdf'],
                   response['certificate'],
                   response['callbackArgument']
               ));

            })
            .catch((err) => reject(err));

         }
      });
   }
}

exports.PadesSignatureFinisher = PadesSignatureFinisher;