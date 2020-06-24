'use strict';
const fs = require('fs');

const { PKCertificate } = require('./pk-certificate');
const { SignatureStarter } = require('./signature-starter');
const { FileReference } = require('./file-reference');
const { DigestAlgorithm } = require('./digest-algorithm');
const { Apis } = require('./enums');

class CadesSignatureStarter extends SignatureStarter {

   constructor(client) {
      super(client);
      this._fileToSign = null;
      this._cmsToCoSign = null;
      this._encapsulateContent = true;
      this._digestAlgorithmsForDetachedSignature = [ DigestAlgorithm.SHA1, DigestAlgorithm.SHA256];
   }

   setIgnoreRevocationStatusUnknown(value){
      this._ignoreRevocationStatusUnknown = Boolean(value);
   }
   
   getIgnoreRevocationStatusUnknown(){
      return this._ignoreRevocationStatusUnknown;
   }
   
   set ignoreRevocationStatusUnknown(value){
      this.setIgnoreRevocationStatusUnknown(value);
   }

   get ignoreRevocationStatusUnknown(){
      return this.getIgnoreRevocationStatusUnknown();
   }

   setDigestAlgorithmsForDetachedSignature(list){
      this._digestAlgorithmsForDetachedSignature = list;
   }
   
   getDigestAlgorithmsForDetachedSignature(){
      return this._digestAlgorithmsForDetachedSignature;
   }
   
   set digestAlgorithmsForDetachedSignature(value){
      this.setDigestAlgorithmsForDetachedSignature(value);
   }

   get digestAlgorithmsForDetachedSignature(){
      return this.getDigestAlgorithmsForDetachedSignature();
   }
   
   //region setFileToSign
   setFileToSignFromPath(path) {
      this._fileToSign = FileReference.fromFile(path);
   }

   setFileToSignFromContentRaw(contentRaw) {
      this._fileToSign = FileReference.fromContent(contentRaw);
   }

   setFileToSignFromContentBase64(contentBase64) {
      this._fileToSign = FileReference.fromContent(new Buffer(contentBase64, 'base64'));
   }
   
   setFileToSignFromStream(stream) {
      this._fileToSign = FileReference.fromStream(stream);
   }

   setFileToSignFromResult(result) {
      this._fileToSign = FileReference.fromResult(result);
   }

   /**
    * @param {string} path
    */
   set fileToSign(path){
      this.setFileToSignFromPath(path);
   }

   /**
    * @param {Buffer} content
    */
   set fileToSignContent(content){
      this.setFileToSignFromContentRaw(content);
   }
   //endregion

   //region setCmsToCoSign
   setCmsToCoSignFromPath(path) {
      this._cmsToCoSign = FileReference.fromFile(path);
   }

   setCmsToCoSignFromContentRaw(contentRaw) {
      this._cmsToCoSign = FileReference.fromContent(contentRaw);
   }

   setCmsToCoSignFromContentBase64(contentBase64) {
      this._cmsToCoSign = FileReference.fromContent(new Buffer(contentBase64, 'base64'));
   }
   
   setCmsToCoSignFromStream(stream) {
      this._cmsToCoSign = FileReference.fromStream(stream);
   }

   setCmsToCoSignFromResult(result) {
      this._cmsToCoSign = FileReference.fromResult(result);
   }
   
   /**
    * @param {string} path
    */
   set cmsToCoSign(path){
      this.setCmsToCoSignFromPath(path);
   }

   /**
    * @param {Buffer} content
    */
   set cmsToCoSignContent(content){
      this.setCmsToCoSignFromContentRaw(content);
   }
   //endregion

   /**
    * @param {Boolean} value
    */
   set encapsulateContent(value) {
      this._encapsulateContent = Boolean(value);
   }

   async start() {
      let response = await this._startCommon();
      let result = SignatureStarter._getClientSideInstructionsObject(response);

      if (response['certificate']) {
         result['certificate'] = new PKCertificate(response['certificate']);
      }
      return result;
   }

   async startWithWebPki() {
      let response = await this._startCommon();

      let result = {
         token: response['token']
      };

      if (response['certificate']) {
         result['certificate'] = new PKCertificate(response['certificate']);
      }

      return result;
   }

   async _startCommon() {

      if (!this._fileToSign && !this._cmsToCoSign) {
         throw new Error(
             'The content to sign was not set and no CMS to be co-signed was given');
      }
      if (!this._signaturePolicyId) {
         throw new Error('The signature policy was not set');
      }

      let request = await this._startCommonGetRequest();

      let response = null;
      let apiVersion = await this._client.getApiVersion(Apis.StartCades);

      if(apiVersion >= 3){
         try{
            response = await this._client.getRestClient().post('Api/v3/CadesSignatures', request);
         } catch(err) { throw err };
      } else if(apiVersion >= 2) {
         try{
            response = await this._client.getRestClient().post('Api/v2/CadesSignatures', request)
         } catch(err) { throw err };

      } else {
         try{
            response = await this._client.getRestClient().post('Api/CadesSignatures', request)
         } catch(err) { throw err };
      }
      return response;
   }

   async _startCommonGetRequest(){
      let request = {
         signaturePolicyId: this._signaturePolicyId,
         securityContextId: this._securityContextId,
         callbackArgument: this._callbackArgument,
         encapsulateContent: this._encapsulateContent
      };

      if(this._ignoreRevocationStatusUnknown){
         request['ignoreRevocationStatusUnknown'] = this._ignoreRevocationStatusUnknown;
      }
      let apiVersion = await this._client.getApiVersion(Apis.StartCades);
      if(apiVersion >= 3){
         if (this._fileToSign) {
            if (this._encapsulateContent == false) {
               request.DataHashes = await this._fileToSign.computeDataHashes(this._digestAlgorithmsForDetachedSignature);
            } else {
               request.FileToSign = await this._fileToSign.uploadOrReference(this._client);
            }
         }
         if (this._cmsToCoSign) {
            request['cmsToCoSign'] = await this._cmsToCoSign.uploadOrReference(this._client);
         }
      } else if(apiVersion >= 2){
         if (this._fileToSign) {
            request['contentToSign'] = await this._fileToSign.uploadOrReference(this._client);
         }
         if (this._cmsToCoSign) {
            request['cmsToCoSign'] = await this._cmsToCoSign.uploadOrReference(this._client);
         }

      } else {
         if (this._fileToSign) {
            request['contentToSign'] = new Buffer(await this._fileToSign.getContent()).toString('base64');
         }
         if (this._cmsToCoSign) {
            request['cmsToCoSign'] = new Buffer(await this._cmsToCoSign.getContent()).toString('base64');
         }
      }

      if (this._signerCertificate) {
         request['certificate'] = new Buffer(this._signerCertificate).toString('base64');
      }
      return request;
   }
}

exports.CadesSignatureStarter = CadesSignatureStarter;