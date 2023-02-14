import { customerApiLink, customerApiLinkError, customerLinks } from '../../test';
import { AssertionType } from '../../types/graphqlTypes';

import resolvers from '.';

describe('#createCustomerLiveness', () => {
  it('should get correct response when only image is present', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, { image: 'image.jpg' });
    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, { image: 'image.jpg', customerApiLink });
    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when liveness is not created ', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      image: 'image.jpg',
      customerApiLink,
      isLivenessCreated: false,
    });

    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when liveness is created ', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      image: 'image.jpg',
      customerApiLink,
      isLivenessCreated: true,
    });

    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response with assertion type ', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      image: 'image.jpg',
      customerApiLink,
      assertionType: AssertionType.EYE_GAZE_BOTTOM_RIGHT,
      isLivenessCreated: true,
    });

    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response with assertion type is NONE', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      image: 'image.jpg',
      customerApiLink,
      assertionType: AssertionType.NONE,
      isLivenessCreated: true,
    });

    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      image: 'image.jpg',
      customerApiLink: customerApiLinkError,
    });

    await expect(result).rejects.toThrow();
  });

  it('should get correct response when selfieLink is provided', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      customerApiLink,
      isLivenessCreated: true,
      selfieLink: `${customerApiLink}/liveness/selfies`,
    });

    const expectedResult = { ...customerLinks, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw Error when image and selfieLink are not provided', async () => {
    const result = resolvers.Mutation.createCustomerLiveness(null, {
      customerApiLink,
      isLivenessCreated: true,
    });

    await expect(result).rejects.toThrow('One of "image" or "selfieLink" argument must be provided.');
  });
});
