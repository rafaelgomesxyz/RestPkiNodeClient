'use strict';

class ValidationResults {

	constructor(model) {

		this._errors = [];
		this._warnings = [];
		this._passedChecks = [];

		if (model['errors'] && model['errors'].length > 0) {
			this._errors = this._convertItems(model['errors']);
		}

		if (model['warnings'] && model['warnings'].length > 0) {
			this._warnings = this._convertItems(model['warnings']);
		}

		if (model['passedChecks'] && model['passedChecks'].length > 0) {
			this._passedChecks = this._convertItems(model['passedChecks']);
		}
	}

	isValid() {
		return !this.hasErrors();
	};

	getChecksPerformed() {
		return this._errors.length + this._warnings.length + this._passedChecks.length;
	};

	hasErrors() {
		return this._errors && this._errors.length > 0;
	};

	hasWarnings() {
		return this._warnings && this._warnings.length > 0;
	};

	toString(indentationLevel) {
		indentationLevel = indentationLevel || 0;

		let itemIndent = '\t'.repeat(indentationLevel);
		let text = '';

		text += this.getSummary(indentationLevel);
		if (this.hasErrors()) {
			text += '\n' + itemIndent + 'Errors:\n';
			text += this._joinItems(this._errors, indentationLevel);
		}
		if (this.hasWarnings()) {
			text += '\n' + itemIndent + 'Warnings:\n';
			text += this._joinItems(this._warnings, indentationLevel);
		}
		if (this._passedChecks && this._passedChecks.length > 0) {
			text += '\n' + itemIndent + 'Passed Checks:\n';
			text += this._joinItems(this._passedChecks, indentationLevel);
		}

		return text;
	};

	getSummary(indentationLevel) {
		indentationLevel = indentationLevel || 0;

		let itemIndent = '\t'.repeat(indentationLevel);
		let text = itemIndent + 'Validation results: ';

		if (this.getChecksPerformed() === 0) {
			text += 'no checks performed';
		} else {
			text += this.getChecksPerformed() + ' checks performed';
			if (this.hasErrors()) {
				text += ', ' + this._errors.length + ' errors';
			}
			if (this.hasWarnings()) {
				text += ', ' + this._warnings.length + ' warnings';
			}
			if (this._passedChecks && this._passedChecks.length > 0) {
				if (!this.hasErrors() && !this.hasWarnings()) {
					text += ', all passed';
				} else {
					text += ', ' + this._passedChecks.length + ' passed';
				}
			}
		}

		return text;
	};

	_convertItems(items) {
		let converted = [];
		items.forEach((item) => {
			converted.push(new ValidationItem(item));
		});
		return converted;
	}

	_joinItems(items, indentationLevel) {
		indentationLevel = indentationLevel || 0;

		let text = '';
		let isFirst = true;
		let itemIndent = '\t'.repeat(indentationLevel);

		items.forEach((item) => {
			if (isFirst) {
				isFirst = false;
			} else {
				text += '\n';
			}
			text += itemIndent + '- ';
			text += item.toString(indentationLevel);
		});

		return text;
	}
}

class ValidationItem {

	constructor(model) {

		// Initialize objects
		this._type = model['type'];
		this._message = model['message'];
		this._detail = model['detail'];
		if (model['innerValidationResults']) {
			this._innerValidationResults = new ValidationResults(model['innerValidationResults']);
		}

	}

	get type() {
		return this._type;
	}

	get message() {
		return this._message;
	}

	get detail() {
		return this._detail;
	}

	toString(indentationLevel) {
		indentationLevel = indentationLevel || 0;

		let text = '';

		text += this._message;
		if (this._detail) {
			text += ' (' + this._detail + ')';
		}
		if (this._innerValidationResults) {
			text += '\n';
			text += this._innerValidationResults.toString(indentationLevel + 1);
		}

		return text;
	};
}

exports.ValidationResults = ValidationResults;
exports.ValidationItem = ValidationItem;