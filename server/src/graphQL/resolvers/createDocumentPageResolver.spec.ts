import resolvers from '.';
import createDocumentPageResponse from '../../api/mocks/data/createDocumentPageResponse.json';
import { customerApiLink, customerLinks, customerApiLinkError } from '../../test';

describe('#createDocumentPage', () => {
  it('should get correct response when document is not created', async () => {
    const result = resolvers.Mutation.createDocumentPage(null, {
      image: 'image.jpg',
      isDocumentCreated: false,
      customerApiLink,
    });

    return result.should.eventually.be.deep.equal({ ...createDocumentPageResponse, ...customerLinks });
  });

  it('should get correct response when document is created', async () => {
    const result = resolvers.Mutation.createDocumentPage(null, {
      image: 'image.jpg',
      isDocumentCreated: true,
      customerApiLink,
    });

    return result.should.eventually.be.deep.equal({ ...createDocumentPageResponse, ...customerLinks });
  });

  it('should get correct response when advice is present', async () => {
    const documentAdvice = {
      classification: {
        countries: ['INO'],
        types: [],
        editions: [],
        machineReadableTravelDocuments: [],
      },
    };

    const result = resolvers.Mutation.createDocumentPage(null, {
      image: 'image.jpg',
      isDocumentCreated: false,
      customerApiLink,
      documentAdvice,
    });

    return result.should.eventually.be.deep.equal({ ...createDocumentPageResponse, ...customerLinks });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.createDocumentPage(null, {
      image: 'image.jpg',
      isDocumentCreated: true,
      customerApiLink: customerApiLinkError,
    });

    return result.should.eventually.be.rejectedWith('Some error.');
  });
});
