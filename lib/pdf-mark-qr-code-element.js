'use strict';
const { PdfMarkElement } = require('./pdf-mark-element');
const { PdfMarkElementType } = require('./enums');

class PdfMarkQRCodeElement extends PdfMarkElement {

   constructor(relativeContainer, qrCodeData) {
      relativeContainer = relativeContainer || null;
      qrCodeData = qrCodeData || null;

      super(PdfMarkElementType.QRCODE, relativeContainer);
      this._qrCodeData = qrCodeData;
      this._drawQuietZones = false;
   }

   get qrCodeData() {
      return this._qrCodeData;
   }

   set qrCodeData(value) {
      this._qrCodeData = value;
   }

   get drawQuietZones() {
      return this._drawQuietZones;
   }

   set drawQuietZones(value) {
      this._drawQuietZones = value;
   }

   toModel() {
      let model = super.toModel();
      model['qrCodeData'] = this._qrCodeData;
      model['qrCodeDrawQuietZones'] = this._drawQuietZones;
      return model;
   }
}

exports.PdfMarkQRCodeElement = PdfMarkQRCodeElement;