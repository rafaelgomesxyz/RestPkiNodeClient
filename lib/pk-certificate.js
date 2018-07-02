'use strict';

class PKCertificate {

   constructor(model) {
      this._emailAddress = model['emailAddress'];
      this._serialNumber = model['serialNumber'];
      this._validityStart = model['validityStart'];
      this._validityEnd = model['validityEnd'];
      if (model['subjectName']) {
         this._subjectName = new Name(model['subjectName']);
      }
      if (model['issuerName']) {
         this._issuerName = new Name(model['issuerName']);
      }
      if (model['pkiBrazil']) {
         this._pkiBrazil = new PkiBrazilCertificateFields(model['pkiBrazil']);
      }
      if (model['pkiItaly']) {
         this._pkiItaly = new PkiItalyCertificateFields(model['pkiItaly']);
      }
      if (model['issuer']) {
         this._issuer = new PKCertificate(model['issuer']);
      }

   }

   get emailAddress() {
      return this._emailAddress;
   }

   get serialNumber() {
      return this._serialNumber;
   }

   get validityStart() {
      return this._validityStart;
   }

   get validityEnd() {
      return this._validityEnd;
   }

   get subjectName() {
      return this._subjectName;
   }

   get issuerName() {
      return this._issuerName;
   }

   get pkiBrazil() {
      return this._pkiBrazil;
   }

   get pkiItaly() {
      return this._pkiItaly;
   }

   get issuer() {
      return this._issuer;
   }
}

class PkiItalyCertificateFields {

   constructor(model) {
      this._certificateType = model['certificateType'];
      this._codiceFiscale = model['codiceFiscale'];
      this._idCarta = model['idCarta'];
   }

   get certificateType() {
      return this._certificateType;
   }

   get codiceFiscale() {
      return this._codiceFiscale;
   }

   get idCarta() {
      return this._idCarta;
   }
}

class PkiBrazilCertificateFields {

   constructor(model) {
      this._certificateType = model['certificateType'];
      this._cpf = model['cpf'];
      this._cnpj = model['cnpj'];
      this._responsavel = model['responsavel'];
      this._companyName = model['companyName'];
      this._oabUF = model['oabUF'];
      this._oabNumero = model['oabNumero'];
      this._rgNumero = model['rgNumero'];
      this._rgEmissor = model['rgEmissor'];
      this._rgEmissorUF = model['rgEmissorUF'];
      if (model['dateOfBirth']) {
         this._dateOfBirth = new Date(model['dateOfBirth']);
      }
   }

   get certificateType() {
      return this._certificateType;
   }

   get cpf() {
      return this._cpf;
   }

   get cnpj() {
      return this._cnpj;
   }

   get responsavel() {
      return this._responsavel;
   }

   get companyName() {
      return this._companyName;
   }

   get oabUF() {
      return this._oabUF;
   }

   get oabNumero() {
      return this._oabNumero;
   }

   get rgNumero() {
      return this._rgNumero;
   }

   get rgEmissor() {
      return this._rgEmissor;
   }

   get rgEmissorUF() {
      return this._rgEmissorUF;
   }

   get dateOfBirth() {
      return this._dateOfBirth;
   }

   get cpfFormatted() {
      if (!this._cpf) {
         return '';
      }
      if (!(/^\d{11}$/.test(this._cpf))) {
         return this._cpf;
      }
      return `${this._cpf.substring(0, 3)}.${this._cpf.substring(3, 6)}.${this._cpf.substring(6, 9)}-${this._cpf.substring(9)}`;
   }

   get cnpjFormatted() {
      if (!this._cnpj) {
         return '';
      }
      if (!(/^\d{14}$/.test(this._cnpj))) {
         return this._cnpj;
      }
      return `${this._cnpj.substring(0, 2)}.${this._cnpj.substring(2, 5)}.${this._cnpj.substring(5, 8)}/${this._cnpj.substring(8, 12)}-${this._cnpj.substring(12)}`;
   }
}

class Name {

   constructor(model) {
      this._commonName = model['commonName'];
      this._country = model['country'];
      this._dnQualifier = model['dnQualifier'];
      this._emailAddress = model['emailAddress'];
      this._generationQualifier = model['generationQualifier'];
      this._givenName = model['givenName'];
      this._initials = model['initials'];
      this._locality = model['locality'];
      this._organization = model['organization'];
      this._organizationUnit = model['organizationUnit'];
      this._pseudonym = model['pseudonym'];
      this._serialNumber = model['serialNumber'];
      this._stateName = model['stateName'];
      this._surname = model['surname'];
      this._title = model['title'];
   }

   get commonName() {
      return this._commonName;
   }

   get country() {
      return this._country;
   }

   get dnQualifier() {
      return this._dnQualifier;
   }

   get emailAddress() {
      return this._emailAddress;
   }

   get generationQualifier() {
      return this._generationQualifier;
   }

   get givenName() {
      return this._givenName;
   }

   get initials() {
      return this._initials;
   }

   get locality() {
      return this._locality;
   }

   get organization() {
      return this._organization;
   }

   get organizationUnit() {
      return this._organizationUnit;
   }

   get pseudonym() {
      return this._pseudonym;
   }

   get serialNumber() {
      return this._serialNumber;
   }

   get stateName() {
      return this._stateName;
   }

   get surname() {
      return this._surname;
   }

   get title() {
      return this._title;
   }
}

exports.PKCertificate = PKCertificate;
exports.PkiBrazilCertificateFields = PkiBrazilCertificateFields;
exports.PkiItalyCertificateFields = PkiItalyCertificateFields;
exports.Name = Name;
