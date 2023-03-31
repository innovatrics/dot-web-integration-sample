import type { AxiosInstance } from 'axios';

import MockAdapter from 'axios-mock-adapter';

import env from '../../dotenv';

import createCustomerLivenessResponse from './data/createCustomerLivenessResponse.json';
import createCustomerLivenessSelfieResponse from './data/createCustomerLivenessSelfieResponse.json';
import createCustomerResponse from './data/createCustomerResponse.json';
import createDocumentPageResponse from './data/createDocumentPageResponse.json';
import createDocumentResponse from './data/createDocumentResponse.json';
import createfaceResponse from './data/createFaceResponse.json';
import createMagnifeyeLivenessResponse from './data/createMagnifeyeLivenessResponse.json';
import createSelfieResponse from './data/createSelfieResponse.json';
import croppedSelfieResponse from './data/croppedSelfieResponse.json';
import evaluateCustomerLivenessResponse from './data/evaluateCustomerLivenessResponse.json';
import getAppInfoResponse from './data/getAppInfoResponse.json';
import getCroppedImagePortraitResponse from './data/getCroppedImagePortraitResponse.json';
import getCroppedImageSignaturetResponse from './data/getCroppedImageSignatureResponse.json';
import getCustomerResponse from './data/getCustomerResponse.json';
import getFaceQualityResponse from './data/getFaceQualityResponse.json';
import getMetadataResponse from './data/getMetadataResponse.json';
import inspectCustomerResponse from './data/inspectCustomerResponse.json';
import inspectDocumentResponse from './data/inspectDocumentResponse.json';
import normalizedDocumentImageBackResponse from './data/normalizedDocumentImageBackResponse.json';
import normalizedDocumentImageFrontResponse from './data/normalizedDocumentImageFrontResponse.json';

const HTTP_OK = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_NO_CONTENT = 204;

function createCustomer() {
  return [HTTP_OK, createCustomerResponse];
}

function getCustomer() {
  return [HTTP_OK, getCustomerResponse];
}

function createDocument() {
  return [HTTP_OK, createDocumentResponse];
}

function createDocumentPage() {
  return [HTTP_OK, createDocumentPageResponse];
}

function createSelfie() {
  return [HTTP_OK, createSelfieResponse];
}

function getCroppedSelfie() {
  return [HTTP_OK, croppedSelfieResponse];
}

function inspectDocument() {
  return [HTTP_OK, inspectDocumentResponse];
}

function inspectCustomer() {
  return [HTTP_OK, inspectCustomerResponse];
}

function createCustomerLiveness() {
  return [HTTP_OK, createCustomerLivenessResponse];
}

function createMagnifeyeLivenessSelfieApi() {
  return [HTTP_OK, createMagnifeyeLivenessResponse];
}

function createCustomerLivenessSelfieApi() {
  return [HTTP_OK, createCustomerLivenessSelfieResponse];
}

function createFace() {
  return [HTTP_OK, createfaceResponse];
}

function getFaceQuality() {
  return [HTTP_OK, getFaceQualityResponse];
}

function evaluateCustomerLiveness() {
  return [HTTP_OK, evaluateCustomerLivenessResponse];
}

function getNormalizedDocumentImageFront() {
  return [HTTP_OK, normalizedDocumentImageFrontResponse];
}

function getNormalizedDocumentImageBack() {
  return [HTTP_OK, normalizedDocumentImageBackResponse];
}

function getCroppedImagePortrait() {
  return [HTTP_OK, getCroppedImagePortraitResponse];
}

function getCroppedImageSignature() {
  return [HTTP_OK, getCroppedImageSignaturetResponse];
}

function getMetadata() {
  return [HTTP_OK, getMetadataResponse];
}

function storeCustomer() {
  return [HTTP_NO_CONTENT];
}

function appInfo() {
  return [HTTP_OK, getAppInfoResponse];
}

function error() {
  return [
    HTTP_INTERNAL_SERVER_ERROR,
    {
      errorCode: 'NOT_FOUND',
      errorMessage: 'Some error.',
    },
  ];
}

export const isMockAdapterEnabled = (): boolean => {
  return env.MOCKS_ENABLED ? env.MOCKS_ENABLED === 'true' : false;
};

export const initServerMocks = (axios: AxiosInstance): MockAdapter => {
  const mock = new MockAdapter(axios);
  const customerApiLink = '/api/v1/customers/123';
  const faceApiLink = '/api/v1/faces/123';

  const createCustomerUrl = '/api/v1/customers';

  mock.onPost(createCustomerUrl).reply(createCustomer);

  mock.onGet(customerApiLink).reply(getCustomer);

  mock.onDelete(customerApiLink).reply(HTTP_NO_CONTENT);

  const createDocumentPageUrl = `${customerApiLink}/document/pages`;

  mock.onPut(createDocumentPageUrl).reply(createDocumentPage);

  const inspectDocumentUrl = `${customerApiLink}/document/inspect`;

  mock.onPost(inspectDocumentUrl).reply(inspectDocument);

  const createDocumentUrl = `${customerApiLink}/document`;

  mock.onPut(createDocumentUrl).reply(createDocument);

  const createSelfieUrl = `${customerApiLink}/selfie`;

  mock.onPut(createSelfieUrl).reply(createSelfie);

  const getCroppedSelfieUrl = `${faceApiLink}/crop`;

  mock.onGet(getCroppedSelfieUrl).reply(getCroppedSelfie);

  const inspectCustomerUrl = `${customerApiLink}/inspect`;

  mock.onPost(inspectCustomerUrl).reply(inspectCustomer);

  const evaluateCustomerLivenessUrl = `${customerApiLink}/liveness/evaluation`;

  mock.onPost(evaluateCustomerLivenessUrl).reply(evaluateCustomerLiveness);

  const createCustomerLivenessSelfieUrl = `${customerApiLink}/liveness/selfies`;

  mock.onPost(createCustomerLivenessSelfieUrl).reply(createCustomerLivenessSelfieApi);

  const createMagnifeyeLivenessSelfieLink = `${customerApiLink}/liveness/records`;

  mock.onPost(createMagnifeyeLivenessSelfieLink).reply(createMagnifeyeLivenessSelfieApi);

  const createCustomerLivenessUrl = `${customerApiLink}/liveness`;

  mock.onPut(createCustomerLivenessUrl).reply(createCustomerLiveness);

  const customerApiLinkError = new RegExp(/\/api\/v1\/customers\/123error.*/);

  mock.onAny(customerApiLinkError).reply(error);

  const createFaceUrl = '/api/v1/faces';

  mock.onPost(createFaceUrl).reply(createFace);

  const getFaceQualityUrl = `${faceApiLink}/quality`;

  mock.onGet(getFaceQualityUrl).reply(getFaceQuality);

  const normalizedDocumentImageFrontUrl = `${customerApiLink}/document/pages/front`;

  mock.onGet(normalizedDocumentImageFrontUrl).reply(getNormalizedDocumentImageFront);

  const normalizedDocumentImageBackUrl = `${customerApiLink}/document/pages/back`;

  mock.onGet(normalizedDocumentImageBackUrl).reply(getNormalizedDocumentImageBack);

  const croppedImagePortraitUrl = `${customerApiLink}/document/portrait`;

  mock.onGet(croppedImagePortraitUrl).reply(getCroppedImagePortrait);

  const croppedImageSignatureUrl = `${customerApiLink}/document/signature`;

  mock.onGet(croppedImageSignatureUrl).reply(getCroppedImageSignature);

  const faceApiLinkError = new RegExp(/\/api\/v1\/faces\/123error.*/);

  mock.onAny(faceApiLinkError).reply(error);

  const metadataApiLink = '/api/v1/metadata';

  mock.onGet(metadataApiLink).reply(getMetadata);

  const storeCustomerUrl = `${customerApiLink}/store`;

  mock.onPost(storeCustomerUrl).reply(storeCustomer);

  const appInfoLink = '/api/v1/info';

  mock.onGet(appInfoLink).reply(appInfo);

  mock.onAny().reply(() => [500, { errorMessage: 'Requested API URL was not mocked' }]);

  return mock;
};
