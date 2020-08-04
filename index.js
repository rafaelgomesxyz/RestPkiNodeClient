'use strict';
const { Authentication } = require('./lib/authentication');
const { AuthenticationResult } = require('./lib/authentication-result');
const {BlobReference} = require('./lib/blob-reference');
const { CadesSignature, CadesTimestamp } = require('./lib/cades-signature');
const { CadesSignatureExplorer } = require('./lib/cades-signature-explorer');
const { CadesSignatureFinisher } = require('./lib/cades-signature-finisher');
const { CadesSignatureStarter } = require('./lib/cades-signature-starter');
const { CadesSignerInfo } = require('./lib/cades-signature');
const { Color } = require('./lib/color');
const {
   DigestAlgorithm,
   MD5DigestAlgorithm,
   SHA1DigestAlgorithm,
   SHA256DigestAlgorithm,
   SHA384DigestAlgorithm,
   SHA512DigestAlgorithm
} = require('./lib/digest-algorithm');
const { DigestAlgorithmAndValue } = require('./lib/digest-algorithm-and-value');
const {
   Apis,
   DigestAlgorithms,
   SignatureAlgorithms,
   PKAlgorithms,
   PkiItalyCertificateTypes,
   PkiBrazilCertificateTypes,
   PadesMeasurementUnits,
   XmlInsertionOptions,
   StandardSecurityContexts,
   StandardSignaturePolicies,
   PdfTextStyle,
   PdfMarkElementType,
   PdfMarkPageOptions,
   PadesCertificationLevels,
} = require('./lib/enums');
const { FileResult } = require('./lib/file-result');
const { FileReference } = require('./lib/file-reference');
const { FileModel } = require('./lib/file-model');
const { FullXmlSignatureStarter } = require('./lib/full-xml-signature-starter');
const { ApiVersion } = require('./lib/api-version');
const { VERSION } = require('./lib/lib-version');
const { Oids } = require('./lib/oids');
const { PadesSignature } = require('./lib/pades-signature');
const { PadesSignatureExplorer } = require('./lib/pades-signature-explorer');
const { PadesSignatureFinisher } = require('./lib/pades-signature-finisher');
const { PadesSignatureStarter } = require('./lib/pades-signature-starter');
const { PadesSignerInfo } = require('./lib/pades-signer-info');
const { PadesVisualPositioningPresets } = require('./lib/pades-visual-positioning-presets');
const { PdfMark } = require('./lib/pdf-mark');
const { PdfMarkElement } = require('./lib/pdf-mark-element');
const { PdfMarkImage } = require('./lib/pdf-mark-image');
const { PdfMarkImageElement } = require('./lib/pdf-mark-image-element');
const { PdfMarkQRCodeElement } = require('./lib/pdf-mark-qr-code-element');
const { PdfMarkTextElement } = require('./lib/pdf-mark-text-element');
const { PdfMarker } = require('./lib/pdf-marker');
const { PdfTextSection } = require('./lib/pdf-text-section');
const { SignatureAlgorithm, RSASignatureAlgorithm, RSAPKAlgorithm, PKAlgorithm } = require('./lib/pk-algorithms');
const { StreamUtils, ReadableStreamClone } = require('./lib/stream-utils');
const { PKCertificate, PkiBrazilCertificateFields, PkiItalyCertificateFields, Name } = require('./lib/pk-certificate');
const { ResourceContentOrReference } = require('./lib/resource-content-or-reference');
const { RestBaseError } = require('./lib/rest-base-error');
const { RestError } = require('./lib/rest-error');
const { RestPkiClient } = require('./lib/rest-pki-client');
const { RestClient } = require('./lib/rest-client');
const { RestPkiError } = require('./lib/rest-pki-error');
const { RestUnreachableError } = require('./lib/rest-unreachable-error');
const { SignatureAlgorithmAndValue } = require('./lib/signature-algorithm-and-value');
const { SignatureExplorer } = require('./lib/signature-explorer');
const { SignatureFinisher } = require('./lib/signature-finisher');
const { SignaturePolicyIdentifier } = require('./lib/signature-policy-identifier');
const { SignatureResult } = require('./lib/signature-result');
const { SignatureStarter } = require('./lib/signature-starter');
const { StandardSignaturePolicyCatalog } = require('./lib/standard-signature-policy-catalog');
const { ValidationResults, ValidationItem } = require('./lib/validation');
const { ValidationError } = require('./lib/validation-error');
const { XmlElementSignatureStarter } = require('./lib/xml-element-signature-starter');
const { XmlIdResolutionTable } = require('./lib/xml-id-resolution-table');
const { XmlSignatureFinisher } = require('./lib/xml-signature-finisher');
const { XmlSignatureStarter } = require('./lib/xml-signature-starter');

exports.Authentication = Authentication;
exports.AuthenticationResult = AuthenticationResult;
exports.BlobReference = BlobReference;
exports.CadesSignature = CadesSignature;
exports.CadesTimestamp = CadesTimestamp;
exports.CadesSignatureExplorer = CadesSignatureExplorer;
exports.CadesSignatureFinisher = CadesSignatureFinisher;
exports.CadesSignatureStarter = CadesSignatureStarter;
exports.CadesSignerInfo = CadesSignerInfo;
exports.Color = Color;
exports.DigestAlgorithm = DigestAlgorithm;
exports.MD5DigestAlgorithm = MD5DigestAlgorithm;
exports.SHA1DigestAlgorithm = SHA1DigestAlgorithm;
exports.SHA256DigestAlgorithm = SHA256DigestAlgorithm;
exports.SHA384DigestAlgorithm = SHA384DigestAlgorithm;
exports.SHA512DigestAlgorithm = SHA512DigestAlgorithm;
exports.DigestAlgorithmAndValue = DigestAlgorithmAndValue;
exports.Apis = Apis;
exports.ApiVersion = ApiVersion;
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
exports.FileReference = FileReference;
exports.FileResult = FileResult;
exports.FileModel = FileModel;
exports.FullXmlSignatureStarter = FullXmlSignatureStarter;
exports.VERSION = VERSION;
exports.Oids = Oids;
exports.PadesSiganture = PadesSignature;
exports.PadesSignatureExplorer = PadesSignatureExplorer;
exports.PadesSignatureFinisher = PadesSignatureFinisher;
exports.PadesSignatureStarter = PadesSignatureStarter;
exports.PadesSignerInfo = PadesSignerInfo;
exports.PadesVisualPositioningPresets = PadesVisualPositioningPresets;
exports.PdfMark = PdfMark;
exports.PdfMarkElement = PdfMarkElement;
exports.PdfMarkImage = PdfMarkImage;
exports.PdfMarkImageElement = PdfMarkImageElement;
exports.PdfMarkQRCodeElement = PdfMarkQRCodeElement;
exports.PdfMarkTextElement = PdfMarkTextElement;
exports.PdfMarker = PdfMarker;
exports.PdfTextSection = PdfTextSection;
exports.SignatureAlgorithm = SignatureAlgorithm;
exports.RSASignatureAlgorithm = RSASignatureAlgorithm;
exports.RSAPKAlgorithm = RSAPKAlgorithm;
exports.PKAlgorithm = PKAlgorithm;
exports.PKCertificate = PKCertificate;
exports.PkiBrazilCertificateFields = PkiBrazilCertificateFields;
exports.PkiItalyCertificateFields = PkiItalyCertificateFields;
exports.Name = Name;
exports.StreamUtils = StreamUtils;
exports.ReadableStreamClone = ReadableStreamClone;
exports.ResourceContentOrReference = ResourceContentOrReference;
exports.RestBaseError = RestBaseError;
exports.RestError = RestError;
exports.RestClient = RestClient;
exports.RestPkiClient = RestPkiClient;
exports.RestPkiError = RestPkiError;
exports.RestUnreachableError = RestUnreachableError;
exports.SignatureAlgorithmAndValue = SignatureAlgorithmAndValue;
exports.SignatureExplorer = SignatureExplorer;
exports.SignatureFinisher = SignatureFinisher;
exports.SignaturePolicyIdentifier = SignaturePolicyIdentifier;
exports.SignatureResult = SignatureResult;
exports.SignatureStarter = SignatureStarter;
exports.StandardSignaturePolicyCatalog = StandardSignaturePolicyCatalog;
exports.ValidationResults = ValidationResults;
exports.ValidationItem = ValidationItem;
exports.ValidationError = ValidationError;
exports.XmlElementSignatureStarter = XmlElementSignatureStarter;
exports.XmlIdResolutionTable = XmlIdResolutionTable;
exports.XmlSignatureFinisher = XmlSignatureFinisher;
exports.XmlSignatureStarter = XmlSignatureStarter;