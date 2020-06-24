'use strict';
const crypto = require('crypto');

const { Oids } = require('./oids');
const { DigestAlgorithms } = require('./enums');

class DigestAlgorithm {

   static get MD5() {
      return new MD5DigestAlgorithm();
   }

   static get SHA1() {
      return new SHA1DigestAlgorithm();
   }

   static get SHA256() {
      return new SHA256DigestAlgorithm();
   }

   static get SHA384() {
      return new SHA384DigestAlgorithm();
   }

   static get SHA512() {
      return new SHA512DigestAlgorithm();
   }

   static get _algorithms() {
      return [
         DigestAlgorithm.MD5,
         DigestAlgorithm.SHA1,
         DigestAlgorithm.SHA256,
         DigestAlgorithm.SHA384,
         DigestAlgorithm.SHA512
      ];
   }

   static getInstanceByName(name) {

      let alg = DigestAlgorithm._algorithms.find((a) => a.name === name);

      if (!alg) {
         throw new Error(`Unrecognized digest algorithm name: ${name}`);
      }
      return alg;
   }

   static getInstanceByOid(oid) {

      let alg = DigestAlgorithm._algorithms.find((a) => a.oid === oid);

      if (!alg) {
         throw new Error(`Unrecognized digest algorithm oid: ${oid}`);
      }
      return alg;
   }

   static getInstanceByXmlUri(xmlUri) {

      let alg = DigestAlgorithm._algorithms.find((a) => a.xmlUri === xmlUri);

      if (!alg) {
         throw new Error(`Unrecognized digest algorithm XML URI: ${xmlUri}`);
      }
      return alg;
   }

   static getInstanceByApiModel(algorithm) {
      switch (algorithm) {
         case DigestAlgorithms.MD5:
            return DigestAlgorithm.MD5;
         case DigestAlgorithms.SHA1:
            return DigestAlgorithm.SHA1;
         case DigestAlgorithms.SHA256:
            return DigestAlgorithm.SHA256;
         case DigestAlgorithms.SHA384:
            return DigestAlgorithm.SHA384;
         case DigestAlgorithms.SHA512:
            return DigestAlgorithm.SHA512;
         default:
            throw new Error(`Unsupported digest algorithm: ${algorithm}`);
      }
   }

   constructor(name, oid, byteLength, apiModel, xmlUri) {
      this._name = name;
      this._oid = oid;
      this._byteLength = byteLength;
      this._apiModel = apiModel;
      this._xmlUri = xmlUri;
   }

   equals(instance) {

      if (this === instance) {
         return true;
      }

      if (!instance) {
         return false;
      }

      return this.oid === instance['oid'];
   }

   computeHash(content, output_encoding) {
      output_encoding = output_encoding || 'base64';
      let cryptoHash = this.createCryptoHash();
      cryptoHash.update(content);
      return cryptoHash.digest(output_encoding);
   }

   checkLength(digestValue) {
      if (digestValue.length !== this._byteLength) {
         throw new Error(`A ${this._name} digest should contain ${this._byteLength} bytes, but a value with ${digestValue.length} bytes was given`);
      }
   }

   get name() {
      return this._name;
   }

   get oid() {
      return this._oid;
   }

   get byteLength() {
      return this._byteLength;
   }

   get apiModel() {
      return this._apiModel;
   }

   get xmlUri() {
      return this._xmlUri;
   }
   
   get cryptoHash(){
      return this.createCryptoHash();
   }

   createCryptoHash() {
      throw "Not implemented";
   }

}

class MD5DigestAlgorithm extends DigestAlgorithm {

   constructor() {
      let name = 'MD5';
      let oid = Oids.MD5;
      let byteLength = 16;
      let apiModel = 'MD5';
      let xmlUri = 'http://www.w3.org/2001/04/xmldsig-more#md5';
      super(name, oid, byteLength, apiModel, xmlUri);
   }

   createCryptoHash(){
      return crypto.createHash('md5');
   }
}

class SHA1DigestAlgorithm extends DigestAlgorithm {

   constructor() {
      let name = 'SHA1';
      let oid = Oids.SHA1;
      let byteLength = 20;
      let apiModel = 'SHA1';
      let xmlUri = 'http://www.w3.org/2000/09/xmldsig#sha1';
      super(name, oid, byteLength, apiModel, xmlUri);
   }

   createCryptoHash(){
      return crypto.createHash('sha1');
   }
}

class SHA256DigestAlgorithm extends DigestAlgorithm {

   constructor() {
      let name = 'SHA256';
      let oid = Oids.SHA256;
      let byteLength = 32;
      let apiModel = 'SHA256';
      let xmlUri = 'http://www.w3.org/2001/04/xmlenc#sha256';
      super(name, oid, byteLength, apiModel, xmlUri);
   }

   createCryptoHash(){
      return crypto.createHash('sha256');
   }
}

class SHA384DigestAlgorithm extends DigestAlgorithm {

   constructor() {
      let name = 'SHA384';
      let oid = Oids.SHA384;
      let byteLength = 48;
      let apiModel = 'SHA384';
      let xmlUri = 'http://www.w3.org/2001/04/xmldsig-more#sha384';
      super(name, oid, byteLength, apiModel, xmlUri);
   }

   createCryptoHash(){
      return crypto.createHash('sha384');
   }
}

class SHA512DigestAlgorithm extends DigestAlgorithm {

   constructor() {
      let name = 'SHA512';
      let oid = Oids.SHA512;
      let byteLength = 64;
      let apiModel = 'SHA512';
      let xmlUri = 'http://www.w3.org/2001/04/xmlenc#sha512';
      super(name, oid, byteLength, apiModel, xmlUri);
   }

   createCryptoHash(){
      return crypto.createHash('sha512');
   }
}

exports.DigestAlgorithm = DigestAlgorithm;
exports.MD5DigestAlgorithm = MD5DigestAlgorithm;
exports.SHA1DigestAlgorithm = SHA1DigestAlgorithm;
exports.SHA256DigestAlgorithm = SHA256DigestAlgorithm;
exports.SHA384DigestAlgorithm = SHA384DigestAlgorithm;
exports.SHA512DigestAlgorithm = SHA512DigestAlgorithm;