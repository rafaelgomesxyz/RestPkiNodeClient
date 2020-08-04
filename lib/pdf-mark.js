'use strict';
let {Color} = require('./color');
let {PdfMarkPageOptions} = require('./enums');

class PdfMark {

	constructor() {
		this._container = null;
		this._borderWidth = 0.0;
		this._borderColor = Color.fromRGBString('#000000'); // Black
		this._backgroundColor = Color.fromRGBString('#FFFFFF', 0); // Transparent
		this._elements = [];
		this._pageOption = PdfMarkPageOptions.ALL_PAGES;
		this._pageOptionNumber = null;
	}

	get container() {
		return this._container;
	}

	set container(value) {
		this._container = value;
	}

	get borderWidth() {
		return this._borderWidth;
	}

	set borderWidth(value) {
		this._borderWidth = value;
	}

	get borderColor() {
		return this._borderColor;
	}

	set borderColor(value) {
		this._borderColor = value;
	}

	get backgroundColor() {
		return this._backgroundColor;
	}

	set backgroundColor(value) {
		this._backgroundColor = value;
	}

	get elements() {
		return this._elements;
	}

	set elements(value) {
		this._elements = value;
	}

	get pageOption() {
		return this._pageOption;
	}

	set pageOption(value) {
		this._pageOption = value;
	}

	get pageOptionNumber() {
		return this._pageOptionNumber;
	}

	set pageOptionNumber(value) {
		this._pageOptionNumber = value;
	}

	toModel() {

		let elements = [];
		for (let element of this._elements) {
			elements.push(element.toModel());
		}

		return {
			container: this._container,
			backgroundColor: this._backgroundColor.toModel(),
			borderColor: this._borderColor.toModel(),
			borderWidth: this._borderWidth,
			elements: elements,
			pageOption: this._pageOption,
			pageOptionNumber: this._pageOptionNumber
		};
	}
}

exports.PdfMark = PdfMark;