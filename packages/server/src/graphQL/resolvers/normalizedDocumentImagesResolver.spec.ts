import { customerApiLink } from '../../test';

import resolvers from '.';

describe('#normalizedDocumentImage', () => {
  it('should get correct response object with front and back keys', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
      back: `${customerApiLink}/document/pages/back`,
    };

    const result = await resolvers.Query.normalizedDocumentImages(null, { pages });

    expect(result).toHaveProperty('front');
    expect(result).toHaveProperty('back');
  });

  it('should get correct response when dimensions are provided', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
      back: `${customerApiLink}/document/pages/back`,
    };

    const result = await resolvers.Query.normalizedDocumentImages(null, { pages, dimensions: { width: 800 } });

    expect(result).toHaveProperty('front');
    expect(result).toHaveProperty('back');
    expect(result.front).toBeDefined();
  });

  it('should get correct response with front property that includes base64 string', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
    };

    const result = await resolvers.Query.normalizedDocumentImages(null, { pages });

    expect(result).toHaveProperty('front');
    expect(result.front).toMatch(/data:image\/png;base64,/);
  });

  it('should get correct response with empty back property', async () => {
    const pages = {
      front: `${customerApiLink}/document/pages/front`,
    };

    const result = await resolvers.Query.normalizedDocumentImages(null, { pages });

    expect(result).not.toHaveProperty('back');
  });

  it('should get correct response for front image with empty object input', async () => {
    const pages = {};
    const result = await resolvers.Query.normalizedDocumentImages(null, { pages });

    expect(result).not.toHaveProperty('front');
  });

  it('should get correct response for back image with empty object input', async () => {
    const pages = {};
    const result = await resolvers.Query.normalizedDocumentImages(null, { pages });

    expect(result).not.toHaveProperty('back');
  });
});
