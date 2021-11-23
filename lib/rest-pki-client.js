'use strict';
const request = require('request');

const { RestUnreachableError } = require('./rest-unreachable-error');
const { ValidationResults } = require('./validation');
const { ValidationError } = require('./validation-error');
const { RestError } = require('./rest-error');
const { RestPkiError } = require('./rest-pki-error');
const { VERSION } = require('./lib-version');

class RestPkiClient {

   constructor(endpointUrl, accessToken) {
      this._endpointUrl = endpointUrl;
      this._accessToken = accessToken;
   }

   get(url) {

      return new Promise((resolve, reject) => {

         let verb = 'GET';
         try {

            request.get(this._endpointUrl + url, {
               json: true,
               headers: {
                  Authorization: `Bearer ${this._accessToken}`,
                  'X-RestPki-Client': `NodeJS ${VERSION}`
               }
            }, (err, restRes, body) => {

               let errObj = { value: err };
               if (this._checkResponse(errObj, restRes, verb, url)) {
                  resolve(body);
               } else {
                  reject(errObj.value);
               }

            });

         } catch (error) {
            reject(new RestUnreachableError(verb, url));
         }

      });
   }

   getRaw(url) {
      return new Promise((resolve, reject) => {
         let request = http.request(this._endpointUrl + url, function (res) {
            var data = [];
            res.on('data', function (chunk) {
                data.push(chunk);
            });
            res.on('end', function () {
               data = Buffer.concat(data);
               resolve(data);
            });
        });

        request.on('error', function (e) {
            reject(e.message);
         });
         request.end();
      });
   }

   post(url, data) {

      return new Promise((resolve, reject) => {

         let verb = 'POST';
         try {

            request.post(this._endpointUrl + url, {
               json: true,
               headers: {
                  Authorization: `Bearer ${this._accessToken}`,
                  'X-RestPki-Client': `NodeJS ${VERSION}`
               },
               body: data
            }, (err, restRes, body) => {

               let errObj = { value: err };
               if (this._checkResponse(errObj, restRes, verb, url)) {
                  resolve(body);
               } else {
                  reject(errObj.value);
               }

            });

         } catch (error) {
            reject(new RestUnreachableError(verb, url));
         }

      });
   }

   _checkResponse(errObj, restRes, verb, url) {

      let statusCode = restRes.statusCode;
      if (errObj.value || statusCode < 200 || statusCode > 299) {
         if (!errObj.value) {

            try {

               let response = restRes.body;
               if (statusCode === 422 && response.code !== null) {
                  if (response.code === 'ValidationError') {
                     let vr = new ValidationResults(response.validationResults);
                     errObj.value = new ValidationError(verb, url, vr);
                  } else {
                     errObj.value = new RestPkiError(verb, url, response.code,
                         response.detail);
                  }
               } else {
                  console.log(response);
                  errObj.value = new RestError(verb, url, statusCode,
                      response.message);
               }

            } catch (error) {
               errObj.value = new RestError(verb, url);
            }

         }
         return false;
      } else {
         return true;
      }
   }

}

exports.RestPkiClient = RestPkiClient;