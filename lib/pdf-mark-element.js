'use strict';

class PdfMarkElement {

	constructor(elementType, relativeContainer) {
		relativeContainer = relativeContainer || null;

		this._elementType = elementType;
		this._relativeContainer = relativeContainer;
		this._rotation = 0;
		this._opacity = 100;
	}

	get elementType() {
		return this._elementType;
	}

	set elementType(value) {
		this._elementType = value;
	}

	get relativeContainer() {
		return this._relativeContainer;
	}

	set relativeContainer(value) {
		this._relativeContainer = value;
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(value) {
		this._rotation = value;
	}

	get opacity() {
		return this._opacity;
	}

	set opacity(value) {
		this._opacity = value;
	}

	toModel() {
		return {
			elementType: this._elementType,
			relativeContainer: this._relativeContainer,
			rotation: this._rotation,
			opacity: this._opacity
		}
	}
}

exports.PdfMarkElement = PdfMarkElement;