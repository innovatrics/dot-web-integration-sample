import type {
  ContactFormRequest,
  CreateDocumentPageResponse,
  CreateLivenessRecordsResponse,
  CroppedImageLinks,
  CroppedImagesResponse,
  CroppedSelfieResponse,
  CustomerDocumentPages,
  DetectFaceResponse,
  DetectSelfieResponse,
  EvaluateCustomerDeepfakeResponse,
  EvaluateCustomerLivenessResponse,
  EvaluateLivenessType,
  FaceQualityResponse,
  GetAppInfoResponse,
  GetCustomerResponse,
  GetMetadataResponse,
  ImageDimensions,
  InspectCustomerResponse,
  InspectDocumentResponse,
  LivenessType,
  MutationCreateDocumentPageWithContentArgs,
  MutationCreateDocumentPageWithImageArgs,
  MutationCreateFaceArgs,
} from '../../types/graphqlTypes.js';
import type {
  LivenessChallengeRequest,
  LivenessChallengeResponse,
  TrustEvaluationResponse,
} from '@innovatrics/dis-client-sdk';

import {
  createDocumentPageWithImageResolver,
  createDocumentWithContentResolver,
} from './createDocumentPageResolver.js';
import { createFaceResolver } from './createFaceResolver.js';
import { createLivenessRecordsChallengeResolver } from './createLivenessRecordsChallengeResolver.js';
import { createLivenessRecordsResolver } from './createLivenessRecordsResolver.js';
import { createSelfieResolver } from './createSelfieResolver.js';
import { deleteCustomerResolver } from './deleteCustomerResolver.js';
import { evaluateCustomerDeepfakeResolver } from './evaluateCustomerDeepfakeResolver.js';
import { evaluateCustomerLivenessResolver } from './evaluateCustomerLivenessResolver.js';
import { evaluateTrustFactorsResolver } from './evaluateTrustFactors.js';
import { getAppInfoResolver } from './getAppInfoResolver.js';
import { getCroppedImagesResolver } from './getCroppedImagesResolver.js';
import { getCroppedSelfieResolver } from './getCroppedSelfieResolver.js';
import { getCustomerResolver } from './getCustomerResolver.js';
import { getFaceQualityResolver } from './getFaceQualityResolver.js';
import { getMetadataResolver } from './getMetadataResolver.js';
import { inspectCustomerResolver } from './inspectCustomerResolver.js';
import { inspectDocumentResolver } from './inspectDocumentResolver.js';
import { normalizedDocumentImagesResolver } from './normalizedDocumentImagesResolver.js';
import { postContactFormResolver } from './postContactFormResolver.js';

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
    evaluateCustomerDeepfake(
      _: unknown,
      args: { customerApiLink: string; type: `${LivenessType}` },
    ): Promise<EvaluateCustomerDeepfakeResponse> {
      return evaluateCustomerDeepfakeResolver(args.type, args.customerApiLink);
    },
    metadata(_: unknown): Promise<GetMetadataResponse> {
      return getMetadataResolver();
    },
    appInfo(_: unknown): Promise<GetAppInfoResponse> {
      return getAppInfoResolver();
    },
    evaluateTrustFactors(
      _: unknown,
      args: { customerApiLink: string; livenessType: LivenessType },
    ): Promise<TrustEvaluationResponse> {
      return evaluateTrustFactorsResolver(args.customerApiLink, args.livenessType);
    },
  },
  Mutation: {
    deleteCustomer(_: unknown, args: { customerApiLink: string }): Promise<void> {
      return deleteCustomerResolver(args.customerApiLink);
    },
    createDocumentPageWithImage(
      _: unknown,
      args: MutationCreateDocumentPageWithImageArgs,
    ): Promise<CreateDocumentPageResponse> {
      return createDocumentPageWithImageResolver(args);
    },
    createDocumentPageWithContent(
      _: unknown,
      args: MutationCreateDocumentPageWithContentArgs,
    ): Promise<CreateDocumentPageResponse> {
      return createDocumentWithContentResolver(args);
    },
    createSelfie(
      _: unknown,
      args: { customerApiLink?: string; image?: string; selfieLink?: string },
    ): Promise<DetectSelfieResponse> {
      return createSelfieResolver(args.image, args.customerApiLink, args.selfieLink);
    },
    createLivenessRecords(
      _: unknown,
      args: {
        content: string;
        customerApiLink?: string;
        isLivenessCreated?: boolean;
      },
    ): Promise<CreateLivenessRecordsResponse> {
      return createLivenessRecordsResolver(args.content, args.customerApiLink, args.isLivenessCreated);
    },
    createLivenessRecordsChallenge(
      _: unknown,
      args: { customerApiLink?: string; isLivenessCreated?: boolean; livenessType: LivenessChallengeRequest['type'] },
    ): Promise<LivenessChallengeResponse> {
      return createLivenessRecordsChallengeResolver(args.livenessType, args.customerApiLink, args.isLivenessCreated);
    },
    createFace(_: unknown, args: MutationCreateFaceArgs): Promise<DetectFaceResponse> {
      return createFaceResolver(args);
    },
    postContactForm(_: unknown, args: { contactFormData: ContactFormRequest; recaptchaToken: string }): Promise<void> {
      return postContactFormResolver(args.contactFormData, args.recaptchaToken);
    },
  },
};

export default resolvers;
