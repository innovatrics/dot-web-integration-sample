import { getAppInfoResolver } from './getAppInfoResolver.ts';

describe('#appInfo', () => {
  it('should get correct response when API is live and ready', async () => {
    const result = getAppInfoResolver();

    const expectedResponse = {
      disVersion: '5.36.0-SNAPSHOT',
      iFaceVersion: '4.15.0',
      samVersion: '1.28.10',
    };

    await expect(result).resolves.toEqual(expectedResponse);
  });
});
