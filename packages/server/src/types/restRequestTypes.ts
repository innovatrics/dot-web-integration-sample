import type {
  EvaluateLivenessType,
  FaceDetectionProperties,
  ImageDimensions,
  Source,
  StoreCustomerOnboardingStatus,
} from './graphqlTypes';

/**
 * Image provided as Base64 encoded string or via URL. Data or URL have to be provided.
 * @export
 * @type Image
 */
export type Image = {
  /**
   * Image as Base64 encoded string
   * @type {string}
   * @memberof Image
   */
  data?: string;
  /**
   * Image's URL
   * @type {string}
   * @memberof Image
   */
  url?: string;
};

/**
 * The document classification processing advice.
 * @export
 * @type DocumentClassificationAdvice
 */
export type DocumentClassificationAdvice = {
  /**
   * The list of Alpha-3 ISO 3166 country codes
   * @type {Array<string>}
   * @memberof DocumentClassificationAdvice
   */
  countries?: Array<string>;
  /**
   * The list of the document editions
   * @type {Array<string>}
   * @memberof DocumentClassificationAdvice
   */
  editions?: Array<string>;
  /**
   * The list of the MRZ types
   * @type {Array<string>}
   * @memberof DocumentClassificationAdvice
   */
  machineReadableTravelDocuments?: Array<string>;
  /**
   * The list of the identity document types
   * @type {Array<string>}
   * @memberof DocumentClassificationAdvice
   */
  types?: Array<string>;
};

/**
 * The document processing advice.
 * @export
 * @type DocumentAdvice
 */
export type DocumentAdvice = {
  /**
   *
   * @type {DocumentClassificationAdvice }
   * @memberof DocumentAdvice
   */
  classification?: DocumentClassificationAdvice;
};

/**
 * The document page classification processing advice.
 * @export
 * @type DocumentPageClassificationAdvice
 */
export type DocumentPageClassificationAdvice = {
  /**
   * The list of the page types
   * @type {Array<string>}
   * @memberof DocumentPageClassificationAdvice
   */
  pageTypes: Array<string>;
};

/**
 * The document page processing advice.
 * @export
 * @type DocumentPageAdvice
 */
export type DocumentPageAdvice = {
  /**
   *
   * @type {DocumentPageClassificationAdvice}
   * @memberof DocumentPageAdvice
   */
  classification?: DocumentPageClassificationAdvice;
};

/**
 *
 * @export
 * @type CreateCustomerDocumentRequest
 */
export type CreateCustomerDocumentRestRequest = {
  /**
   *
   * @type {DocumentAdvice}
   * @memberof CreateCustomerDocumentRestRequest
   */
  advice?: DocumentAdvice;
  /**
   *
   * @type {DocumentAdvice}
   * @memberof CreateCustomerDocumentRestRequest
   */
  sources?: Array<Source>;
};

/**
 *
 * @export
 * @type CreateDocumentPageRequest
 */
export type CreateDocumentPageRestRequest = {
  /**
   *
   * @type {DocumentPageAdvice}
   * @memberof CreateDocumentPageRestRequest
   */
  advice?: DocumentPageAdvice;
  /**
   *
   * @type {Image}
   * @memberof CreateDocumentPageRestRequest
   */
  image: Image;
};

/**
 * Upload selfie request.
 * @export
 * @type DetectSelfieRequest
 */
export type DetectSelfieRestRequest = {
  /**
   *
   * @type {Image}
   * @memberof DetectSelfieRestRequest
   */
  image?: Image;
  /**
   *
   * @type {CustomerLivenessSelfieOrigin}}
   * @memberof DetectSelfieRestRequest
   */
  selfieOrigin?: CustomerLivenessSelfieOrigin;
};

export type CustomerLivenessSelfieOrigin = {
  link: string;
};

/**
 *
 * @export
 * @type DetectFaceRequest
 */
export type DetectFaceRestRequest = {
  /**
   *
   * @type {FaceDetectionProperties}
   * @memberof DetectFaceRestRequest
   */
  detection?: FaceDetectionProperties;
  /**
   *
   * @type {Image}
   * @memberof DetectFaceRestRequest
   */
  image: Image;
};
/**
 *
 * @export
 * @type EvaluateCustomerLivenessRequest
 */
export type EvaluateCustomerLivenessRestRequest = {
  /**
   *
   * @type {EvaluateLivenessType}
   * @memberof EvaluateCustomerLivenessRestRequest
   */
  type: EvaluateLivenessType;
};

/**
 *
 * @export
 * @type ImageDimensionsRestRequest
 */
export type ImageDimensionsRestRequest = ImageDimensions;

/**
 *
 * @export
 * @type StoreCustomerRequest
 */
export type StoreCustomerRequest = {
  externalId?: string;
  onboardingStatus: StoreCustomerOnboardingStatus;
};

/**
 * ContactFormRestRequest is an object with a name, company, email, message, and checked property,
 * where name, company, email, and message are strings, and checked is a boolean.
 * @property {string} name - The name of the person who is contacting you.
 * @property {string} company - The company name of the person filling out the form.
 * @property {string} email - The email address of the person who filled out the form.
 * @property {string} message - string;
 * @property {boolean} checked - boolean;
 */
export type ContactFormRestRequest = {
  checked: boolean;
  company: string;
  email: string;
  message: string;
  name: string;
};
