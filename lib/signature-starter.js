'use strict';

class SignatureStarter {

   constructor(client) {
      this._client = client;

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

   static _getClientSideInstructionsObject(response) {
      return {
         token: response['token'],
         toSignData: response['toSignData'],
         toSignHash: response['toSignHash'],
         digestAlgorithmOid: response['digestAlgorithmOid'],
         cryptoSignatureAlgorithm: SignatureStarter._getCryptoSignatureAlgorithm(response['digestAlgorithmOid'])
      }
   }

   static _getCryptoSignatureAlgorithm(oid) {
      switch (oid) {
         case '1.2.840.113549.2.5':
            return 'RSA-MD5';
         case '1.3.14.3.2.26':
            return 'RSA-SHA1';
         case '2.16.840.1.101.3.4.2.1':
            return 'RSA-SHA256';
         case '2.16.840.1.101.3.4.2.2':
            return 'RSA-SHA384';
         case '2.16.840.1.101.3.4.2.3':
            return 'RSA-SHA512';
         default:
            return null;
      }
   }

}

exports.SignatureStarter = SignatureStarter;