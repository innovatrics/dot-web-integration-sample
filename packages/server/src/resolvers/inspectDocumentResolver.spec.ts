import inspectDocumentResponse from '../api/mocks/data/inspectDocumentResponse.json';
import { customerApiLinkError, customerId, customerLinks } from '../test/index.ts';

import { inspectDocumentResolver } from './inspectDocumentResolver.ts';

describe('#inspectDocument', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = inspectDocumentResolver(customerId);

    await expect(result).resolves.toEqual({ ...inspectDocumentResponse, ...customerLinks });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = inspectDocumentResolver(customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
