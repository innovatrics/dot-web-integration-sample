import { TravelDocumentType } from '../../types/graphqlTypes';
import { CustomerDocument } from '../../types/restResponseTypes';
import createCustomerResponse from '../mocks/data/createCustomerResponse.json';
import createCustomer, {
  getCountry,
  getDocumentTypeDetails,
  getUnsupportedDocumentType,
  getDocumentType,
} from './createCustomer';

describe('#createCustomer', () => {
  describe('createCustomer', () => {
    it('should return same customerApiLink as provided in argument', async () => {
      const customerApiLink = '/customer/cf4e8e44-3dd1-432d-9f96-753d0ace2d09';

      return createCustomer(customerApiLink).should.eventually.equal(customerApiLink);
    });

    it('should return same customerApiLink as provided in argument, non-sensical string', async () => {
      const customerApiLink = 'foo.bar';

      return createCustomer(customerApiLink).should.eventually.equal(customerApiLink);
    });

    it('should create new customer, when no customerApiLink was provided in argument', async () => {
      return createCustomer().should.eventually.be.equal(createCustomerResponse.links.self);
    });

    it('should create new customer, when provided customerApiLink was empty string', async () => {
      const customerApiLink = '';

      return createCustomer(customerApiLink).should.eventually.be.equal(createCustomerResponse.links.self);
    });
  });

  describe('getCountry', () => {
    it('should get correct country from list of countries, when country is specified in document.type', () => {
      const document: CustomerDocument = {
        type: {
          country: 'ino',
        },
        pageTypes: ['front'],
      };

      getCountry(document)?.should.be.equal('Innovatrics');
    });

    it('should get correct country from list of countries, when country is not specified in document.type', () => {
      const document: CustomerDocument = {
        issuingAuthority: {
          mrz: 'ino',
        },
        type: {},
        pageTypes: ['front'],
      };

      getCountry(document)?.should.be.equal('Innovatrics');
    });

    it('should return empty string when input is undefined', () => {
      getCountry(undefined)?.should.be.equal('');
    });
  });

  describe('getDocumentTypeDetails', () => {
    it('should render country, type, edition', () => {
      const document: CustomerDocument = {
        type: {
          country: 'ino',
          edition: '2020',
          type: 'identity-card',
        },
        pageTypes: ['front'],
      };

      const expectedResult = {
        country: 'Innovatrics',
        edition: '2020',
        type: 'National ID',
        machineReadableTravelDocument: undefined,
        isDocumentSupported: true,
      };

      getDocumentTypeDetails(document).should.be.deep.equal(expectedResult);
    });

    it('should render type, edition', () => {
      const document: CustomerDocument = {
        type: {
          edition: '2020',
          type: 'identity-card',
        },
        pageTypes: ['front'],
      };

      const expectedResult = {
        country: undefined,
        edition: '2020',
        type: 'National ID',
        machineReadableTravelDocument: undefined,
        isDocumentSupported: true,
      };

      getDocumentTypeDetails(document).should.be.deep.equal(expectedResult);
    });

    it('should render country, type', () => {
      const document: CustomerDocument = {
        type: {
          country: 'ino',
          type: 'identity-card',
        },
        pageTypes: ['front'],
      };

      const expectedResult = {
        country: 'Innovatrics',
        type: 'National ID',
        machineReadableTravelDocument: undefined,
        edition: undefined,
        isDocumentSupported: true,
      };

      getDocumentTypeDetails(document).should.be.deep.equal(expectedResult);
    });

    it('should render country, fallback type, edition', () => {
      const document: CustomerDocument = {
        type: {
          country: 'ino',
          edition: '2020',
          machineReadableTravelDocument: TravelDocumentType.TD1,
        },
        pageTypes: ['front'],
      };

      const expectedResult = {
        country: 'Innovatrics',
        type: 'Foreigner Residence',
        machineReadableTravelDocument: TravelDocumentType.TD1,
        edition: '2020',
        isDocumentSupported: true,
      };

      getDocumentTypeDetails(document).should.be.deep.equal(expectedResult);
    });

    it('should render country received from issuingAuthority, fallback type', () => {
      const document: CustomerDocument = {
        issuingAuthority: {
          mrz: 'ino',
        },
        type: {
          machineReadableTravelDocument: TravelDocumentType.TD1,
        },
        pageTypes: ['front'],
      };

      const expectedResult = {
        country: 'Innovatrics',
        type: 'Foreigner Residence',
        machineReadableTravelDocument: TravelDocumentType.TD1,
        edition: undefined,
        isDocumentSupported: true,
      };

      getDocumentTypeDetails(document).should.be.deep.equal(expectedResult);
    });

    it('should be unsupported documentn when type is undefined', () => {
      const expectedResult = {
        country: undefined,
        type: undefined,
        machineReadableTravelDocument: undefined,
        edition: undefined,
        isDocumentSupported: false,
      };

      getDocumentTypeDetails(undefined).should.be.deep.equal(expectedResult);
    });
  });

  describe('getUnsupportedDocumentType', () => {
    it('should return "Passport" only for type: "td3" and code: "P"', () => {
      getUnsupportedDocumentType(TravelDocumentType.TD3, 'P').should.be.equal('Passport');
    });

    it('should not return "Passport"', () => {
      getUnsupportedDocumentType(TravelDocumentType.TD2, 'P').should.not.be.equal('Passport');
    });

    it('should return "National ID"', () => {
      getUnsupportedDocumentType(TravelDocumentType.TD2, 'IA').should.be.equal('National ID');
    });

    it('should return "National ID"', () => {
      getUnsupportedDocumentType(TravelDocumentType.TD1, 'I').should.be.equal('National ID');
    });

    it('should return "Foreigner Residence"', () => {
      getUnsupportedDocumentType(TravelDocumentType.TD1, 'IF').should.be.equal('Foreigner Residence');
    });
  });

  describe('getDocumentType', () => {
    it('should return correct document type for supported document', () => {
      const document: CustomerDocument = {
        type: {
          type: 'visa',
        },
        pageTypes: ['front'],
      };

      getDocumentType(document, undefined)?.should.be.equal('Visa');
    });

    it('should return correct document type for supported document', () => {
      const document: CustomerDocument = {
        type: {
          type: 'identity-card',
        },
        pageTypes: ['front'],
      };

      getDocumentType(document, undefined)?.should.be.equal('National ID');
    });

    it('should return correct document type for unsupported document', () => {
      const document: CustomerDocument = {
        mrz: {
          td1: {
            documentCode: 'IL',
            issuingAuthority: 'SVK',
            surname: 'BELL',
            givenNames: 'BRIAN',
            documentNumber: 'BB456987',
            nationality: 'SVK',
            dateOfBirth: '850806',
            gender: 'M',
            dateOfExpiry: '301124',
            checkDigitsValidity: {
              documentNumberCheckDigitValid: true,
              dateOfBirthCheckDigitValid: true,
              dateOfExpiryCheckDigitValid: true,
              compositeCheckDigitValid: true,
            },
          },
        },
        type: {},
        pageTypes: ['back'],
      };

      getDocumentType(document, TravelDocumentType.TD1)?.should.be.equal('National ID');
    });

    it('should return empty string, when document and TravelDocumentType are undefined', () => {
      getDocumentType(undefined, undefined)?.should.be.equal('');
    });
  });
});
