import type { AxiosApiError } from '../../types/serverTypes';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AxiosError, AxiosHeaders } from 'axios';

import { parseApiError } from './serverConnection';

describe('#Server connection utils', () => {
  const config: InternalAxiosRequestConfig = { url: '/test/123', method: 'post', headers: new AxiosHeaders() };
  const response: AxiosResponse = {
    config,
    headers: {},
    status: 500,
    statusText: 'Error',
    data: {},
  };

  describe('parseApiError', () => {
    it('should return business error', () => {
      const res = {
        ...response,
        status: 404,
        data: { errorMessage: 'Customer was not found', errorCode: 'NOT_FOUND' },
      };

      const error: AxiosApiError = new AxiosError(undefined, undefined, config, undefined, res);

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
      const res = {
        ...response,
        statusText: 'System error',
      };

      const error: AxiosApiError = new AxiosError(undefined, undefined, config, undefined, res);

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
      const error: AxiosApiError = new AxiosError(undefined, undefined, undefined, undefined, response);

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
