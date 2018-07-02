'use strict';
const { XmlSignatureStarter } = require('./xml-signature-starter');
const { PKCertificate } = require('./pk-certificate');

class XmlElementSignatureStarter extends XmlSignatureStarter {

   constructor(client) {
      super(client);
      this._toSignElementId = null;
      this._idResolutionTable = null;
   }

   set toSignElementId(toSignElementId) {
      this._toSignElementId = toSignElementId;
   }

   set idResolutionTable(idResolutionTable) {
      this._idResolutionTable = idResolutionTable;
   }

   startWithWebPki() {

      this._verifyCommonParameters(true);

      if (!this._toSignElementId) {
         throw new Error('The XML element id to sign was not set');
      }

      let request = this._getRequest();
      request['elementToSignId'] = this._toSignElementId;
      if (this._idResolutionTable) {
         request['idResolutionTable'] = this._idResolutionTable.toModel();
      }
      return new Promise((resolve, reject) => {

         this._client.post('Api/XmlSignatures/XmlElementSignature', request)
         .then((response) => {

            let result = {
               token: response['token']
            };
            if (response['certificate']) {
               result['certificate'] = new PKCertificate(response['certificate']);
            }
            resolve(result);

         })
         .catch((err) => reject(err));

      });
   }

}

exports.XmlElementSignatureStarter = XmlElementSignatureStarter;