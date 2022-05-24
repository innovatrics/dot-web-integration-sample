import resolvers from '.';
import { customerApiLink } from '../../test';

describe('#normalizedDocumentImage', () => {
  it('should get correct response object with front and back keys', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
      back: `${customerApiLink}/document/pages/back`,
    };

    const result = resolvers.Query.normalizedDocumentImages(null, { pages });

    return result.should.eventually.have.keys('front', 'back');
  });

  it('should get correct response when dimensions are provided', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
      back: `${customerApiLink}/document/pages/back`,
    };

    const result = resolvers.Query.normalizedDocumentImages(null, { pages, dimensions: { width: 800 } });

    return result.should.eventually.have.keys('front', 'back').and.have.property('front').and.not.empty;
  });

  it('should get correct response with front property that includes base64 string', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
    };

    const result = resolvers.Query.normalizedDocumentImages(null, { pages });

    return result.should.eventually.have.property('front').and.include('data:image/png;base64,');
  });

  it('should get correct response with empty back property', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
    };

    const result = resolvers.Query.normalizedDocumentImages(null, { pages });

    return result.should.eventually.not.have.property('back');
  });

  it('should get correct response for front image with empty object input', async () => {
    const pages = {};
    const result = resolvers.Query.normalizedDocumentImages(null, { pages });

    return result.should.eventually.not.have.property('front');
  });

  it('should get correct response for back image with empty object input', async () => {
    const pages = {};
    const result = resolvers.Query.normalizedDocumentImages(null, { pages });

    return result.should.eventually.not.have.property('back');
  });
});
