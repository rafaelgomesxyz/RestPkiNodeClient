'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');
const { Apis } = require('./enum');

class CadesSignatureFinisher extends SignatureFinisher {

   constructor(client) {
      super(client);
   }

   getForceBlobResult(){
      return this._forceBlobResult;
   }

   setForceBlobResult(value){
      this._forceBlobResult = Boolean(value);
   }

   get forceBlobResult(){
      return this.getForceBlobResult();
   }

   set forceBlobResult(value){
      this.setForceBlobResult(value);
   }

   async finish() {

      if (!this._token) {
         throw new Error('The token was not set');
      }

      if(this._client.getApiVersion(Apis.CompleteCades) > 2){
         let request = {
            forceBlobResult: this._forceBlobResult,
            signature: this._signature
         };

         let response = await this._client.getRestClient().post(`Api/v2/CadesSignatures/${this._token}/SignedBytes`, request);

         return new SignatureResult(
            this._client,
            response['cms'],
            response['certificate'],
            response['callbackArgument']
         );
      }

      if (!this._signature) {
         let response = await this._client.getRestClient().post(`Api/CadesSignatures/${this._token}/Finalize`);

         return new SignatureResult(
            this._client,
            {content: response['cms']},
            response['certificate'],
            response['callbackArgument']
         );
      } else {
         let request = {
            signature: this._signature
         };

         let response = await this._client.getRestClient().post(`Api/CadesSignatures/${this._token}/SignedBytes`, request);

         return new SignatureResult(
            this._client,
            {content: response['cms']},
            response['certificate'],
            response['callbackArgument']
         );
      }
   }
}

exports.CadesSignatureFinisher = CadesSignatureFinisher;