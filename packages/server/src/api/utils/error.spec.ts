import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AxiosError, AxiosHeaders } from 'axios';
import type { AxiosApiError } from '../../types/serverTypes.ts';

import { parseApiError } from './error.ts';

describe('#Server connection utils', () => {
  const config: InternalAxiosRequestConfig = { headers: new AxiosHeaders(), method: 'post', url: '/test/123' };
  const response: AxiosResponse = {
    config,
    data: {},
    headers: {},
    status: 500,
    statusText: 'Error',
  };

  describe('parseApiError', () => {
    it('should return business error', () => {
      const res = {
        ...response,
        data: { errorCode: 'NOT_FOUND', errorMessage: 'Customer was not found' },
        status: 404,
      };

      const error: AxiosApiError = new AxiosError(undefined, undefined, config, undefined, res);

      const expectedResult = {
        code: 404,
        errorCode: 'NOT_FOUND',
        errorMessage: 'Customer was not found',
        method: 'post',
        path: '/test/123',
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });

    it('should return system logic error message', () => {
      const res = {
        ...response,
        statusText: 'System error',
      };

      const error: AxiosApiError = new AxiosError(undefined, undefined, config, undefined, res);

      const expectedResult = {
        code: 500,
        errorCode: undefined,
        errorMessage: 'System error',
        method: 'post',
        path: '/test/123',
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });

    it('should return system error if error.config does not exist', () => {
      const error: AxiosApiError = new AxiosError(undefined, undefined, undefined, undefined, response);

      const expectedResult = {
        code: 500,
        errorCode: undefined,
        errorMessage: 'Error',
        method: undefined,
        path: undefined,
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });

    it('should return system error with default code when response is missing', () => {
      const error = {
        code: 'INTERNAL_SERVER_ERROR',
        isAxiosError: false,
        message: 'System error',
        name: 'Error',
        toJSON: () => Object,
      };

      const expectedResult = {
        code: 500,
        errorCode: 'INTERNAL_SERVER_ERROR',
        errorMessage: 'System error',
        method: undefined,
        path: undefined,
      };

      expect(parseApiError(error)).toEqual(expectedResult);
    });
  });
});
