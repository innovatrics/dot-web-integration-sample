import createCustomerSelfieResponse from '../api/mocks/data/createSelfieResponse.json';
import { createLinks, customerApiLink, customerApiLinkError, customerId } from '../test/index.ts';

import { createSelfieResolver } from './createSelfieResolver.ts';

describe('#createSelfie', () => {
  it('should get correct response when customer is created', async () => {
    const result = createSelfieResolver(customerId, 'image.jpg');

    await expect(result).resolves.toEqual({ ...createCustomerSelfieResponse, ...createLinks('/selfie') });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = createSelfieResolver(customerApiLinkError, 'image.jpg');

    await expect(result).rejects.toThrow();
  });

  it('should throw error when image and selfieLink are not provided', async () => {
    const result = createSelfieResolver(customerId);

    await expect(result).rejects.toThrow('One of "image" or "selfieLink" argument must be provided.');
  });

  it('should throw error when both image and selfieLink are provided', async () => {
    const result = createSelfieResolver('image.jpg', customerApiLink, `${customerApiLink}/liveness/records/456/selfie`);

    await expect(result).rejects.toThrow('Only one of "image" or "selfieLink" arguments must be provided.');
  });
});
