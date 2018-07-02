'use strict';
const { RestBaseError } = require('./rest-base-error');

class RestUnreachableError extends RestBaseError {

   constructor(verb, url) {
      super('RestUnreachableError', `REST action ${verb} ${url} unreachable`,
          verb, url);

      Error.captureStackTrace(this, this.constructor);
   }
}

exports.RestUnreachableError = RestUnreachableError;
