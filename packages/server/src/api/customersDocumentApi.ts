import type {
  CreateDocumentPageRequest,
  CreateDocumentPageResponse,
  CreateDocumentRequest,
  CreateDocumentResponse,
  DocumentInspectResponse,
} from '@innovatrics/dis-client-sdk';
import type { ImageDimensions, ImagesRestResponse } from '../types/index.ts';

import { disClient } from './connection/serverConnection.ts';
import { convertBase64ToByteArray, getLastURLSegment } from './utils/index.ts';

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
  request: CreateDocumentPageRequest,
): Promise<CreateDocumentPageResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createDocumentPage(customerId, request);

  return response.data;
};

export const createDocumentApi = async (
  customerApiLink: string,
  request: CreateDocumentRequest,
): Promise<CreateDocumentResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createDocument(customerId, request);

  return response.data;
};

export const inspectDocumentApi = async (customerId: string): Promise<DocumentInspectResponse> => {
  const response = await disClient.api.documentInspect(customerId);

  return response.data;
};

export const getNormalizedImage = async (
  pageApiLink: string,
  dimensions?: ImageDimensions,
): Promise<ImagesRestResponse> => {
  const response = await disClient.request<ImagesRestResponse>({
    method: 'GET',
    path: pageApiLink,
    query: { ...dimensions },
    secure: true,
  });

  return response.data;
};

export const getCroppedImage = async (
  pageApiLink: string,
  dimensions?: ImageDimensions,
): Promise<ImagesRestResponse> => {
  const response = await disClient.request<ImagesRestResponse>({
    method: 'GET',
    path: pageApiLink,
    query: { ...dimensions },
    secure: true,
  });

  return response.data;
};
