'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');
const { Apis } = require('./enums');

class PadesSignatureFinisher extends SignatureFinisher {

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

      try{
         let apiVersion = await this._client.getApiVersion(Apis.CompletePades);
         if(apiVersion >= 2){
            let request = {
               forceBlobResult: this._forceBlobResult,
               signature: this._signature
            };
   
            let response = await this._client.getRestClient().post(`Api/v2/PadesSignatures/${this._token}/SignedBytes`, request).data;
   
            return new SignatureResult(
               this._client,
               response['signedPdf'],
               response['certificate'],
               response['callbackArgument']
            );
         }
   
         if(!this._signature) {
            let response = await this._client.getRestClient().post(`Api/PadesSignatures/${this._token}/Finalize`).data;
            return new SignatureResult(
                      this._client,
                      {content: response['signedPdf']},
                      response['certificate'],
                      response['callbackArgument']
                  );
         } else {
            let request = {
               signature: this._signature
            };
            let response = await this._client.getRestClient().post(`Api/PadesSignatures/${this._token}/SignedBytes`, request).data;
   
            return new SignatureResult(
                     this._client,
                     {content: response['signedPdf']},
                     response['certificate'],
                     response['callbackArgument']
            );
         }
      } catch (err) { throw err; }
   }
}

exports.PadesSignatureFinisher = PadesSignatureFinisher;