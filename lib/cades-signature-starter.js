'use strict';
const fs = require('fs');

const { PKCertificate } = require('./pk-certificate');
const { SignatureStarter } = require('./signature-starter');

class CadesSignatureStarter extends SignatureStarter {

   constructor(client) {
      super(client);
      this._fileToSignContent = null;
      this._cmsToCoSignContent = null;
      this._encapsulateContent = true;
   }

   //region setFileToSign

   setFileToSignFromPath(path) {
      this._fileToSignContent = fs.readFileSync(path);
   }

   setFileToSignFromContentRaw(contentRaw) {
      this._fileToSignContent = contentRaw;
   }

   setFileToSignFromContentBase64(contentBase64) {
      this._fileToSignContent = new Buffer(contentBase64, 'base64');
   }

   set fileToSign(path) {
      this.setFileToSignFromPath(path);
   }

   set fileToSignContent(contentRaw) {
      this.setFileToSignFromContentRaw(contentRaw);
   }

   //endregion

   //region setCmsToCoSign

   setCmsToCoSignFromPath(path) {
      this._cmsToCoSignContent = fs.readFileSync(path);
   }

   setCmsToCoSignFromContentRaw(contentRaw) {
      this._cmsToCoSignContent = contentRaw;
   }

   setCmsToCoSignFromContentBase64(contentBase64) {
      this._cmsToCoSignContent = new Buffer(contentBase64, 'base64');
   }

   set cmsToCoSign(path) {
      this.setCmsToCoSignFromPath(path);
   }

   set cmsToCoSignContent(contentRaw) {
      this.setCmsToCoSignFromContentRaw(contentRaw);
   }

   //endregion

   set encapsulateContent(value) {
      this._encapsulateContent = value;
   }

   start() {

      return new Promise((resolve, reject) => {

         this._startCommon()
         .then((response) => {

            let result = SignatureStarter._getClientSideInstructionsObject(response);
            if (response['certificate']) {
               result['certificate'] = new PKCertificate(response['certificate']);
            }
            resolve(result);

         })
         .catch((err) => reject(err));
      });
   }

   startWithWebPki() {

      return new Promise((resolve, reject) => {

         this._startCommon()
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

   _startCommon() {

      if (!this._fileToSignContent && !this._cmsToCoSignContent) {
         throw new Error(
             'The content to sign was not set and no CMS to be co-signed was given');
      }
      if (!this._signaturePolicyId) {
         throw new Error('The signature policy was not set');
      }

      let request = {
         signaturePolicyId: this._signaturePolicyId,
         securityContextId: this._securityContextId,
         callbackArgument: this._callbackArgument,
         encapsulateContent: this._encapsulateContent
      };

      if (this._fileToSignContent) {
         request['contentToSign'] = new Buffer(this._fileToSignContent).toString(
             'base64');
      }

      if (this._cmsToCoSignContent) {
         request['cmsToCoSign'] = new Buffer(this._cmsToCoSignContent).toString(
             'base64');
      }

      if (this._signerCertificate) {
         request['certificate'] = new Buffer(this._signerCertificate).toString(
             'base64');
      }

      return this._client.post('Api/CadesSignatures', request);
   }

}

exports.CadesSignatureStarter = CadesSignatureStarter;