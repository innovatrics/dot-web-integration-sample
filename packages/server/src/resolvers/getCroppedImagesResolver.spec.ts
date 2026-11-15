import { customerApiLink } from '../test/index.ts';
import type { CroppedImageLinks } from '../types/index.ts';

import { getCroppedImagesResolver } from './getCroppedImagesResolver.ts';

describe('#croppedImages', () => {
  it('should get correct response object', async () => {
    const imageLinks: CroppedImageLinks = {
      portrait: { link: `${customerApiLink}/document/portrait` },
      signature: { link: `${customerApiLink}/document/signature` },
    };

    const result = await getCroppedImagesResolver(imageLinks);

    expect(result).toHaveProperty('portrait');
    expect(result.portrait).toMatch(/data:image\/png;base64,/);
    expect(result).toHaveProperty('signature');
    expect(result.signature).toMatch(/data:image\/png;base64,/);
    expect(result).not.toHaveProperty('fingerprint');
    expect(result).not.toHaveProperty('ghostPortrait');
  });

  it('should get correct response object when dimensions are provided', async () => {
    const imageLinks: CroppedImageLinks = {
      portrait: { dimensions: { height: 250 }, link: `${customerApiLink}/document/portrait` },
      signature: { dimensions: { width: 250 }, link: `${customerApiLink}/document/signature` },
    };

    const result = await getCroppedImagesResolver(imageLinks);

    expect(result).toHaveProperty('portrait');
    expect(result.portrait).toMatch(/data:image\/png;base64,/);
    expect(result).toHaveProperty('signature');
    expect(result.signature).toMatch(/data:image\/png;base64,/);
    expect(result).not.toHaveProperty('fingerprint');
    expect(result).not.toHaveProperty('ghostPortrait');
  });
});
