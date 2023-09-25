import createMagnifeyeLivenessResponse from '../../api/mocks/data/createMagnifeyeLivenessResponse.json';
import { customerApiLink, customerApiLinkError } from '../../test';

import resolvers from '.';

describe('#createMagnifeyeLiveness', () => {
  it('should get correct response when magnifeye message is present', async () => {
    const result = resolvers.Mutation.createLivenessRecords(null, { content: 'magnifeyeMessage' });
    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when liveness is not created', async () => {
    const result = resolvers.Mutation.createLivenessRecords(null, {
      content: 'magnifeyeMessage',
      isLivenessCreated: false,
    });

    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when liveness is created', async () => {
    const result = resolvers.Mutation.createLivenessRecords(null, {
      content: 'magnifeyeMessage',
      isLivenessCreated: true,
    });

    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Mutation.createLivenessRecords(null, {
      content: 'magnifeyeMessage',
      customerApiLink,
    });

    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.createLivenessRecords(null, {
      content: 'magnifeyeMessage',
      customerApiLink: customerApiLinkError,
    });

    await expect(result).rejects.toThrow();
  });
});
