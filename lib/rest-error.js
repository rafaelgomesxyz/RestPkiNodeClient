'use strict';
const { RestBaseError } = require('./rest-base-error');

class RestError extends RestBaseError {

   constructor(verb, url, statusCode, errorMessage) {
      errorMessage = errorMessage || null;
      let message = `REST action ${verb} ${url} returned HTTP error ${statusCode}`;
      if (errorMessage && errorMessage.length > 0) {
         message += ': ' + errorMessage;
      }
      super('RestError', message, verb, url);

      this._statusCode = statusCode;
      this._errorMessage = errorMessage;

      Error.captureStackTrace(this, RestError);
   }

   get statusCode() {
      return this._statusCode;
   }

   get errorMessage() {
      return this._errorMessage;
   }

}

exports.RestError = RestError;
