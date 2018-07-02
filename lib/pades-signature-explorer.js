'use strict';
const { SignatureExplorer } = require('./signature-explorer');
const { PadesSignature } = require('./pades-signature');

const PDF_MIME_TYPE = 'application/pdf';

class PadesSignatureExplorer extends SignatureExplorer {

   constructor(client) {
      super(client);
   }

   open() {

      if (!this._signatureFileContent) {
         throw new Error('The signature file to be opened not set');
      }

      let request = this._getRequest(PDF_MIME_TYPE);
      return new Promise((resolve, reject) => {

         this._client.post('Api/PadesSignatures/Open', request)
         .then((response) => resolve(new PadesSignature(response)))
         .catch((err) => reject(err));

      });
   }

}

exports.PadesSignatureExplorer = PadesSignatureExplorer;