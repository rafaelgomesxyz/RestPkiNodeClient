'use strict';
const { RestBaseError } = require('./rest-base-error');

class RestPkiError extends RestBaseError {

   constructor(verb, url, errorCode, detail) {
      let message = `REST PKI action ${verb} ${url} error: ${errorCode}`;
      if (detail) {
         message += ` (${detail})`;
      }
      super('RestPkiError', message, verb, url);

      this._errorCode = errorCode;
      this._detail = detail;

      Error.captureStackTrace(this, this.constructor);
   }

   get errorCode() {
      return this._errorCode;
   }

   get detail() {
      return this._detail;
   }

}

exports.RestPkiError = RestPkiError;