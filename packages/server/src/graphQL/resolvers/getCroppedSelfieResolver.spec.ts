import { faceApiLink } from '../../test';

import resolvers from '.';

describe('#croppedSelfie', () => {
  it('should get correct response object', async () => {
    const result = await resolvers.Query.croppedSelfie(null, { faceApiLink });

    expect(result).toHaveProperty('selfie');
    expect(result.selfie).toMatch(/data:image\/png;base64,/);
  });

  it('should get correct response object when dimensions are provided', async () => {
    const result = await resolvers.Query.croppedSelfie(null, { faceApiLink, dimensions: { width: 150 } });

    expect(result).toHaveProperty('selfie');
    expect(result.selfie).toMatch(/data:image\/png;base64,/);
  });
});
