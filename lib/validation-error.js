'use strict';
const { RestBaseError } = require('./rest-base-error');

class ValidationError extends RestBaseError {

   constructor(verb, url, validationResults) {
      super('ValidationResults', validationResults.toString(), verb, url);
      this._validationResults = validationResults;
   }

   get validationResults() {
      return this._validationResults;
   }

}

exports.ValidationError = ValidationError;