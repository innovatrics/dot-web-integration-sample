import createCustomerSelfieResponse from '../../api/mocks/data/createSelfieResponse.json';
import { createLinks, customerApiLink, customerApiLinkError } from '../../test';

import resolvers from '.';

describe('#createSelfie', () => {
  it('should get correct response when customer is not created', async () => {
    const result = resolvers.Mutation.createSelfie(null, { image: 'image.jpg' });

    await expect(result).resolves.toEqual({ ...createCustomerSelfieResponse, ...createLinks('/selfie') });
  });

  it('should get correct response when customer is created', async () => {
    const result = resolvers.Mutation.createSelfie(null, {
      image: 'image.jpg',
      customerApiLink,
    });

    await expect(result).resolves.toEqual({ ...createCustomerSelfieResponse, ...createLinks('/selfie') });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.createSelfie(null, {
      image: 'image.jpg',
      customerApiLink: customerApiLinkError,
    });

    await expect(result).rejects.toThrow();
  });

  it('should throw error when image and selfieLink are not provided', async () => {
    const result = resolvers.Mutation.createSelfie(null, {
      customerApiLink,
    });

    await expect(result).rejects.toThrow('One of "image" or "selfieLink" argument must be provided.');
  });

  it('should throw error when both image and selfieLink are provided', async () => {
    const result = resolvers.Mutation.createSelfie(null, {
      image: 'image.jpg',
      customerApiLink,
      selfieLink: `${customerApiLink}/liveness/records/456/selfie`,
    });

    await expect(result).rejects.toThrow('Only one of "image" or "selfieLink" arguments must be provided.');
  });
});
