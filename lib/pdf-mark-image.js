'use strict';
const { ResourceContentOrReference } = require('./resource-content-or-reference');

class PdfMarkImage {

   constructor(imageContent, mimeType) {
      imageContent = imageContent || null;
      mimeType = mimeType || null;

      this._resource = new ResourceContentOrReference();
      if (imageContent) {
         this._resource.content = new Buffer(imageContent).toString('base64');
      }
      if (mimeType) {
         this._resource.mimeType = mimeType;
      }

   }

   get resource() {
      return this._resource;
   }

   set resource(value) {
      this._resource = value;
   }

   toModel() {
      if (this._resource['content'] !== null) {
         return {
            resource: {
               content: this._resource['content'],
               mimeType: this._resource['mimeType']
            }
         };
      } else if (this._resource['url'] !== null) {
         return {
            resource: {
               url: this._resource['url'],
               mimeType: this._resource['mimeType']
            }
         };
      } else {
         throw new Error('The image content was not set, neither its URL.');
      }

   }
}

exports.PdfMarkImage = PdfMarkImage;