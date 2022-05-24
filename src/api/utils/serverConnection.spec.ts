import { ErrorData } from '../../types/serverTypes';
import { parseApiError } from './serverConnection';

describe('#Server connection utils', () => {
  describe('parseApiError', () => {
    it('should return business logic error', () => {
      const error: ErrorData = {
        errorMessage: 'Customer was not found',
        errorCode: 'NOT_FOUND',
      };

      const expectedResult = {
        message: 'Customer was not found',
        code: 'NOT_FOUND',
      };

      parseApiError(error).should.be.deep.equal(expectedResult);
    });

    it('should return business logic error message and default code', () => {
      const error: ErrorData = {
        errorMessage: 'Customer was not found',
      };

      const expectedResult = {
        message: 'Customer was not found',
        code: 'UNKNOWN',
      };

      parseApiError(error).should.be.deep.equal(expectedResult);
    });

    it('should return business logic error code and default message', () => {
      const error: ErrorData = {
        errorCode: 'NOT_FOUND',
      };

      const expectedResult = {
        message: 'Unexpected error occurred without more specific cause.',
        code: 'NOT_FOUND',
      };

      parseApiError(error).should.be.deep.equal(expectedResult);
    });

    it('should return spring error', () => {
      const error: ErrorData = {
        error: 'Forbidden',
        status: 403,
      };

      const expectedResult = {
        message: 'Forbidden',
        code: '403',
      };

      parseApiError(error).should.be.deep.equal(expectedResult);
    });

    it('should return spring error message and default code', () => {
      const error: ErrorData = {
        error: 'Forbidden',
      };

      const expectedResult = {
        message: 'Forbidden',
        code: 'UNKNOWN',
      };

      parseApiError(error).should.be.deep.equal(expectedResult);
    });

    it('should return spring error code and default message', () => {
      const error: ErrorData = {
        status: 403,
      };

      const expectedResult = {
        message: 'Unexpected error occurred without more specific cause.',
        code: '403',
      };

      parseApiError(error).should.be.deep.equal(expectedResult);
    });

    it('should return default error', () => {
      const expectedResult = {
        message: 'Unexpected error occurred without more specific cause.',
        code: 'UNKNOWN',
      };

      parseApiError({}).should.be.deep.equal(expectedResult);
    });
  });
});
