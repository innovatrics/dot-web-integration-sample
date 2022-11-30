import resolvers from '.';

describe('#appInfo', () => {
  it('should get correct response when API is live and ready', async () => {
    const result = resolvers.Query.appInfo(null);

    const expectedResponse = {
      disVersion: '5.36.0-SNAPSHOT',
      samVersion: '1.28.10',
      iFaceVersion: '4.15.0',
    };

    await expect(result).resolves.toEqual(expectedResponse);
  });
});
