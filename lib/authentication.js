'use strict';
const { AuthenticationResult } = require('./authentication-result');

class Authentication {

   constructor(client) {
      this._client = client;
   }

   async startWithWebPki(securityContextId) {
      let request = {
         securityContextId: securityContextId
      };

      let response = await this._client.post('Api/Authentications', request);
      return response['token'];
   }

   async completeWithWebPki(token) {
      let response = await this._client.post(`Api/Authentications/${token}/Finalize`);
      return new AuthenticationResult(response);
   }

}

exports.Authentication = Authentication;