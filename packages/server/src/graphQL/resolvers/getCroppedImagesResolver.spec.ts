import resolvers from '.';
import { customerApiLink } from '../../test';
import { CroppedImageLinks } from '../../types/graphqlTypes';

describe('#croppedImages', () => {
  it('should get correct response object', async () => {
    const imageLinks: CroppedImageLinks = {
      signature: { link: `${customerApiLink}/document/signature` },
      portrait: { link: `${customerApiLink}/document/portrait` },
    };

    const result = await resolvers.Query.croppedImages(null, { imageLinks });

    result.should.have.property('portrait').and.include('data:image/png;base64,');
    result.should.have.property('signature').and.include('data:image/png;base64,');
    result.should.not.have.property('fingerprint');
    result.should.not.have.property('ghostPortrait');
  });

  it('should get correct response object when dimensions are provided', async () => {
    const imageLinks: CroppedImageLinks = {
      signature: { link: `${customerApiLink}/document/signature`, dimensions: { width: 250 } },
      portrait: { link: `${customerApiLink}/document/portrait`, dimensions: { height: 250 } },
    };

    const result = await resolvers.Query.croppedImages(null, { imageLinks });

    result.should.have.property('portrait').and.include('data:image/png;base64,');
    result.should.have.property('signature').and.include('data:image/png;base64,');
    result.should.not.have.property('fingerprint');
    result.should.not.have.property('ghostPortrait');
  });
});
