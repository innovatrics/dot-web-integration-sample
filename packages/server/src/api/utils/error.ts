import { DEFAULT_ERROR } from '../../constants.ts';
import type { AxiosApiError, ParsedError } from '../../types/serverTypes.ts';

export const parseApiError = (error: AxiosApiError): ParsedError => {
  // when axios instance was not able to call service at all
  if (!error.response) {
    return {
      code: DEFAULT_ERROR.CODE,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  let errorMessage = DEFAULT_ERROR.MESSAGE;
  let errorCode: string | undefined;

  // parsing business error message
  if (error.response.data.errorMessage) {
    errorMessage = error.response.data?.errorMessage;
    // parsing system error message
  } else if (error.response.statusText) {
    errorMessage = error.response.statusText;
  }

  // parsing business error code

  if (error.response.data.errorCode) {
    errorCode = error.response.data.errorCode;
  }

  const { method, url } = error.config || {};

  return {
    code: error.response.status ?? DEFAULT_ERROR.CODE,
    errorCode,
    errorMessage,
    method,
    path: url,
  };
};
