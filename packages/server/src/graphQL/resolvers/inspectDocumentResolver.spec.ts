import { expect } from 'vitest';

import inspectDocumentFeResponse from '../../api/mocks/data/inspectDocumentFeResponse.json' with { type: 'json' };
import { customerApiLink, customerApiLinkError } from '../../test/index.js';

import resolvers from './index.js';

describe('#inspectDocument', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Query.inspectDocument(null, { customerApiLink });

    await expect(result).resolves.toEqual(inspectDocumentFeResponse);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.inspectDocument(null, { customerApiLink: customerApiLinkError });

    await expect(result).rejects.toThrow();
  });
});
