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
});
