'use strict';
const { PdfMarkElement } = require('./pdf-mark-element');
const { PdfMarkElementType } = require('./enums');

class PdfMarkImageElement extends PdfMarkElement {

   constructor(relativeContainer, image) {
      relativeContainer = relativeContainer || null;
      image = image || null;

      super(PdfMarkElementType.IMAGE, relativeContainer);
      this._image = image;
   }

   get image() {
      return this._image;
   }

   set image(value) {
      this._image = value;
   }

   toModel() {
      let model = super.toModel();
      model['image'] = this._image.toModel();
      return model;
   }
}

exports.PdfMarkImageElement = PdfMarkImageElement;