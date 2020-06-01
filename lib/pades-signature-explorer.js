'use strict';
const { SignatureExplorer } = require('./signature-explorer');
const { PadesSignature } = require('./pades-signature');

const PDF_MIME_TYPE = 'application/pdf';

class PadesSignatureExplorer extends SignatureExplorer {

   constructor(client) {
      super(client);
   }

   async open() {

      if (!this._signatureFileContent) {
         throw new Error('The signature file to be opened not set');
      }

      let request = this._getRequest(PDF_MIME_TYPE);
      let response = await this._client.getRestClient().post('Api/PadesSignatures/Open', request)
      .catch((err)=>{ throw err });
      return new PadesSignature(response);
   }

}

exports.PadesSignatureExplorer = PadesSignatureExplorer;