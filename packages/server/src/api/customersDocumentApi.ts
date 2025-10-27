import type {
  CreateCustomerDocumentRestRequest,
  CreateDocumentPageRestRequest,
  ImageDimensionsRestRequest,
} from '../types/restRequestTypes.js';
import type { CroppedImageRestResponse, NormalizedDocumentImagesRestResponse } from '../types/restResponseTypes.js';
import type {
  CreateDocumentPageResponse,
  CreateDocumentResponse,
  DocumentInspectResponse,
} from '@innovatrics/dis-client-sdk';

import { disClient } from './rest/serverConnection.js';
import { getLastURLSegment } from './utils/getLastURLSegment.js';
import { convertBase64ToByteArray } from './utils/index.js';

export const createDocumentPageOctetStreamApi = async (
  customerApiLink: string,
  content: string,
): Promise<CreateDocumentPageResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const messageByteArray = convertBase64ToByteArray(content);
  const messageBuffer = Buffer.from(messageByteArray);

  const response = await disClient.api.createDocumentPage2(customerId, messageBuffer);

  return response.data;
};

export const createDocumentPageApi = async (
  customerApiLink: string,
  request: CreateDocumentPageRestRequest,
): Promise<CreateDocumentPageResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createDocumentPage(customerId, request);

  return response.data;
};

export const createDocumentApi = async (
  customerApiLink: string,
  request: CreateCustomerDocumentRestRequest,
): Promise<CreateDocumentResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createDocument(customerId, request);

  return response.data;
};

export const inspectDocumentApi = async (customerApiLink: string): Promise<DocumentInspectResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.documentInspect(customerId);

  return response.data;
};

export const getNormalizedImage = async (
  pageApiLink: string,
  dimensions?: ImageDimensionsRestRequest,
): Promise<NormalizedDocumentImagesRestResponse> => {
  const response = await disClient.request<NormalizedDocumentImagesRestResponse>({
    method: 'GET',
    path: pageApiLink,
    secure: true,
    query: { ...dimensions },
  });

  return response.data;
};

export const getCroppedImage = async (
  pageApiLink: string,
  dimensions?: ImageDimensionsRestRequest,
): Promise<CroppedImageRestResponse> => {
  const response = await disClient.request<CroppedImageRestResponse>({
    method: 'GET',
    path: pageApiLink,
    secure: true,
    query: { ...dimensions },
  });

  return response.data;
};
