'use strict';
const fs = require('fs');

const { SignatureExplorer } = require('./signature-explorer');
const { CadesSignature } = require('./cades-signature');
const { DigestAlgorithm } = require('./digest-algorithm');

const CMS_SIGNATURE_MIME_TYPE = 'application/pkcs7-signature';

class CadesSignatureExplorer extends SignatureExplorer {

   constructor(client) {
      super(client);
      this._dataFileContent = null;
   }

   //region setDataFile

   setDataFileFromPath(path) {
      this._dataFileContent = fs.readFileSync(path);
   }

   setDataFileFromContentRaw(contentRaw) {
      this._dataFileContent = contentRaw;
   }

   setDataFileFromContentBase64(contentBase64) {
      this._dataFileContent = new Buffer(contentBase64, 'base64');
   }

   set dataFile(path) {
      this.setDataFileFromPath(path);
   }

   set dataFileContent(contentRaw) {
      this.setDataFileFromContentRaw(contentRaw);
   }

   //endregion

   open(extractContent = false) {

      if (!this._signatureFileContent) {
         throw new Error('The signature file to be opened not set');
      }

      return new Promise((resolve, reject) => {

         if (this._dataFileContent) {

            this._getRequiredHashes()
            .then((requiredHashes) => {

               let dataHashes = null;
               if (requiredHashes.length > 0) {
                  dataHashes = this._computeDataHashes(this._dataFileContent, requiredHashes);
               }
               let request = this._getRequest(CMS_SIGNATURE_MIME_TYPE);
               request['dataHashes'] = dataHashes;

               return this._client.post('Api/CadesSignatures/Open', request);

            })
            .then((response) => resolve(new CadesSignature(response)))
            .catch((err) => reject(err));

         } else {

            let request = this._getRequest(CMS_SIGNATURE_MIME_TYPE);
            if(extractContent){
               request['extractEncapsulatedContent'] = true;
               request['dataHashes'] = null;
            }
            this._client.post('Api/CadesSignatures/Open', request)
            .then((response) => resolve(new CadesSignature(response)))
            .catch((err) => reject(err));

         }

      });

   }

   _getRequiredHashes() {

      let request = {
         content: new Buffer(this._signatureFileContent).toString('base64'),
         mimeType: CMS_SIGNATURE_MIME_TYPE
      };

      return new Promise((resolve, reject) => {

         this._client.post('Api/CadesSignatures/RequiredHashes', request)
         .then((response) => {

            let algs = [];
            for (let alg of response) {
               algs.push(DigestAlgorithm.getInstanceByApiModel(alg));
            }
            resolve(algs);

         })
         .catch((err) => reject(err));
      });
   }

   _computeDataHashes(dataFileContent, algorithms) {

      let dataHashes = [];
      for (let algorithm of algorithms) {
         let digestValue = algorithm.computeHash(dataFileContent);
         let dataHash = {
            algorithm: algorithm.apiModel,
            value: digestValue
         };
         dataHashes.push(dataHash);
      }
      return dataHashes;
   }
}

exports.CadesSignatureExplorer = CadesSignatureExplorer;