import type { CroppedImageLinks } from '../../types/graphqlTypes';

import { customerApiLink } from '../../test';

import resolvers from '.';

describe('#croppedImages', () => {
  it('should get correct response object', async () => {
    const imageLinks: CroppedImageLinks = {
      signature: { link: `${customerApiLink}/document/signature` },
      portrait: { link: `${customerApiLink}/document/portrait` },
    };

    const result = await resolvers.Query.croppedImages(null, { imageLinks });

    expect(result).toHaveProperty('portrait');
    expect(result.portrait).toMatch(/data:image\/png;base64,/);
    expect(result).toHaveProperty('signature');
    expect(result.signature).toMatch(/data:image\/png;base64,/);
    expect(result).not.toHaveProperty('fingerprint');
    expect(result).not.toHaveProperty('ghostPortrait');
  });

  it('should get correct response object when dimensions are provided', async () => {
    const imageLinks: CroppedImageLinks = {
      signature: { link: `${customerApiLink}/document/signature`, dimensions: { width: 250 } },
      portrait: { link: `${customerApiLink}/document/portrait`, dimensions: { height: 250 } },
    };

    const result = await resolvers.Query.croppedImages(null, { imageLinks });

    expect(result).toHaveProperty('portrait');
    expect(result.portrait).toMatch(/data:image\/png;base64,/);
    expect(result).toHaveProperty('signature');
    expect(result.signature).toMatch(/data:image\/png;base64,/);
    expect(result).not.toHaveProperty('fingerprint');
    expect(result).not.toHaveProperty('ghostPortrait');
  });
});
