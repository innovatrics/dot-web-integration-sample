import type { AxiosError } from 'axios';

import { ThirdPartyApiError, type ThirdPartySource } from '../../../errors/index.ts';
import { parseApiError } from '../../utils/error.ts';
import { isTestRunning } from '../../utils/index.ts';

/**
 * It takes an error object and a source, parses the error object, and throws a ThirdPartyApiError with
 * enriched details so the REST layer can respond accordingly.
 * @param error - AxiosError<{ errorMessage?: string; errorCode?: string }>
 * @param {ThirdPartySource} source - The third-party API source (DIS).
 */
export const onRejected = (
  error: AxiosError<{ errorCode?: string; errorMessage?: string }>,
  source: ThirdPartySource,
) => {
  const { code, errorCode, errorMessage, method, path } = parseApiError(error);

  const status = code ?? 500;

  if (!isTestRunning()) {
    console.error(
      `Response error [${source}]: ${
        method ? method.toUpperCase() : ''
      } ${path} -> status: ${code} with error message: ${errorMessage} and error code: ${errorCode}`,
    );
  }

  throw new ThirdPartyApiError({
    message: errorMessage,
    status,
    source,
    method,
    path,
    errorCode,
  });
};
