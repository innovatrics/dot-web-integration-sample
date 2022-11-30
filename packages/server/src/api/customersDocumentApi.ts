import {
  CreateDocumentPageRestRequest,
  CreateCustomerDocumentRestRequest,
  ImageDimensionsRestRequest,
} from '../types/restRequestTypes';
import {
  CreateDocumentPageRestResponse,
  InspectDocumentRestResponse,
  CreateDocumentRestResponse,
  NormalizedDocumentImagesRestResponse,
  CroppedImageRestResponse,
} from '../types/restResponseTypes';
import { serverConnection } from './rest/serverConnection';

export const createDocumentPageApi = async (
  customerApiLink: string,
  request: CreateDocumentPageRestRequest,
): Promise<CreateDocumentPageRestResponse> => {
  const apiPath = `${customerApiLink}/document/pages`;
  const response = await serverConnection.put<CreateDocumentPageRestResponse>(apiPath, request);

  return response.data;
};

export const createDocumentApi = async (
  customerApiLink: string,
  request: CreateCustomerDocumentRestRequest,
): Promise<CreateDocumentRestResponse> => {
  const apiPath = `${customerApiLink}/document`;
  const response = await serverConnection.put<CreateDocumentRestResponse>(apiPath, request);

  return response.data;
};

export const inspectDocumentApi = async (customerApiLink: string): Promise<InspectDocumentRestResponse> => {
  const apiPath = `${customerApiLink}/document/inspect`;
  const response = await serverConnection.post<InspectDocumentRestResponse>(apiPath);

  return response.data;
};

export const getNormalizedImage = async (
  pageApiLink: string,
  dimensions?: ImageDimensionsRestRequest,
): Promise<NormalizedDocumentImagesRestResponse> => {
  const response = await serverConnection.get<NormalizedDocumentImagesRestResponse>(pageApiLink, {
    params: { ...dimensions },
  });

  return response.data;
};

export const getCroppedImage = async (
  pageApiLink: string,
  dimensions?: ImageDimensionsRestRequest,
): Promise<CroppedImageRestResponse> => {
  const response = await serverConnection.get<CroppedImageRestResponse>(pageApiLink, {
    params: { ...dimensions },
  });

  return response.data;
};
