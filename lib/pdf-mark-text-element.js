'use strict';
const { PdfMarkElement } = require('./pdf-mark-element');
const { PdfMarkElementType } = require('./enums');

class PdfMarkTextElement extends PdfMarkElement {

   constructor(relativeContainer, textSections) {
      relativeContainer = relativeContainer || null;
      textSections = textSections || [];

      super(PdfMarkElementType.TEXT, relativeContainer);
      this._textSections = textSections;
      this._align = 'Left';
   }

   get textSections() {
      return this._textSections;
   }

   set textSections(value) {
      this._textSections = value;
   }

   get align() {
      return this._align;
   }

   set align(value) {
      this._align = value;
   }

   toModel() {
      let model = super.toModel();
      let textSections = [];
      for (let textSection of this._textSections) {
         textSections.push(textSection.toModel());
      }
      model['textSections'] = textSections;
      model['align'] = this._align;
      return model;

   }
}

exports.PdfMarkTextElement = PdfMarkTextElement;