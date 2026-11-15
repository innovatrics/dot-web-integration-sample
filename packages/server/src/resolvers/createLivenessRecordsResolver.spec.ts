import createMagnifeyeLivenessResponse from '../api/mocks/data/createMagnifeyeLivenessResponse.json';
import { customerApiLinkError, customerId } from '../test/index.ts';

import { createLivenessRecordsResolver } from './createLivenessRecordsResolver.ts';

describe('#createMagnifeyeLiveness', () => {
  it('should get correct response when magnifeye message is present', async () => {
    const result = createLivenessRecordsResolver('magnifeyeMessage', customerId);
    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when liveness is not created', async () => {
    const result = createLivenessRecordsResolver('magnifeyeMessage', customerId, false);

    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when liveness is created', async () => {
    const result = createLivenessRecordsResolver('magnifeyeMessage', customerId, true);

    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should get correct response when customerId is present', async () => {
    const result = createLivenessRecordsResolver('magnifeyeMessage', customerId);

    const expectedResult = { ...createMagnifeyeLivenessResponse, errorCode: undefined };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = createLivenessRecordsResolver('magnifeyeMessage', customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
