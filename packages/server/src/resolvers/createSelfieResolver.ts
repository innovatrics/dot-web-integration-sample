import { createCustomerSelfieApi } from '../api/customersSelfieApi.ts';
import { createImage } from '../api/utils/index.ts';
import { ProcessingError } from '../errors/index.ts';
import type { DetectSelfieRestRequest } from '../types/index.ts';

export const createSelfieResolver = async (customerId: string, image?: string, selfieLink?: string) => {
  const request: DetectSelfieRestRequest = {};

  if (image && selfieLink) {
    throw new ProcessingError({
      message: 'Only one of "image" or "selfieLink" arguments must be provided',
      status: 400,
      operation: 'createSelfieResolver:validateInput',
    });
  }

  if (!image && !selfieLink) {
    throw new ProcessingError({
      message: 'One of "image" or "selfieLink" argument must be provided',
      status: 400,
      operation: 'createSelfieResolver:validateInput',
    });
  }

  if (image) {
    request.image = createImage(image);
  }

  if (selfieLink) {
    request.selfieOrigin = { link: selfieLink };
  }

  const response = await createCustomerSelfieApi(customerId, request);
  const { ...rest } = response;

  return {
    ...rest,
  };
};
