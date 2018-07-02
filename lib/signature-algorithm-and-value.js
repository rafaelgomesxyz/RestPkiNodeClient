'use strict';
const { SignatureAlgorithm } = require('./pk-algorithms');

class SignatureAlgorithmAndValue {

   constructor(model) {
      this._algorithm = SignatureAlgorithm.getInstanceByApiModel(model['algorithmIdentifier']);
      this._value = new Buffer(model['value'], 'base64');
   }

   get algorithm() {
      return this._algorithm;
   }

   get value() {
      return this._value;
   }
}

exports.SignatureAlgorithmAndValue = SignatureAlgorithmAndValue;