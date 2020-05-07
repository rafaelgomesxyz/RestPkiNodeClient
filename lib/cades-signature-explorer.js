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

   async open(extractContent = false) {

      if (!this._signatureFileContent) {
         throw new Error('The signature file to be opened not set');
      }

      if (this._dataFileContent){
         var requiredHashes = await this._getRequiredHashes();
         let dataHash = null;

         if(requiredHashes.length > 0){
            dataHash = this._computeDataHashes(this._dataFileContent, requiredHashes);
         }

         let request = this._getRequest(CMS_SIGNATURE_MIME_TYPE);
         request['dataHashes'] = dataHash;

         let response = await this._client.getRestClient().post('Api/CadesSignatures/Open', request);
         return new CadesSignature(response);

      } else {
         let request = this._getRequest(CMS_SIGNATURE_MIME_TYPE);
         if(extractContent){
            request['extractEncapsulatedContent'] = true;
            request['dataHashes'] = null;
         }
         
         let response = await this._client.getRestClient().post('Api/CadesSignatures/Open', request);
         return new CadesSignature(response);
      }
   }

   async _getRequiredHashes() {

      let request = {
         content: new Buffer(this._signatureFileContent).toString('base64'),
         mimeType: CMS_SIGNATURE_MIME_TYPE
      };

      let response = await this._client.getRestClient().post('Api/CadesSignatures/RequiredHashes', request);

      let algs = [];
      for (let alg of response) {
         algs.push(DigestAlgorithm.getInstanceByApiModel(alg));
      }
      return algs;
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