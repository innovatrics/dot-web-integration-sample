import resolvers from '.';
import { faceApiLink } from '../../test';

describe('#croppedSelfie', () => {
  it('should get correct response object', async () => {
    const result = await resolvers.Query.croppedSelfie(null, { faceApiLink });

    return result.should.have.property('selfie').and.include('data:image/png;base64,');
  });

  it('should get correct response object when dimensions are provided', async () => {
    const result = await resolvers.Query.croppedSelfie(null, { faceApiLink, dimensions: { width: 150 } });

    return result.should.have.property('selfie').and.include('data:image/png;base64,');
  });
});
