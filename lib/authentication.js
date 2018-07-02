'use strict';
const { AuthenticationResult } = require('./authentication-result');

class Authentication {

   constructor(client) {
      this._client = client;
   }

   startWithWebPki(securityContextId) {

      let request = {
         securityContextId: securityContextId
      };

      return new Promise((resolve, reject) => {

         this._client.post('Api/Authentications', request)
         .then((response) => resolve(response['token']))
         .catch((err) => reject(err));

      });

   }

   completeWithWebPki(token) {

      return new Promise((resolve, reject) => {

         this._client.post(`Api/Authentications/${token}/Finalize`)
         .then((response) => resolve(new AuthenticationResult(response)))
         .catch((err) => reject(err));

      });
   }

}

exports.Authentication = Authentication;