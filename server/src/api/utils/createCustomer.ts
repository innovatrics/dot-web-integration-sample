import countriesJson from '../../assets/countries.json';
import { DOCUMENT_TYPE, DOCUMENT_CODE_PASSPORT, DOCUMENT_CODES_ID } from '../../constants';
import { TravelDocumentType, ParsedDocumentType } from '../../types/graphqlTypes';
import { CustomerDocument } from '../../types/restResponseTypes';
import { Countries } from '../../types/serverTypes';
import { createCustomerApi } from '../customersApi';

const createCustomer = async (customerApiLink?: string): Promise<string> => {
  if (!customerApiLink) {
    const res = await createCustomerApi();
    const customer = res.links.self;

    return customer;
  }

  return customerApiLink;
};

export default createCustomer;

/**
 * Get document type for unsupported documents.
 */
export const getUnsupportedDocumentType = (travelDocumentType?: TravelDocumentType, documentCode?: string) => {
  /**
   * For Td3 documents:
   * If documentCode is "P"
   * document type is 'passport'
   */
  if (travelDocumentType === 'td3' && documentCode === DOCUMENT_CODE_PASSPORT) {
    return DOCUMENT_TYPE.passport;
  }

  /**
   * For Td1 | Td2 documents:
   * If documentCode is "I", "ID", "IA", "IC", "IL"
   * document type is 'identity-card'
   */
  if (documentCode && DOCUMENT_CODES_ID.includes(documentCode)) {
    return DOCUMENT_TYPE['identity-card'];
  }

  /**
   * otherwise document type is 'foreigner-residence'
   */
  return DOCUMENT_TYPE['foreigner-residence'];
};

/**
 * Get document type for supported and unsupported documents
 */
export const getDocumentType = (document?: CustomerDocument, travelDocumentType?: TravelDocumentType) => {
  const documentType = document?.type?.type;
  let type;

  // supported documents
  if (documentType) {
    type = DOCUMENT_TYPE[documentType];
  }

  // unsupported documents
  if (!documentType && travelDocumentType) {
    type = getUnsupportedDocumentType(travelDocumentType, document?.mrz?.[travelDocumentType]?.documentCode);
  }

  return type;
};

/**
 * Get country based on country code provided in document data.
 */
export const getCountry = (document?: CustomerDocument) => {
  // countryCode is either in type.country (parsed from visualZone on API) or Mrz
  const countryCode = document?.type?.country ?? document?.issuingAuthority?.mrz;

  const countryKey = countryCode?.toUpperCase();
  const countries: Countries = countriesJson;

  return countryKey ? countries[countryKey] : undefined;
};

export const getTravelDocumentType = (document?: CustomerDocument): TravelDocumentType | undefined => {
  const type = document?.type?.machineReadableTravelDocument;

  if (type) {
    const enumKey = type.toUpperCase() as keyof typeof TravelDocumentType;

    return TravelDocumentType[enumKey];
  }

  return undefined;
};

export const getDocumentTypeDetails = (document?: CustomerDocument): ParsedDocumentType => {
  const travelDocumentType = getTravelDocumentType(document);

  return {
    country: getCountry(document),
    type: getDocumentType(document, travelDocumentType),
    edition: document?.type?.edition,
    machineReadableTravelDocument: travelDocumentType,
    isDocumentSupported: Boolean(document?.type),
  };
};
