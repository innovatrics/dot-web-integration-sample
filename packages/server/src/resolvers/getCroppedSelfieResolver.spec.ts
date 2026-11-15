import { customerId } from '../test/index.ts';

import { getCroppedSelfieResolver } from './getCroppedSelfieResolver.ts';

describe('#croppedSelfie', () => {
  it('should get correct response object', async () => {
    const result = await getCroppedSelfieResolver(customerId);

    expect(result).toHaveProperty('selfie');
    expect(result.selfie).toMatch(/data:image\/png;base64,/);
  });

  it('should get correct response object when dimensions are provided', async () => {
    const result = await getCroppedSelfieResolver(customerId, { width: 150 });

    expect(result).toHaveProperty('selfie');
    expect(result.selfie).toMatch(/data:image\/png;base64,/);
  });
});
