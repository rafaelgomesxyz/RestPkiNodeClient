'use strict';
const { FileResult } = require('./file-result');
const { PKCertificate } = require('./pk-certificate');

class SignatureResult extends FileResult {

   constructor(client, file, certificate, callbackArgument) {
      callbackArgument = callbackArgument || null;
      super(client, file);
      this.certificate = new PKCertificate(certificate);
      this.callbackArgument = callbackArgument;
   }
}

exports.SignatureResult = SignatureResult;