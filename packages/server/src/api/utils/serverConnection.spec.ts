import { parseApiError } from './serverConnection';

describe('#Server connection utils', () => {
  describe('parseApiError', () => {
    it('should return business error', () => {
      const error = {
        response: {
          headers: {},
          config: {},
          status: 404,
          statusText: 'Error',
          data: { errorMessage: 'Customer was not found', errorCode: 'NOT_FOUND' },
        },
        config: {
          url: '/test/123',
          method: 'post',
        },
        name: 'Error',
        message: 'Error',
        isAxiosError: true,
        toJSON: () => Object,
      };

      const expectedResult = {
        errorMessage: 'Customer was not found',
        errorCode: 'NOT_FOUND',
        code: 404,
        method: 'post',
        path: '/test/123',
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });

    it('should return system logic error message', () => {
      const error = {
        response: {
          status: 500,
          statusText: 'System error',
          headers: {},
          config: {},
          data: {},
        },
        config: {
          url: '/test/123',
          method: 'post',
        },
        name: 'Error',
        message: 'Error',
        isAxiosError: true,
        toJSON: () => Object,
      };

      const expectedResult = {
        errorMessage: 'System error',
        errorCode: undefined,
        code: 500,
        method: 'post',
        path: '/test/123',
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });

    it('should return system error if error.config does not exist', () => {
      const error = {
        response: {
          status: 500,
          data: {},
          headers: {},
          config: {},
          statusText: 'Error',
        },
        name: 'Error',
        message: 'Error',
        isAxiosError: true,
        toJSON: () => Object,
      };

      const expectedResult = {
        errorMessage: 'Error',
        errorCode: undefined,
        code: 500,
        method: undefined,
        path: undefined,
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });

    it('should return system error with default code when response is missing', () => {
      const error = {
        message: 'System error',
        code: 'INTERNAL_SERVER_ERROR',
        name: 'Error',
        isAxiosError: false,
        toJSON: () => Object,
      };

      const expectedResult = {
        errorMessage: 'System error',
        errorCode: 'INTERNAL_SERVER_ERROR',
        code: 500,
        method: undefined,
        path: undefined,
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });
  });
});
