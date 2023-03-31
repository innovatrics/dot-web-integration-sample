import type {
  AssertionType,
  ContactFormRequest,
  CreateCustomerLivenessSelfieResponse,
  CreateDocumentPageResponse,
  CreateMagnifeyeLivenessSelfieResponse,
  CroppedImageLinks,
  CroppedImagesResponse,
  CroppedSelfieResponse,
  CustomerDocumentPages,
  DetectFaceResponse,
  DetectSelfieResponse,
  DocumentAdvice,
  EvaluateCustomerLivenessResponse,
  EvaluateLivenessType,
  FaceDetectionProperties,
  FaceQualityResponse,
  GetAppInfoResponse,
  GetCustomerResponse,
  GetMetadataResponse,
  ImageDimensions,
  InspectCustomerResponse,
  InspectDocumentResponse,
  Source,
  StoreCustomerOnboardingStatus,
  StoreCustomerResponse,
} from '../../types/graphqlTypes';

import { createCustomerLivenessResolver } from './createCustomerLivenessResolver';
import { createDocumentPageResolver } from './createDocumentPageResolver';
import { createFaceResolver } from './createFaceResolver';
import { createMagnifeyeLivenessResolver } from './createMagnifeyeLivenessResolver';
import { createSelfieResolver } from './createSelfieResolver';
import { deleteCustomerResolver } from './deleteCustomerResolver';
import { evaluateCustomerLivenessResolver } from './evaluateCustomerLivenessResolver';
import { getAppInfoResolver } from './getAppInfoResolver';
import { getCroppedImagesResolver } from './getCroppedImagesResolver';
import { getCroppedSelfieResolver } from './getCroppedSelfieResolver';
import { getCustomerResolver } from './getCustomerResolver';
import { getFaceQualityResolver } from './getFaceQualityResolver';
import { getMetadataResolver } from './getMetadataResolver';
import { inspectCustomerResolver } from './inspectCustomerResolver';
import { inspectDocumentResolver } from './inspectDocumentResolver';
import { normalizedDocumentImagesResolver } from './normalizedDocumentImagesResolver';
import { postContactFormResolver } from './postContactFormResolver';
import { storeCustomerResolver } from './storeCustomerResolver';

const resolvers = {
  Query: {
    customer(_: unknown, args: { customerApiLink: string }): Promise<GetCustomerResponse> {
      return getCustomerResolver(args.customerApiLink);
    },
    inspectDocument(_: unknown, args: { customerApiLink: string }): Promise<InspectDocumentResponse> {
      return inspectDocumentResolver(args.customerApiLink);
    },
    inspectCustomer(_: unknown, args: { customerApiLink: string }): Promise<InspectCustomerResponse> {
      return inspectCustomerResolver(args.customerApiLink);
    },
    faceQuality(_: unknown, args: { faceApiLink: string }): Promise<FaceQualityResponse> {
      return getFaceQualityResolver(args.faceApiLink);
    },
    normalizedDocumentImages(
      _: unknown,
      args: { dimensions?: ImageDimensions; pages?: CustomerDocumentPages },
    ): Promise<CustomerDocumentPages> {
      return normalizedDocumentImagesResolver(args.pages, args.dimensions);
    },
    croppedImages(_: unknown, args: { imageLinks: CroppedImageLinks }): Promise<CroppedImagesResponse> {
      return getCroppedImagesResolver(args.imageLinks);
    },
    croppedSelfie(
      _: unknown,
      args: { dimensions?: ImageDimensions; faceApiLink: string },
    ): Promise<CroppedSelfieResponse> {
      return getCroppedSelfieResolver(args.faceApiLink, args.dimensions);
    },
    evaluateCustomerLiveness(
      _: unknown,
      args: { customerApiLink: string; type: `${EvaluateLivenessType}` },
    ): Promise<EvaluateCustomerLivenessResponse> {
      return evaluateCustomerLivenessResolver(args.type, args.customerApiLink);
    },
    storeCustomer(
      _: unknown,
      args: { customerApiLink: string; onboardingStatus: StoreCustomerOnboardingStatus },
    ): Promise<StoreCustomerResponse> {
      return storeCustomerResolver(args.customerApiLink, args.onboardingStatus);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata(_: unknown): Promise<GetMetadataResponse> {
      return getMetadataResolver();
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appInfo(_: unknown): Promise<GetAppInfoResponse> {
      return getAppInfoResolver();
    },
  },
  Mutation: {
    deleteCustomer(_: unknown, args: { customerApiLink: string }): Promise<void> {
      return deleteCustomerResolver(args.customerApiLink);
    },
    createDocumentPage(
      _: unknown,
      args: {
        customerApiLink?: string;
        documentAdvice?: DocumentAdvice;
        image: string;
        isDocumentCreated: boolean;
        pageType?: string;
        sources?: Source[];
      },
    ): Promise<CreateDocumentPageResponse> {
      return createDocumentPageResolver(
        args.image,
        args.isDocumentCreated,
        args.pageType,
        args.documentAdvice,
        args.customerApiLink,
        args.sources,
      );
    },
    createSelfie(
      _: unknown,
      args: { customerApiLink?: string; image?: string; selfieLink?: string },
    ): Promise<DetectSelfieResponse> {
      return createSelfieResolver(args.image, args.customerApiLink, args.selfieLink);
    },
    createCustomerLiveness(
      _: unknown,
      args: {
        assertionType?: `${AssertionType}`;
        customerApiLink?: string;
        image?: string;
        isLivenessCreated?: boolean;
        selfieLink?: string;
      },
    ): Promise<CreateCustomerLivenessSelfieResponse> {
      return createCustomerLivenessResolver(
        args.image,
        args.assertionType,
        args.isLivenessCreated,
        args.customerApiLink,
        args.selfieLink,
      );
    },
    createMagnifeyeLiveness(
      _: unknown,
      args: {
        customerApiLink?: string;
        isLivenessCreated?: boolean;
        magnifeyeMessage: string;
      },
    ): Promise<CreateMagnifeyeLivenessSelfieResponse> {
      return createMagnifeyeLivenessResolver(args.magnifeyeMessage, args.customerApiLink, args.isLivenessCreated);
    },
    createFace(_: unknown, args: { detection?: FaceDetectionProperties; image: string }): Promise<DetectFaceResponse> {
      return createFaceResolver(args.image, args.detection);
    },
    postContactForm(_: unknown, args: { contactFormData: ContactFormRequest; recaptchaToken: string }): Promise<void> {
      return postContactFormResolver(args.contactFormData, args.recaptchaToken);
    },
  },
};

export default resolvers;
