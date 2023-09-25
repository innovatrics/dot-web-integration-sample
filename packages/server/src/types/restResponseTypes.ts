import type {
  BiometricMultiValueAttribute,
  CreateDocumentPageResponseErrorCode,
  CreateDocumentPageResponseWarning,
  CreateLivenessRecordsErrorCode,
  CustomerDocumentLinks,
  CustomerSelfieInspection,
  DetectFaceResponseErrorCode,
  DetectFaceResponseWarnings,
  DetectSelfieErrorCode,
  DetectSelfieWarnings,
  DocumentDetection,
  DocumentType,
  EvaluateLivenessErrorCode,
  FaceAttribute,
  FaceDetection,
  HeadPoseAttribute,
  InspectCustomerLinks,
  InspectDocumentPortrait,
  InspectDocumentVisualZone,
  LivenessRecordsDetection,
  LivenessRecordsSelfieLink,
  MetadataDocumentType,
  Mrz,
  MrzInspection,
  MultiValueAttribute,
  PageTamperingInspection,
  SelfLinks,
} from './graphqlTypes';

/**
 * The customer. The date format is `YYYY-MM-DD` and the gender format is: `M` for male, `F` for female.
 * @type Customer
 */
type Customer = {
  /**
   *
   * @type {BiometricMultiValueAttribute}
   * @memberof Customer
   */
  age?: BiometricMultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  citizenship?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  dateOfBirth?: MultiValueAttribute;
  /**
   *
   * @type {CustomerDocument}
   * @memberof Customer
   */
  document?: CustomerDocument;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  fullName?: MultiValueAttribute;
  /**
   *
   * @type {BiometricMultiValueAttribute}
   * @memberof Customer
   */
  gender?: BiometricMultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  givenNames?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  nationality?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  personalNumber?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof Customer
   */
  surname?: MultiValueAttribute;
};

/**
 * The attribute values.
 * @type MultivalueAttributeWithoutMrz
 */
type MultivalueAttributeWithoutMrz = {
  /**
   * The attribute value obtained from the document's barcode.
   * @type {string}
   * @memberof MultivalueAttributeWithoutMrz
   */
  barcode?: string;
  /**
   * The attribute value obtained from the document's visual zone.
   * @type {string}
   * @memberof MultivalueAttributeWithoutMrz
   */
  visualZone?: string;
};

/**
 * The customer's document.
 * @type CustomerDocument
 */
export type CustomerDocument = {
  /**
   *
   * @type {{ [key: string]: MultivalueAttributeWithoutMrz }}
   * @memberof CustomerDocument
   */
  additionalTexts?: { [key: string]: MultivalueAttributeWithoutMrz };
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof CustomerDocument
   */
  dateOfExpiry?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof CustomerDocument
   */
  dateOfIssue?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof CustomerDocument
   */
  documentNumber?: MultiValueAttribute;
  /**
   *
   * @type {MultiValueAttribute}
   * @memberof CustomerDocument
   */
  issuingAuthority?: MultiValueAttribute;
  /**
   *
   * @type {CustomerDocumentLinks}
   * @memberof CustomerDocument
   */
  links?: CustomerDocumentLinks;
  /**
   *
   * @type {Mrz}
   * @memberof CustomerDocument
   */
  mrz?: Mrz;
  /**
   * Document's page types
   * @type {Array<string>}
   * @memberof CustomerDocument
   */
  pageTypes: Array<string>;
  /**
   *
   * @type {DocumentType}
   * @memberof CustomerDocument
   */
  type: DocumentType;
};

/**
 *
 * @export
 * @type GetCustomerRestResponse
 */
export type GetCustomerRestResponse = {
  /**
   *
   * @type {Customer}
   * @memberof GetCustomerRestResponse
   */
  customer?: Customer;
};

/**
 *
 * @export
 * @type CreateCustomerRestResponse
 */
export type CreateCustomerRestResponse = {
  /**
   *
   * @type {SelfLinks}
   * @memberof
   */
  links: SelfLinks;
};

/**
 *
 * @export
 * @type FaceQualityRestResponse
 */
export type FaceQualityRestResponse = {
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  backgroundUniformity?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  brightness?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  contrast?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  eyeDistance?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  eyeGaze?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  faceRelativeArea?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  faceRelativeAreaInImage?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  faceSize?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  heavyFrame?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  leftEye?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  mouth?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  noseShadow?: FaceAttribute;
  /**
   *
   * @type {HeadPoseAttribute}
   * @memberof FaceQualityRestResponse
   */
  pitch?: HeadPoseAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  redLeftEye?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  redRightEye?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  rightEye?: FaceAttribute;
  /**
   *
   * @type {HeadPoseAttribute}
   * @memberof FaceQualityRestResponse
   */
  roll?: HeadPoseAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  shadow?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  sharpness?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  specularity?: FaceAttribute;
  /**
   *
   * @type {FaceAttribute}
   * @memberof FaceQualityRestResponse
   */
  uniqueIntensityLevels?: FaceAttribute;
  /**
   *
   * @type {HeadPoseAttribute}
   * @memberof FaceQualityRestResponse
   */
  yaw?: HeadPoseAttribute;
};

/**
 *
 * @export
 * @type InspectCustomerRestResponse
 */
export type InspectCustomerRestResponse = {
  /**
   *
   * @type {InspectCustomerLinks}
   * @memberof InspectCustomerRestResponse
   */
  links: InspectCustomerLinks;
  /**
   *
   * @type {CustomerSelfieInspection}
   * @memberof InspectCustomerRestResponse
   */
  selfieInspection?: CustomerSelfieInspection;
};

/**
 *
 * @export
 * @type InspectDocumentRestResponse
 */
export type InspectDocumentRestResponse = {
  /**
   *
   * @type {boolean}
   * @memberof InspectDocumentRestResponse
   */
  expired?: boolean;
  /**
   *
   * @type {MrzInspection}
   * @memberof InspectDocumentRestResponse
   */
  mrzInspection?: MrzInspection;
  /**
   *
   * @type { { [key: string]: PageTamperingInspection }}
   * @memberof InspectDocumentRestResponse
   */
  pageTampering?: { [key: string]: PageTamperingInspection };
  /**
   *
   * @type {InspectDocumentPortrait}
   * @memberof InspectDocumentRestResponse
   */
  portraitInspection?: InspectDocumentPortrait;
  /**
   *
   * @type {InspectDocumentVisualZone}
   * @memberof InspectDocumentRestResponse
   */
  visualZoneInspection?: InspectDocumentVisualZone;
};

/**
 *
 * @export
 * @type CreateDocumentPageRestResponse
 */
export type CreateDocumentPageRestResponse = {
  /**
   *
   * @type {DocumentDetection}
   * @memberof CreateDocumentPageRestResponse
   */
  detection?: DocumentDetection;
  /**
   *
   * @type {DocumentType}
   * @memberof CreateDocumentPageRestResponse
   */
  documentType?: DocumentType;
  /**
   *
   * @type {CreateDocumentPageResponseErrorCode}
   * @memberof CreateDocumentPageRestResponse
   */
  errorCode?: CreateDocumentPageResponseErrorCode;
  /**
   * Document's page type
   * @type {string}
   * @memberof CreateDocumentPageRestResponse
   */
  pageType?: string;
  /**
   *
   * @type {CreateDocumentPageResponseWarning}
   * @memberof CreateDocumentPageRestResponse
   */
  warnings?: Array<CreateDocumentPageResponseWarning>;
};

/**
 *
 * @export
 * @type DetectSelfieRestResponse
 */
export type DetectSelfieRestResponse = {
  /**
   *
   * @type {FaceDetection}
   * @memberof DetectSelfieRestResponse
   */
  detection?: FaceDetection;
  /**
   * The face detection error code
   * @type {DetectSelfieErrorCode}
   * @memberof DetectSelfieRestResponse
   */
  errorCode?: DetectSelfieErrorCode;
  /**
   *
   * @type {SelfLinks}
   * @memberof DetectSelfieRestResponse
   */
  links: SelfLinks;
  /**
   * The face detection warning
   * @type {DetectSelfieWarnings}
   * @memberof DetectSelfieRestResponse
   */
  warnings?: Array<DetectSelfieWarnings>;
};

/**
 *
 * @export
 * @type CroppedSelfieImageRestResponse
 */
export type CroppedSelfieImageRestResponse = {
  /**
   * Image data as base64 format
   * @type {string}
   * @memberof CroppedSelfieImageRestResponse
   */
  data: string;
};

/**
 *
 * @export
 * @type CreateLivenessRecordsRestResponse
 */
export type CreateLivenessRecordsRestResponse = {
  /**
   *
   * @type {CreateLivenessRecordsErrorCode}
   * @memberof CreateLivenessRecordsRestResponse
   */
  errorCode?: CreateLivenessRecordsErrorCode;
  /**
   *
   * @type {LivenessRecordsSelfieLink}
   * @memberof CreateLivenessRecordsRestResponse
   */
  links: LivenessRecordsSelfieLink;
  /**
   *
   * @type {LivenessRecordsDetection}
   * @memberof CreateLivenessRecordsRestResponse
   */
  selfie: LivenessRecordsDetection;
};

/**
 *
 * @export
 * @type DetectFaceRestResponse
 */
export type DetectFaceRestResponse = {
  /**
   *
   * @type {FaceDetection}
   * @memberof DetectFaceRestResponse
   */
  detection?: FaceDetection;
  /**
   * The face detection error code
   * @type {DetectFaceResponseErrorCode}
   * @memberof DetectFaceRestResponse
   */
  errorCode?: DetectFaceResponseErrorCode;
  /**
   *
   * @type {SelfLinks}
   * @memberof DetectFaceRestResponse
   */
  links?: SelfLinks;
  /**
   * The face detection warning
   * @type {Array<DetectFaceResponseWarnings>}
   * @memberof DetectFaceRestResponse
   */
  warnings?: Array<DetectFaceResponseWarnings>;
};

/**
 *
 * @export
 * @type EvaluateCustomerLivenessRestResponse
 */
export type EvaluateCustomerLivenessRestResponse = {
  /**
   * The liveness error code
   * @type {EvaluateLivenessErrorCode}
   * @memberof EvaluateCustomerLivenessRestResponse
   */
  errorCode?: EvaluateLivenessErrorCode;
  /**
   * The liveness score
   * @type {number}
   * @memberof EvaluateCustomerLivenessRestResponse
   */
  score?: number;
};

/**
 *
 * @export
 * @type CreateCustomerLivenessRestResponse
 */
export type CreateCustomerLivenessRestResponse = {
  /**
   *
   * @type {SelfLinks}
   * @memberof CreateCustomerLivenessRestResponse
   */
  links: SelfLinks;
};

/**
 * Text field metadata
 * @export
 * @type MetadataTextField
 */
export type MetadataTextField = {
  /**
   * Label printed on card (if present)
   * @type {string}
   * @memberof MetadataTextField
   */
  label?: string;
  /**
   * If the value is being normalized
   * @type {boolean}
   * @memberof MetadataTextField
   */
  valueNormalized?: boolean;
};

/**
 *
 * @export
 * @type Page
 */
export type Page = {
  /**
   * Text fields metadata
   * @type {{ [key: string]: MetadataTextField; }}
   * @memberof Page
   */
  visualZone: { [key: string]: MetadataTextField };
};

/**
 *
 * @export
 * @type MetadataDocument
 */
export type MetadataDocument = {
  /**
   *
   * @type {MetadataDocumentType}
   * @memberof MetadataDocument
   */
  documentType?: MetadataDocumentType;
  /**
   * A map of Page objects
   * @type {{ [key: string]: Page; }}
   * @memberof MetadataDocument
   */
  pages: { [key: string]: Page };
};

/**
 *
 * @export
 * @type MetadataResponse
 */
export type MetadataRestResponse = {
  /**
   * An array of document metadata
   * @type {Array<MetadataDocument>}
   * @memberof MetadataResponse
   */
  documents: Array<MetadataDocument>;
};

export type CreateDocumentRestResponse = {
  links: SelfLinks;
};

/**
 *
 * @export
 * @type NormalizedDocumentImagesRestResponse
 */
export type NormalizedDocumentImagesRestResponse = {
  /**
   * Image data as base64 format
   * @type {string}
   * @memberof NormalizedDocumentImagesRestResponse
   */
  data: string;
};

/**
 *
 * @export
 * @type CroppedImageRestResponse
 */
export type CroppedImageRestResponse = {
  /**
   * Image data as base64 format
   * @type {string}
   * @memberof CroppedImageRestResponse
   */
  data: string;
};

/**
 *
 * @export
 * @type StoreCustomerRestResponse
 */
export type StoreCustomerRestResponse = {
  /**
   * @type {string}
   * @memberof StoreCustomerRestResponse
   */
  error: string;
  /**
   * @type {string}
   * @memberof StoreCustomerRestResponse
   */
  path: string;
  /**
   * @type {number}
   * @memberof StoreCustomerRestResponse
   */
  status: number;
  /**
   * @type {number}
   * @memberof StoreCustomerRestResponse
   */
  timestamp: number;
};

type AppInfoBuild = {
  artifact: string;
  group: string;
  name: string;
  version: string;
};

type AppInfoSam = { version: string };

type AppInfoIFaceLicense = {
  day: string;
  month: string;
  year: string;
};

type AppInfoIFace = {
  license: AppInfoIFaceLicense;
  version: string;
};

export type GetAppInfoRestResponse = {
  build: AppInfoBuild;
  iface: AppInfoIFace;
  sam: AppInfoSam;
};
