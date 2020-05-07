'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');

class PadesSignatureFinisher extends SignatureFinisher {

   constructor(client) {
      super(client);
   }

   async finish() {

      if (!this._token) {
         throw new Error('The token was not set');
      }

      if(!this._signature) {
         let response = await this._client.post(`Api/PadesSignatures/${this._token}/Finalize`);
         return new SignatureResult(
                   this._client,
                   response['signedPdf'],
                   response['certificate'],
                   response['callbackArgument']
               );
      } else {
         let request = {
            signature: this._signature
         };
         let response = await this._client.post(`Api/PadesSignatures/${this._token}/SignedBytes`, request);

         return new SignatureResult(
                  this._client,
                  response['signedPdf'],
                  response['certificate'],
                  response['callbackArgument']
         );
      }
   }
}

exports.PadesSignatureFinisher = PadesSignatureFinisher;