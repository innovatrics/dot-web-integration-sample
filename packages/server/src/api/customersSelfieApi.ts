import type { CreateSelfieRequest } from '@innovatrics/dis-client-sdk';
import type { ImageDimensions } from '../types/index.ts';

import { disClient } from './connection/serverConnection.ts';
import { getLastURLSegment } from './utils/index.ts';

export const createCustomerSelfieApi = async (customerId: string, payload: CreateSelfieRequest) => {
  const response = await disClient.api.createSelfie(customerId, payload);

  return response.data;
};

export const createCustomerSelfie2Api = async (customerId: string, payload: Buffer<ArrayBufferLike>) => {
  const response = await disClient.api.createSelfie2(customerId, payload);

  return response.data;
};

export const getCroppedSelfieApi = async (faceId: string, dimensions?: ImageDimensions) => {
  const response = await disClient.api.doCrop(faceId, {
    ...dimensions,
  });

  return response.data;
};

export const getSelfieImageApi = async (customerId: string) => {
  const response = await disClient.api.getSelfieImage(customerId);

  return response.data;
};

export const createLivenessSelfieApi = async (customerApiLink: string) => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createLivenessSelfie(customerId, {
    assertion: 'NONE',
    selfieOrigin: {
      link: customerApiLink,
    },
  });

  return response.data;
};
