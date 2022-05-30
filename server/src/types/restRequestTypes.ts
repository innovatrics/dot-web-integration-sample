import {
  AssertionType,
  EvaluateLivenessType,
  FaceDetectionPropertiesMode,
  Source,
  ImageDimensions,
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
   * The list of the identity document types
   * @type {Array<string>}
   * @memberof DocumentClassificationAdvice
   */
  types?: Array<string>;
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
 * The face size ratio configuration. The minimum have to be less then the maximum.
 * @export
 * @type FaceSizeRatio
 */
export type FaceSizeRatio = {
  /**
   * The minimum face size ratio
   * @type {number}
   * @memberof FaceSizeRatio
   */
  min: number;
  /**
   * The maximum face size ratio
   * @type {number}
   * @memberof FaceSizeRatio
   */
  max: number;
};

/**
 * The face detection properties
 * @export
 * @type FaceDetectionProperties
 */
export type FaceDetectionProperties = {
  /**
   * The face detection mode. The `strict` detection detects face but returns error if multiple faces are detected in the image. The `free` detection detects faces in the image and returns the biggest one with warning if there are multiple faces detected.
   * @type {FaceDetectionPropertiesMode}
   * @memberof FaceDetectionProperties
   */
  mode?: FaceDetectionPropertiesMode;
  /**
   *
   * @type {FaceSizeRatio | null}
   * @memberof FaceDetectionProperties
   */
  faceSizeRatio?: FaceSizeRatio | null;
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
   * @type {Image}
   * @memberof CreateDocumentPageRestRequest
   */
  image: Image;
  /**
   *
   * @type {DocumentPageAdvice}
   * @memberof CreateDocumentPageRestRequest
   */
  advice?: DocumentPageAdvice;
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
  image: Image;
};

export type CustomerLivenessSelfieOrigin = {
  link: string;
};

export type CreateCustomerLivenessSelfieRestRequest = {
  /**
   *
   * @type {Image}
   * @memberof CreateCustomerLivenessSelfieRestRequest
   */
  image?: Image;
  /**
   *
   * @enum {AssertionType}
   * @memberof CreateCustomerLivenessSelfieRestRequest
   */
  assertion?: AssertionType;
  /**
   *
   * @type {CustomerLivenessSelfieOrigin}}
   * @memberof CreateCustomerLivenessSelfieRestRequest
   */
  selfieOrigin?: CustomerLivenessSelfieOrigin;
};

/**
 *
 * @export
 * @type DetectFaceRequest
 */
export type DetectFaceRestRequest = {
  /**
   *
   * @type {Image}
   * @memberof DetectFaceRestRequest
   */
  image: Image;
  /**
   *
   * @type {FaceDetectionProperties}
   * @memberof DetectFaceRestRequest
   */
  detection?: FaceDetectionProperties;
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
  onboardingStatus: StoreCustomerOnboardingStatus;
  externalId?: string;
};
