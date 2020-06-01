'use strict';
const { SignatureFinisher } = require('./signature-finisher');
const { SignatureResult } = require('./signature-result');

class XmlSignatureFinisher extends SignatureFinisher {

   constructor(client) {
      super(client);
   }

   async finish() {
      if (!this._token) {
         throw new Error('The token was not set');
      }

      let response = await this._client.getRestClient().post(`Api/XmlSignatures/${this._token}/Finalize`);

      return new SignatureResult(
          this._client,
          {content: response['signedXml']},
          response['certificate']
      );
   }

}

exports.XmlSignatureFinisher = XmlSignatureFinisher;