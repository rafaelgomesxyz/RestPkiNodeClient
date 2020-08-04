'use strict';

class XmlIdResolutionTable {

	constructor(includeXmlIdGlobalAttribute) {
		includeXmlIdGlobalAttribute = includeXmlIdGlobalAttribute || null;

		this._elementIdAttributes = [];
		this._globalIdAttributes = [];
		this._includeXmlIdAttribute = includeXmlIdGlobalAttribute;
	}

	addGlobalIdttribute(idAttibuteLocalName, idAttributeNamespace) {
		idAttributeNamespace = idAttributeNamespace || null;

		this._globalIdAttributes = {
			localName: idAttibuteLocalName,
			namespace: idAttributeNamespace
		};
	}

	setElementIdAttribute(elementLocalName, elementNamespace, idAttributeLocalName, idAttributeNamespace) {
		idAttributeNamespace = idAttributeNamespace || null;

		this._elementIdAttributes = {
			element: {
				localName: elementLocalName,
				namespace: elementNamespace
			},
			attribute: {
				localName: idAttributeLocalName,
				namespace: idAttributeNamespace
			}
		};
	}

	toModel() {
		return {
			elementIdAttributes: this._elementIdAttributes,
			globalIdAttributes: this._globalIdAttributes,
			includeXmlIdAttribute: this._includeXmlIdAttribute
		};
	}
}

exports.XmlIdResolutionTable = XmlIdResolutionTable;