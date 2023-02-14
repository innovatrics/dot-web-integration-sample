import type { AxiosApiError, ParsedError } from '../../types/serverTypes';

import { DEFAULT_ERROR } from '../../constants';

export const parseApiError = (error: AxiosApiError): ParsedError => {
  // when axios instance was not able to call service at all
  if (!error.response) {
    return {
      errorMessage: error.message,
      errorCode: error.code,
      code: DEFAULT_ERROR.CODE,
    };
  }

  let errorMessage = DEFAULT_ERROR.MESSAGE;
  let errorCode;

  // parsing business error message
  if (error.response.data.errorMessage) {
    errorMessage = error.response.data?.errorMessage;
    // parsing system error message
  } else if (error.response.statusText) {
    errorMessage = error.response.statusText;
  }

  // parsing business error code

  if (error.response.data.errorCode) {
    // eslint-disable-next-line prefer-destructuring
    errorCode = error.response.data.errorCode;
  }

  const { method, url } = error.config || {};

  return {
    errorMessage,
    errorCode,
    path: url,
    method,
    code: error.response.status ?? DEFAULT_ERROR.CODE,
  };
};
