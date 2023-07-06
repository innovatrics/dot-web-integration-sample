import type { CustomerDocument } from '../../types/restResponseTypes';

import { TravelDocumentType } from '../../types/graphqlTypes';
import createCustomerResponse from '../mocks/data/createCustomerResponse.json';

import createCustomer, {
  getCountry,
  getDocumentType,
  getDocumentTypeDetails,
  getUnsupportedDocumentType,
} from './createCustomer';

describe('#createCustomer', () => {
  describe('createCustomer', () => {
    it('should return the same customerApiLink as provided in argument', async () => {
      const customerApiLink = '/customer/cf4e8e44-3dd1-432d-9f96-753d0ace2d09';

      await expect(createCustomer(customerApiLink)).resolves.toEqual(customerApiLink);
    });

    it('should return the same customerApiLink as provided in argument, non-sensical string', async () => {
      const customerApiLink = 'foo.bar';

      await expect(createCustomer(customerApiLink)).resolves.toEqual(customerApiLink);
    });

    it('should create new customer, when no customerApiLink was provided in argument', async () => {
      await expect(createCustomer()).resolves.toEqual(createCustomerResponse.links.self);
    });

    it('should create new customer, when provided customerApiLink was empty string', async () => {
      const customerApiLink = '';

      await expect(createCustomer(customerApiLink)).resolves.toEqual(createCustomerResponse.links.self);
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

      expect(getCountry(document)).toEqual('Innovatrics');
    });

    it('should get correct country from list of countries, when country is not specified in document.type', () => {
      const document: CustomerDocument = {
        issuingAuthority: {
          mrz: 'ino',
        },
        type: {},
        pageTypes: ['front'],
      };

      expect(getCountry(document)).toEqual('Innovatrics');
    });

    it('should return empty string when input is undefined', () => {
      expect(getCountry(undefined)).toBeUndefined();
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

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
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

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
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

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
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

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
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

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
    });

    it('should be unsupported document when type is undefined', () => {
      const expectedResult = {
        country: undefined,
        type: undefined,
        machineReadableTravelDocument: undefined,
        edition: undefined,
        isDocumentSupported: false,
      };

      expect(getDocumentTypeDetails(undefined)).toEqual(expectedResult);
    });
  });

  describe('getUnsupportedDocumentType', () => {
    it('should return "Passport" for type: "td3" and code: "P"', () => {
      expect(getUnsupportedDocumentType(TravelDocumentType.TD3, 'P')).toEqual('Passport');
    });

    it('should return "Passport" for type: "td3" and code: "PV"', () => {
      expect(getUnsupportedDocumentType(TravelDocumentType.TD3, 'PV')).toEqual('Passport');
    });

    it('should not return "Passport"', () => {
      expect(getUnsupportedDocumentType(TravelDocumentType.TD2, 'P')).not.toEqual('Passport');
    });

    it('should return "National ID"', () => {
      expect(getUnsupportedDocumentType(TravelDocumentType.TD2, 'IA')).toEqual('National ID');
    });

    it('should return "National ID"', () => {
      expect(getUnsupportedDocumentType(TravelDocumentType.TD1, 'I')).toEqual('National ID');
    });

    it('should return "Foreigner Residence"', () => {
      expect(getUnsupportedDocumentType(TravelDocumentType.TD1, 'IF')).toEqual('Foreigner Residence');
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

      expect(getDocumentType(document, undefined)).toEqual('Visa');
    });

    it('should return correct document type for supported document', () => {
      const document: CustomerDocument = {
        type: {
          type: 'identity-card',
        },
        pageTypes: ['front'],
      };

      expect(getDocumentType(document, undefined)).toEqual('National ID');
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

      expect(getDocumentType(document, TravelDocumentType.TD1)).toEqual('National ID');
    });

    it('should return empty string, when document and TravelDocumentType are undefined', () => {
      expect(getDocumentType(undefined, undefined)).toBeUndefined();
    });
  });
});
