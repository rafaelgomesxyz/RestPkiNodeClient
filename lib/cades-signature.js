'use strict';
const { CadesSignerInfo } = require('./cades-signer-info');
const { DigestAlgorithmAndValue } = require('./digest-algorithm-and-value');

class CadesSignature {

   constructor(model) {
      this._encapsulatedContentType = model['encapsulatedContentType'];
      this._hasEncapsulatedContent = model['hasEncapsulatedContent'];
      this._signers = [];
      if (model['signers']) {
         for (let signer of model['signers']) {
            this._signers.push(new CadesSignerInfo(signer));
         }
      }
   }

   get encapsulatedContentType() {
      return this._encapsulatedContentType;
   }

   get hasEncapsulatedContent() {
      return this._hasEncapsulatedContent;
   }

   get signers() {
      return this._signers;
   }
}

class CadesTimestamp extends CadesSignature {

   constructor(model) {
      super(model);
      this._genTime = model['genTime'];
      this._serialNumber = model['serialNumber'];
      this._messageImprint = new DigestAlgorithmAndValue(model['messageImprint']);
   }

   get genTime() {
      return this._genTime;
   }

   get serialNumber() {
      return this._serialNumber;
   }

   get messageImprint() {
      return this._messageImprint;
   }
}

exports.CadesSignature = CadesSignature;
exports.CadesTimestamp = CadesTimestamp;