'use strict';

const {PdfTextStyle} = require('./enums');
const {Color} = require('./color');

class PdfTextSection {

	constructor(text, color, fontSize) {
		text = text || null;
		color = color || Color.fromRGBString('#000000');
		fontSize = fontSize || null;

		this._style = PdfTextStyle.NORMAL;
		this._text = text;
		this._fontSize = fontSize;
		this._color = color;
	}

	get text() {
		return this._text;
	}

	set text(value) {
		this._text = value;
	}

	get color() {
		return this._color;
	}

	set color(value) {
		this._color = value;
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		this._fontSize = value;
	}

	get style() {
		return this._style;
	}

	set style(value) {
		this._style = value;
	}

	toModel() {
		return {
			style: this._style,
			text: this._text,
			color: this._color.toModel(),
			fontSize: this.fontSize
		}
	}
}

exports.PdfTextSection = PdfTextSection;