import { Router } from 'express';

import { ensureQueryParamsId, ensureString } from '../api/utils/index.ts';
import {
  createDocumentPageWithImageResolver,
  createDocumentWithContentResolver,
} from '../resolvers/createDocumentPageResolver.ts';
import { createFaceResolver } from '../resolvers/createFaceResolver.ts';
import { createLivenessRecordsChallengeResolver } from '../resolvers/createLivenessRecordsChallengeResolver.ts';
import { createLivenessRecordsResolver } from '../resolvers/createLivenessRecordsResolver.ts';
import { createSelfieResolver } from '../resolvers/createSelfieResolver.ts';
import { deleteCustomerResolver } from '../resolvers/deleteCustomerResolver.ts';
import { evaluateCustomerLivenessResolver } from '../resolvers/evaluateCustomerLivenessResolver.ts';
import { evaluateTrustFactorsResolver } from '../resolvers/evaluateTrustFactors.ts';
import { getAppInfoResolver } from '../resolvers/getAppInfoResolver.ts';
import { getCroppedImagesResolver } from '../resolvers/getCroppedImagesResolver.ts';
import { getCroppedSelfieResolver } from '../resolvers/getCroppedSelfieResolver.ts';
import { getCustomerResolver } from '../resolvers/getCustomerResolver.ts';
import { getFaceQualityResolver } from '../resolvers/getFaceQualityResolver.ts';
import { getMetadataResolver } from '../resolvers/getMetadataResolver.ts';
import { inspectCustomerResolver } from '../resolvers/inspectCustomerResolver.ts';
import { inspectDocumentResolver } from '../resolvers/inspectDocumentResolver.ts';
import { normalizedDocumentImagesResolver } from '../resolvers/normalizedDocumentImagesResolver.ts';
import { asyncHandler } from './asyncHandler.ts';
import {
  cropBody,
  croppedImagesBody,
  documentPageContentBody,
  documentPageImageBody,
  faceBody,
  livenessChallengeBody,
  livenessEvaluationBody,
  livenessRecordsBody,
  normalizedImagesBody,
  parseBody,
  selfieBody,
  trustEvaluationBody,
} from './requestBodies.ts';

const disRouter = Router();

disRouter.get(
  '/metadata',
  asyncHandler(async (_req, res) => {
    const response = await getMetadataResolver();

    res.json(response);
  }),
);

disRouter.get(
  '/info',
  asyncHandler(async (_req, res) => {
    const response = await getAppInfoResolver();

    res.json(response);
  }),
);

disRouter.get(
  '/customers/:id',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const response = await getCustomerResolver(customerId);

    res.status(200).send(response);
  }),
);

disRouter.delete(
  '/customers/:id',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');

    await deleteCustomerResolver(customerId);

    res.status(204).send();
  }),
);

disRouter.get(
  '/customers/:id/inspect',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const response = await inspectCustomerResolver(customerId);

    res.json(response);
  }),
);

disRouter.get(
  '/customers/:id/document/inspect',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const response = await inspectDocumentResolver(customerId);

    res.json(response);
  }),
);

disRouter.get(
  '/faces/:id/quality',
  asyncHandler(async (req, res) => {
    const faceApiLink = ensureString(req.query.faceApiLink, 'faceApiLink');
    const response = await getFaceQualityResolver(faceApiLink);

    res.json(response);
  }),
);

disRouter.post(
  '/documents/normalized-images',
  asyncHandler(async (req, res) => {
    const { dimensions, pages } = parseBody(normalizedImagesBody, req.body);
    const response = await normalizedDocumentImagesResolver(pages, dimensions);

    res.json(response);
  }),
);

disRouter.post(
  '/documents/cropped-images',
  asyncHandler(async (req, res) => {
    const { imageLinks } = parseBody(croppedImagesBody, req.body);
    const response = await getCroppedImagesResolver(imageLinks);

    res.json(response);
  }),
);

disRouter.post(
  '/document/page/content',
  asyncHandler(async (req, res) => {
    const payload = parseBody(documentPageContentBody, req.body);
    const response = await createDocumentWithContentResolver(payload);

    res.json(response);
  }),
);

disRouter.post(
  '/document/page/image',
  asyncHandler(async (req, res) => {
    const payload = parseBody(documentPageImageBody, req.body);
    const response = await createDocumentPageWithImageResolver(payload);

    res.json(response);
  }),
);

disRouter.post(
  '/customers/:id/selfie',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const { image, selfieLink } = parseBody(selfieBody, req.body);
    const response = await createSelfieResolver(customerId, image, selfieLink);

    res.json(response);
  }),
);

disRouter.post(
  '/customers/:id/liveness-records',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const { content, isLivenessCreated } = parseBody(livenessRecordsBody, req.body);
    const response = await createLivenessRecordsResolver(content, customerId, isLivenessCreated);

    res.json(response);
  }),
);

disRouter.post(
  '/customers/:id/liveness/records/challenge',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const { isLivenessCreated, type } = parseBody(livenessChallengeBody, req.body);
    const response = await createLivenessRecordsChallengeResolver(type, customerId, isLivenessCreated);

    res.json(response);
  }),
);

disRouter.post(
  '/customers/:id/liveness/evaluation',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const { type } = parseBody(livenessEvaluationBody, req.body);
    const response = await evaluateCustomerLivenessResolver(type, customerId);

    res.json(response);
  }),
);

disRouter.post(
  '/customers/:id/trust-evaluation/evaluate',
  asyncHandler(async (req, res) => {
    const customerId = ensureQueryParamsId(req.params, 'customer');
    const { livenessType } = parseBody(trustEvaluationBody, req.body);
    const response = await evaluateTrustFactorsResolver(customerId, livenessType);

    res.json(response);
  }),
);

disRouter.post(
  '/face',
  asyncHandler(async (req, res) => {
    const payload = parseBody(faceBody, req.body);
    const response = await createFaceResolver(payload);

    res.json(response);
  }),
);

disRouter.post(
  '/faces/:id/crop',
  asyncHandler(async (req, res) => {
    const faceId = ensureQueryParamsId(req.params, 'face');
    const { dimensions } = parseBody(cropBody, req.body);
    const response = await getCroppedSelfieResolver(faceId, dimensions);

    res.json(response);
  }),
);

export default disRouter;
