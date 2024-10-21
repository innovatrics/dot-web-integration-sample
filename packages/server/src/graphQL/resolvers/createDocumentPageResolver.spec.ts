import createDocumentPageResponse from '../../api/mocks/data/createDocumentPageResponse.json';
import createDocumentPageResponseWithWarning from '../../api/mocks/data/createDocumentPageResponseWithWarning.json';
import { customerApiLink, customerApiLinkError, customerLinks, serverConnectionMock } from '../../test';

import resolvers from '.';

describe('#createDocumentPageResolver', () => {
  describe('createDocumentPageWithContent', () => {
    it('should get correct response when document is not created', async () => {
      const result = resolvers.Mutation.createDocumentPageWithContent(null, {
        content: 'message',
        isDocumentCreated: false,
        customerApiLink,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when document is created', async () => {
      const result = resolvers.Mutation.createDocumentPageWithContent(null, {
        content: 'message',
        isDocumentCreated: true,
        customerApiLink,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when advice is present', async () => {
      const documentAdvice = {
        classification: {
          countries: ['INO'],
          types: [],
          editions: [],
          machineReadableTravelDocuments: [],
        },
      };

      const result = resolvers.Mutation.createDocumentPageWithContent(null, {
        content: 'message',
        isDocumentCreated: false,
        customerApiLink,
        documentAdvice,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should throw error when customerApiLink is invalid', async () => {
      const result = resolvers.Mutation.createDocumentPageWithContent(null, {
        content: 'message',
        isDocumentCreated: true,
        customerApiLink: customerApiLinkError,
      });

      await expect(result).rejects.toThrow();
    });

    it('should map warnings from api response correctly', async () => {
      serverConnectionMock
        .onPut(`${customerApiLink}/document/pages`)
        .reply(() => [200, createDocumentPageResponseWithWarning]);

      const result = resolvers.Mutation.createDocumentPageWithContent(null, {
        content: 'message',
        isDocumentCreated: false,
        customerApiLink,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponseWithWarning, ...customerLinks });
    });
  });

  describe('#createDocumentPageWithImage', () => {
    beforeAll(() => {
      serverConnectionMock.onPut(`${customerApiLink}/document/pages`).reply(() => [200, createDocumentPageResponse]);
    });

    it('should get correct response when document is not created', async () => {
      const result = resolvers.Mutation.createDocumentPageWithImage(null, {
        image: 'image.jpg',
        isDocumentCreated: false,
        customerApiLink,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when document is created', async () => {
      const result = resolvers.Mutation.createDocumentPageWithImage(null, {
        image: 'image.jpg',
        isDocumentCreated: true,
        customerApiLink,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when advice is present', async () => {
      const documentAdvice = {
        classification: {
          countries: ['INO'],
          types: [],
          editions: [],
          machineReadableTravelDocuments: [],
        },
      };

      const result = resolvers.Mutation.createDocumentPageWithImage(null, {
        image: 'image.jpg',
        isDocumentCreated: false,
        customerApiLink,
        documentAdvice,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should throw error when customerApiLink is invalid', async () => {
      const result = resolvers.Mutation.createDocumentPageWithImage(null, {
        image: 'image.jpg',
        isDocumentCreated: true,
        customerApiLink: customerApiLinkError,
      });

      await expect(result).rejects.toThrow();
    });
  });
});
