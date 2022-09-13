import resolvers from '.';
import createCustomerSelfieResponse from '../../api/mocks/data/createSelfieResponse.json';
import { createLinks, customerApiLink, customerApiLinkError } from '../../test';

describe('#createSelfie', () => {
  it('should get correct response when customer is not created', async () => {
    const result = resolvers.Mutation.createSelfie(null, { image: 'image.jpg' });

    return result.should.eventually.be.deep.equal({ ...createCustomerSelfieResponse, ...createLinks('/selfie') });
  });

  it('should get correct response when customer is created', async () => {
    const result = resolvers.Mutation.createSelfie(null, {
      image: 'image.jpg',
      customerApiLink,
    });

    return result.should.eventually.be.deep.equal({ ...createCustomerSelfieResponse, ...createLinks('/selfie') });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.createSelfie(null, {
      image: 'image.jpg',
      customerApiLink: customerApiLinkError,
    });

    return result.should.eventually.be.rejectedWith('Some error.');
  });
});
