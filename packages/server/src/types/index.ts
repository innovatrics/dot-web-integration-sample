import type { BlobOptions } from 'node:buffer';
import type {
  DocumentAdvice,
  EvaluateCustomerLivenessRequest,
  FaceDetectionProperties,
  MetadataDocumentType,
  MrzInspection,
  PageTamperingInspection,
  Portrait,
  SecurityInspection,
  SelfieInspection,
  TextField,
  VisualZoneInspection,
} from '@innovatrics/dis-client-sdk';

export type EvaluateLivenessType = EvaluateCustomerLivenessRequest['type'];

export const Liveness = {
  EYE_GAZE_LIVENESS: 'EYE_GAZE_LIVENESS',
  MAGNIFEYE_LIVENESS: 'MAGNIFEYE_LIVENESS',
  MULTI_RANGE_LIVENESS: 'MULTI_RANGE_LIVENESS',
  PASSIVE_LIVENESS: 'PASSIVE_LIVENESS',
  SMILE_LIVENESS: 'SMILE_LIVENESS',
} as const;

export type LivenessType = keyof typeof Liveness;

export const Source = {
  BARCODE: 'BARCODE',
  DOCUMENT_PORTRAIT: 'DOCUMENT_PORTRAIT',
  MRZ: 'MRZ',
  VIZ: 'VIZ',
} as const;

export type Source = keyof typeof Source;

export const TravelDocumentType = {
  TD1: 'TD1',
  TD2: 'TD2',
  TD3: 'TD3',
} as const;

export type TravelDocumentType = keyof typeof TravelDocumentType;

export type CustomerDocumentPages = {
  back?: string;
  front?: string;
  unknown?: string;
};

export type ImageDimensions = {
  height?: number;
  width?: number;
};

export type CustomerLinks = {
  customer: string;
};

export type DocumentAgeDifferenceWith = {
  dateOfBirth: number;
};

export type DocumentGenderConsistency = {
  mrz?: boolean;
  viz?: boolean;
};

export type InspectDocumentPortrait = {
  ageDifferenceWith?: DocumentAgeDifferenceWith;
  ageEstimate?: number;
  genderConsistency?: DocumentGenderConsistency;
  genderEstimate?: string;
};

export type OcrConfidence = {
  confidence: number;
  lowOcrConfidenceTexts?: string[];
};

export type VisualZoneConsistency = {
  consistencyWith?: VisualZoneConsistencyWith;
  consistent?: BlobOptions;
};

export type TextConsistencyWith = {
  inconsistentTexts?: string[];
};

export type VisualZoneConsistencyWith = {
  barcodes?: TextConsistencyWith;
  mrz?: TextConsistencyWith;
};

export type InspectDocumentVisualZone = {
  ocrConfidence?: OcrConfidence;
  textConsistency?: VisualZoneConsistency;
};

export type InspectDocumentResponse = {
  expired?: boolean;
  links: CustomerLinks;
  mrzInspection?: MrzInspection;
  pageTampering?: PageTamperingInspection;
  portraitInspection?: InspectDocumentPortrait;
  visualZoneInspection?: VisualZoneInspection;
};

export type InspectCustomerLinks = {
  customer: string;
  documentInspection?: string;
};

export type InspectCustomerResponse = {
  links: InspectCustomerLinks;
  security?: SecurityInspection;
  selfieInspection?: SelfieInspection;
};

export type GetMetadataResponse = {
  documents: {
    documentType: MetadataDocumentType;
    pages: {
      classificationAdviceRequired?: boolean;
      name: string;
      portrait?: Portrait;
      visualZone: (TextField & {
        name: string;
      })[];
    }[];
  }[];
};

export type CreateDocumentPageWithImageProps = {
  customerApiLink: string | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: explanation
  documentAdvice?: any;
  image: string;
  isDocumentCreated: boolean;
  pageType?: string | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: explanation
  sources?: any;
};

export type CreateDocumentPageWithContentProps = {
  content: string;
  customerApiLink: string | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: explanation
  documentAdvice?: any;
  isDocumentCreated: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: explanation
  sources?: any;
};

/**
//  *
//  * @export
//  * @type CreateCustomerDocumentRequest
//  */
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

export type ImagesRestResponse = {
  data: string;
};

export type CroppedImageLinks = {
  fingerprint?: ImageLink;
  ghostPortrait?: ImageLink;
  portrait?: ImageLink;
  signature?: ImageLink;
};

export type ImageLink = {
  dimensions?: ImageDimensions;
  link: string;
};
