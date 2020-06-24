'use strict';
const fs = require('fs');

const { SignatureStarter } = require('./signature-starter');
const { PKCertificate } = require('./pk-certificate');
const { FileReference } = require('./file-reference');
const { Apis } = require('./enums');

class PadesSignatureStarter extends SignatureStarter {

   constructor(client) {
      super(client);
      this._bypassMarksIfSigned = true;
      this._pdfMarks = [];

      this._pdfToSign = null;
      this._measurementUnits = null;
      this._pageOptimization = null;
      this._visualRepresentation = null;
   }

   //region setPdfToSign

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

   setPdfToSignFromPath(path) {
      this._pdfToSign = FileReference.fromFile(path);
   }
   
   setPdfToSignFromStream(stream) {
      this._pdfToSign = FileReference.fromStream(stream);
   }

   setPdfToSignFromResult(result) {
      this._pdfToSign = FileReference.fromResult(result);
   }

   setPdfToSignFromContentRaw(contentRaw) {
      this._pdfToSign = FileReference.fromContent(contentRaw);
   }

   setPdfToSignFromContentBase64(contentBase64) {
      this._pdfToSign = FileReference.fromContent(new Buffer(contentBase64, 'base64'));
   }

   /**
    * @param {string} path
    */
   set pdfToSign(path) {
      this.setPdfToSignFromPath(path);
   }

   /**
    * @param {Buffer} contentRaw
    */
   set pdfToSignContent(contentRaw) {
      this.setPdfToSignFromContentRaw(contentRaw);
   }
   //endregion

   set visualRepresentation(value) {
      this._visualRepresentation = value;
   }

   set bypassMarksIfSigned(value) {
      this._bypassMarksIfSigned = value;
   }

   set pdfMarks(value) {
      this._pdfMarks = value;
   }

   set measurementUnits(value) {
      this._measurementUnits = value;
   }

   set pageOptimization(value) {
      this._pageOptimization = value;
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

      if (!this._pdfToSign) {
         throw new Error('The PDF to sign was not set');
      }
      if (!this._signaturePolicyId) {
         throw new Error('The signature policy was not set');
      }

      let request = await this._startCommonGetRequest();

      let apiVersion = await this._client.getApiVersion(Apis.StartPades);
      if(apiVersion >= 2){
         return await this._client.getRestClient().post('Api/v2/PadesSignatures', request);
      }

      return await this._client.getRestClient().post('Api/PadesSignatures', request);
   }

   async _startCommonGetRequest(){
      let request = {
         signaturePolicyId: this._signaturePolicyId,
         securityContextId: this._securityContextId,
         callbackArgument: this._callbackArgument,
         pdfMarks: this._pdfMarks,
         bypassMarksIfSigned: this._bypassMarksIfSigned,
         measurementUnits: this._measurementUnits,
         pageOptimization: this._pageOptimization,
         visualRepresentation: this._visualRepresentation
      };

      if(this._ignoreRevocationStatusUnknown){
         request['ignoreRevocationStatusUnknown'] = this._ignoreRevocationStatusUnknown;
      } 

      let apiVersion = await this._client.getApiVersion(Apis.StartPades);
      if(apiVersion >= 2){
         request['pdfToSign'] = await this._pdfToSign.uploadOrReference();
      } else {
         request['pdfToSign'] = new Buffer(await this._pdfToSign.getContent()).toString('base64');
      }

      if (this._signerCertificate) {
         request['certificate'] = new Buffer(this._signerCertificate).toString('base64');
      }
      return request;
   }
}

exports.PadesSignatureStarter = PadesSignatureStarter;