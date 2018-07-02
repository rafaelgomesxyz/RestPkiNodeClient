'use strict';
const { DigestAlgorithmAndValue } = require('./digest-algorithm-and-value');
const { SignatureAlgorithmAndValue } = require('./signature-algorithm-and-value');
const { PKCertificate } = require('./pk-certificate');
const { SignaturePolicyIdentifier } = require('./signature-policy-identifier');
const { CadesTimestamp } = require('./cades-signature');
const { ValidationResults } = require('./validation');

class CadesSignerInfo {

   constructor(model) {
      this._messageDigest = new DigestAlgorithmAndValue(model['messageDigest']);
      this._signature = new SignatureAlgorithmAndValue(model['signature']);
      this._certificate = new PKCertificate(model['certificate']);
      this._signingTime = model['signingTime'];
      this._certifiedDateReference = model['certifiedDateReference'];

      if (model['signaturePolicy']) {
         this._signaturePolicy = new SignaturePolicyIdentifier(model['signaturePolicy']);
      }

      this._timestamps = [];
      if (model['timestamps']) {
         for (let timestamp of model['timestamps']) {
            this._timestamps.push(new CadesTimestamp(timestamp));
         }
      }

      if (model['validationResults']) {
         this._validationResults = new ValidationResults(model['validationResults']);
      }
   }

   get messageDigest() {
      return this._messageDigest;
   }

   get signature() {
      return this._signature;
   }

   get certificate() {
      return this._certificate;
   }

   get signingTime() {
      return this._signingTime;
   }

   get certifiedDateReference() {
      return this._certifiedDateReference;
   }

   get signaturePolicy() {
      return this._signaturePolicy;
   }

   get timestamps() {
      return this._timestamps;
   }

   get validationResults() {
      return this._validationResults;
   }
}

exports.CadesSignerInfo = CadesSignerInfo;