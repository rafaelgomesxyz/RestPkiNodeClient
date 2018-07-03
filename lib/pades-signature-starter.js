'use strict';
const fs = require('fs');

const { SignatureStarter } = require('./signature-starter');
const { PKCertificate } = require('./pk-certificate');

class PadesSignatureStarter extends SignatureStarter {

   constructor(client) {
      super(client);
      this._bypassMarksIfSigned = true;
      this._pdfMarks = [];

      this._pdfToSignContent = null;
      this._measurementUnits = null;
      this._pageOptimization = null;
      this._visualRepresentation = null;
   }

   //region setPdfToSign

   setPdfToSignFromPath(path) {
      this._pdfToSignContent = fs.readFileSync(path);
   }

   setPdfToSignFromContentRaw(contentRaw) {
      this._pdfToSignContent = contentRaw;
   }

   setPdfToSignFromContentBase64(contentBase64) {
      this._pdfToSignContent = new Buffer(contentBase64, 'base64');
   }

   set pdfToSign(path) {
      this.setPdfToSignFromPath(path);
   }

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

         let onFailure = function(err) {
            reject(err);
         };

         let onStartCommonFinished = function(response) {


         };

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

      if (!this._pdfToSignContent) {
         throw new Error('The PDF to sign was not set');
      }
      if (!this._signaturePolicyId) {
         throw new Error('The signature policy was not set');
      }

      let request = {
         signaturePolicyId: this._signaturePolicyId,
         securityContextId: this._securityContextId,
         pdfToSign: new Buffer(this._pdfToSignContent).toString('base64'),
         callbackArgument: this._callbackArgument,
         pdfMarks: this._pdfMarks,
         bypassMarksIfSigned: this._bypassMarksIfSigned,
         measurementUnits: this._measurementUnits,
         pageOptimization: this._pageOptimization,
         visualRepresentation: this._visualRepresentation
      };

      if (this._signerCertificate) {
         request['certificate'] = new Buffer(this._signerCertificate).toString(
             'base64');
      }

      return this._client.post('Api/PadesSignatures', request);
   }
}

exports.PadesSignatureStarter = PadesSignatureStarter;