'use strict';

// Digest algorithms enumeration
const DigestAlgorithms = {
   MD5: 'MD5',
   SHA1: 'SHA1',
   SHA256: 'SHA256',
   SHA384: 'SHA384',
   SHA512: 'SHA512'
};

// Signature algorithms enumeration
const SignatureAlgorithms = {
   MD5_WITH_RSA: 'MD5WithRSA',
   SHA1_WITH_RSA: 'SHA1WithRSA',
   SHA256_WITH_RSA: 'SHA256WithRSA',
   SHA384_WITH_RSA: 'SHA384WithRSA',
   SHA512_WITH_RSA: 'SHA512WithRSA'
};

// Private key algorithms enumeration
const PKAlgorithms = {
   RSA: 'RSA'
};

// Pki Italy Certificate Types enumeration
const PkiItalyCertificateTypes = {
   UNDEFINED: 'Undefined',
   CNS: 'Cns',
   DIGITAL_SIGNATURE: 'DigitalSignature'
};

// Pki Brazil Certificate Types enumeration
const PkiBrazilCertificateTypes = {
   UNKNOWN: 'Unknown',
   A1: 'A1',
   A2: 'A2',
   A3: 'A3',
   A4: 'A4',
   S1: 'S1',
   S2: 'S2',
   S3: 'S3',
   S4: 'S4',
   T3: 'T3',
   T4: 'T4'
};

// PAdES measurement units enumeration
const PadesMeasurementUnits = {
   CENTIMETERS: 'Centimeters',
   PDF_POINTS: 'PdfPoints'
};

// XML Insertion options enumeration
const XmlInsertionOptions = {
   APPEND_CHILD: 'AppendChild',
   PREPEND_CHILD: 'PrependChild',
   APPEND_SIBLING: 'AppendSibling',
   PREPEND_SIBLING: 'PrependSibling'
};

// Standard security contexts enumeration
const StandardSecurityContexts = {
   PKI_BRAZIL: '201856ce-273c-4058-a872-8937bd547d36',
   PKI_ITALY: 'c438b17e-4862-446b-86ad-6f85734f0bfe',
   WINDOWS_SERVER: '3881384c-a54d-45c5-bbe9-976b674f5ec7',
   LACUNA_TEST: '803517ad-3bbc-4169-b085-60053a8f6dbf'
};

// Standard signature policies enumeration
const StandardSignaturePolicies = {
   PADES_BASIC: '78d20b33-014d-440e-ad07-929f05d00cdf',
   PADES_BASIC_WITH_PKI_BRAZIL_CERTS: '3fec800c-366c-49bf-82c5-2e72154e70f6',
   PADES_T_WITH_PKI_BRAZIL_CERTS: '6a39aeea-a2d0-4754-bf8c-19da15296ddb',
   PKI_BRAZIL_PADES_ADR_BASICA: '531d5012-4c0d-4b6f-89e8-ebdcc605d7c2',
   PKI_BRAZIL_PADES_ADR_TEMPO: '10f0d9a5-a0a9-42e9-9523-e181ce05a25b',

   CADES_BES: 'a4522485-c9e5-46c3-950b-0d6e951e17d1',
   CADES_BES_WITH_SIGNING_TIME_AND_NO_CRLS: '8108539d-c137-4f45-a1f2-de5305bc0a37',
   PKI_BRAZIL_CADES_ADR_BASICA: '3ddd8001-1672-4eb5-a4a2-6e32b17ddc46',
   PKI_BRAZIL_CADES_ADR_TEMPO: 'a5332ad1-d105-447c-a4bb-b5d02177e439',
   PKI_BRAZIL_CADES_ADR_COMPLETA: '30d881e7-924a-4a14-b5cc-d5a1717d92f6',

   XADES_BES: '1beba282-d1b6-4458-8e46-bd8ad6800b54',
   XML_DSIG_BASIC: '2bb5d8c9-49ba-4c62-8104-8141f6459d08',
   PKI_BRAZIL_XADES_ADR_BASICA: '1cf5db62-58b6-40ba-88a3-d41bada9b621',
   PKI_BRAZIL_XADES_ADR_TEMPO: '5aa2e0af-5269-43b0-8d45-f4ef52921f04',
   PKI_BRAZIL_NFE_PADRAO_NACIONAL: 'a3c24251-d43a-4ba4-b25d-ee8e2ab24f06'
};

// PDF text styles enumeration
const PdfTextStyle = {
   NORMAL: 'Normal',
   BOLD: 'Bold',
   ITALIC: 'Italic'
};

// PDF mark element types enumeration
const PdfMarkElementType = {
   TEXT: 'Text',
   IMAGE: 'Image',
   QRCODE: 'QRCode'
};

// PDF mark page options enumeration
const PdfMarkPageOptions = {
   ALL_PAGES: 'AllPages',
   SINGLE_PAGE: 'SinglePage',
   SINGLE_PAGE_FROM_END: 'SinglePageFromEnd',
   NEW_PAGE: 'NewPage'
};

// PAdES certification levels
const PadesCertificationLevels = {
   NOT_CERTIFIED: 'NotCertified',
   CERTIFIED_FORM_FILLING: 'CertifiedFormFilling',
   CERTIFIED_FORM_FILLING_AND_ANNOTATIONS: 'CertifiedFormFillingAndAnnotations',
   CERTIFIED_NO_CHANGES_ALLOWED: 'CertifiedNoChangesAllowed',
};

exports.DigestAlgorithms = DigestAlgorithms;
exports.SignatureAlgorithms = SignatureAlgorithms;
exports.PKAlgorithms = PKAlgorithms;
exports.PkiItalyCertificateTypes = PkiItalyCertificateTypes;
exports.PkiBrazilCertificateTypes = PkiBrazilCertificateTypes;
exports.PadesMeasurementUnits = PadesMeasurementUnits;
exports.XmlInsertionOptions = XmlInsertionOptions;
exports.StandardSecurityContexts = StandardSecurityContexts;
exports.StandardSignaturePolicies = StandardSignaturePolicies;
exports.PdfTextStyle = PdfTextStyle;
exports.PdfMarkElementType = PdfMarkElementType;
exports.PdfMarkPageOptions = PdfMarkPageOptions;
exports.PadesCertificationLevels = PadesCertificationLevels;