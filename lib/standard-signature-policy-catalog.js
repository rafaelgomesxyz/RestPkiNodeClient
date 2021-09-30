'use strict';
const {StandardSignaturePolicies} = require('./enums');

class StandardSignaturePolicyCatalog {

	static getPkiBrazilCades() {
		return [
			StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_BASICA,
			StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_TEMPO,
			StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_COMPLETA
		];
	}

	static getPkiBrazilCadesWithSignerCertificateProtection() {
		return [
			StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_TEMPO,
			StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_COMPLETA
		];
	}

	static getPkiBrazilCadesWithCACertificateProtection() {
		return [
			StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_COMPLETA
		];
	}

	static getPkiBrazilPades() {
		return [
			StandardSignaturePolicies.PKI_BRAZIL_PADES_ADR_BASICA,
			StandardSignaturePolicies.PKI_BRAZIL_PADES_ADR_TEMPO
		];
	}

	static getPkiBrazilPadesWithSignerCertificateProtection() {
		return [
			StandardSignaturePolicies.PKI_BRAZIL_PADES_ADR_TEMPO
		];
	}

	static getPkiBrazilXades() {
		return [
			StandardSignaturePolicies.PKI_BRAZIL_XADES_ADR_BASICA,
			StandardSignaturePolicies.PKI_BRAZIL_XADES_ADR_TEMPO,
			StandardSignaturePolicies.PKI_BRAZIL_XADES_ADR_COMPLETA,
			StandardSignaturePolicies.PKI_BRAZIL_XADES_ADR_ARQUIVAMENTO
		];
	}
}

exports.StandardSignaturePolicyCatalog = StandardSignaturePolicyCatalog;