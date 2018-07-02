'use strict';

class SignatureStarter {

   constructor(client) {
      this._client = client;
      this._done = false;
      this._certificateInfo = null;

      this._signerCertificate = null;
      this._signaturePolicyId = null;
      this._securityContextId = null;
      this._callbackArgument = null;
   }

   set signerCertificate(value) {
      this._signerCertificate = value;
   }

   set signaturePolicy(value) {
      this._signaturePolicyId = value;
   }

   set securityContext(value) {
      this._securityContextId = value;
   }

   set callbackArgument(value) {
      this._callbackArgument = value;
   }

   start() {
      throw new Error('This method should be implemented!');
   }

   startWithWebPki() {
      throw new Error('This method should be implemented!');
   }

}

exports.SignatureStarter = SignatureStarter;