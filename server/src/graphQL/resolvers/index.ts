import {
  GetCustomerResponse,
  CreateDocumentPageResponse,
  DocumentAdvice,
  DetectSelfieResponse,
  InspectDocumentResponse,
  InspectCustomerResponse,
  CreateCustomerLivenessSelfieResponse,
  DetectFaceResponse,
  FaceQualityResponse,
  FaceDetectionProperties,
  EvaluateCustomerLivenessResponse,
  GetMetadataResponse,
  Source,
  EvaluateLivenessType,
  AssertionType,
  ImageDimensions,
  CroppedImagesResponse,
  CroppedImageLinks,
  CustomerDocumentPages,
  CroppedSelfieResponse,
  StoreCustomerResponse,
  StoreCustomerOnboardingStatus,
  GetAppInfoResponse,
} from '../../types/graphqlTypes';
import { createCustomerLivenessResolver } from './createCustomerLivenessResolver';
import { createDocumentPageResolver } from './createDocumentPageResolver';
import { createFaceResolver } from './createFaceResolver';
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
      args: { pages?: CustomerDocumentPages; dimensions?: ImageDimensions },
    ): Promise<CustomerDocumentPages> {
      return normalizedDocumentImagesResolver(args.pages, args.dimensions);
    },
    croppedImages(_: unknown, args: { imageLinks: CroppedImageLinks }): Promise<CroppedImagesResponse> {
      return getCroppedImagesResolver(args.imageLinks);
    },
    croppedSelfie(
      _: unknown,
      args: { faceApiLink: string; dimensions?: ImageDimensions },
    ): Promise<CroppedSelfieResponse> {
      return getCroppedSelfieResolver(args.faceApiLink, args.dimensions);
    },
    evaluateCustomerLiveness(
      _: unknown,
      args: { type: `${EvaluateLivenessType}`; customerApiLink: string },
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
        image: string;
        isDocumentCreated: boolean;
        pageType?: string;
        documentAdvice?: DocumentAdvice;
        customerApiLink?: string;
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
    createSelfie(_: unknown, args: { image: string; customerApiLink?: string }): Promise<DetectSelfieResponse> {
      return createSelfieResolver(args.image, args.customerApiLink);
    },
    createCustomerLiveness(
      _: unknown,
      args: {
        image?: string;
        isLivenessCreated?: boolean;
        assertionType?: `${AssertionType}`;
        customerApiLink?: string;
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
    createFace(_: unknown, args: { image: string; detection?: FaceDetectionProperties }): Promise<DetectFaceResponse> {
      return createFaceResolver(args.image, args.detection);
    },
  },
};

export default resolvers;
