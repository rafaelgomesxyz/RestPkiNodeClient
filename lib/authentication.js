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
      
      try{
         let response = await this._client.getRestClient().post('Api/Authentications', request);
         return response['token'];
      } catch(err) { throw err; }
   }

   async completeWithWebPki(token) {
      try{
         let response = await this._client.getRestClient().post(`Api/Authentications/${token}/Finalize`);
         return new AuthenticationResult(response);
      } catch(err) { throw err; }
   }

}

exports.Authentication = Authentication;