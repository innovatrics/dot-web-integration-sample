import type { CustomerDocument } from '@innovatrics/dis-client-sdk';
import { TravelDocumentType } from '../../types/index.ts';
import createCustomerResponse from '../mocks/data/createCustomerResponse.json';
import { createCustomer } from './customer.ts';
import { getCountry, getDocumentType, getDocumentTypeDetails, getUnsupportedDocumentType } from './document.ts';

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
        links: {},
        pageTypes: ['front'],
        type: {
          country: 'ino',
        },
      };

      expect(getCountry(document)).toEqual('Innovatrics');
    });

    it('should get correct country from list of countries, when country is not specified in document.type', () => {
      const document: CustomerDocument = {
        issuingAuthority: {
          mrz: 'ino',
        },
        links: {},
        pageTypes: ['front'],
        type: {},
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
        links: {},
        pageTypes: ['front'],
        type: {
          country: 'ino',
          edition: '2020',
          type: 'identity-card',
        },
      };

      const expectedResult = {
        country: 'Innovatrics',
        edition: '2020',
        machineReadableTravelDocument: undefined,
        type: 'National ID',
      };

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
    });

    it('should render type, edition', () => {
      const document: CustomerDocument = {
        links: {},
        pageTypes: ['front'],
        type: {
          edition: '2020',
          type: 'identity-card',
        },
      };

      const expectedResult = {
        country: undefined,
        edition: '2020',
        machineReadableTravelDocument: undefined,
        type: 'National ID',
      };

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
    });

    it('should render country, type', () => {
      const document: CustomerDocument = {
        links: {},
        pageTypes: ['front'],
        type: {
          country: 'ino',
          type: 'identity-card',
        },
      };

      const expectedResult = {
        country: 'Innovatrics',
        edition: undefined,
        machineReadableTravelDocument: undefined,
        type: 'National ID',
      };

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
    });

    it('should render country, fallback type, edition', () => {
      const document: CustomerDocument = {
        links: {},
        pageTypes: ['front'],
        type: {
          country: 'ino',
          edition: '2020',
          machineReadableTravelDocument: TravelDocumentType.TD1,
        },
      };

      const expectedResult = {
        country: 'Innovatrics',
        edition: '2020',
        machineReadableTravelDocument: TravelDocumentType.TD1,
        type: 'Foreigner Residence',
      };

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
    });

    it('should render country received from issuingAuthority, fallback type', () => {
      const document: CustomerDocument = {
        issuingAuthority: {
          mrz: 'ino',
        },
        links: {},
        pageTypes: ['front'],
        type: {
          machineReadableTravelDocument: TravelDocumentType.TD1,
        },
      };

      const expectedResult = {
        country: 'Innovatrics',
        edition: undefined,
        machineReadableTravelDocument: TravelDocumentType.TD1,
        type: 'Foreigner Residence',
      };

      expect(getDocumentTypeDetails(document)).toEqual(expectedResult);
    });

    it('should be unsupported document when type is undefined', () => {
      const expectedResult = {
        country: undefined,
        edition: undefined,
        machineReadableTravelDocument: undefined,
        type: undefined,
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
        links: {},
        pageTypes: ['front'],
        type: {
          type: 'visa',
        },
      };

      expect(getDocumentType(document, undefined)).toEqual('Visa');
    });

    it('should return correct document type for supported document', () => {
      const document: CustomerDocument = {
        links: {},
        pageTypes: ['front'],
        type: {
          type: 'identity-card',
        },
      };

      expect(getDocumentType(document, undefined)).toEqual('National ID');
    });

    it('should return correct document type for unsupported document', () => {
      const document: CustomerDocument = {
        links: {},
        mrz: {
          td1: {
            checkDigitsValidity: {
              compositeCheckDigitValid: true,
              dateOfBirthCheckDigitValid: true,
              dateOfExpiryCheckDigitValid: true,
              documentNumberCheckDigitValid: true,
            },
            dateOfBirth: '850806',
            dateOfExpiry: '301124',
            documentCode: 'IL',
            documentNumber: 'BB456987',
            gender: 'M',
            givenNames: 'BRIAN',
            issuingAuthority: 'SVK',
            issuingState: '',
            nationality: 'SVK',
            surname: 'BELL',
          },
        },
        pageTypes: ['back'],
        type: {},
      };

      expect(getDocumentType(document, TravelDocumentType.TD1)).toEqual('National ID');
    });

    it('should return empty string, when document and TravelDocumentType are undefined', () => {
      expect(getDocumentType(undefined, undefined)).toBeUndefined();
    });
  });
});
