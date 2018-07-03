'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');

class PadesSignatureFinisher extends SignatureFinisher {

   constructor(client) {
      super(client);
   }

   finish() {

      if (!this._token) {
         throw new Error('The token was not set');
      }

      return new Promise((resolve, reject) => {

         if (!this._signature) {

            this._client.post(`Api/PadesSignatures/${this._token}/Finalize`)
            .then((response) => {

               resolve(new SignatureResult(
                   this._client,
                   response['signedPdf'],
                   response['certificate'],
                   response['callbackArgument']
               ));

            })
            .catch((err) => reject(err));

         } else {

            let request = {
               signature: this._signature
            };
            this._client.post(`Api/PadesSignatures/${this._token}/SignedBytes`, request)
            .then((response) => {

               resolve(new SignatureResult(
                   this._client,
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