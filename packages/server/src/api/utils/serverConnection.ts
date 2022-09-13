import { DEFAULT_ERROR } from '../../constants';
import { ErrorData } from '../../types/serverTypes';

export const parseApiError = (errorData: ErrorData) => {
  let { message, code } = DEFAULT_ERROR;

  // business logic error message
  if (errorData.errorMessage) {
    message = errorData.errorMessage;
    // spring default error message
  } else if (errorData.error) {
    message = errorData.error;
  }

  // business logic error code
  if (errorData.errorCode) {
    code = errorData.errorCode;
    // spring default error code
  } else if (errorData.status) {
    code = errorData.status.toString();
  }

  return {
    message,
    code,
  };
};
