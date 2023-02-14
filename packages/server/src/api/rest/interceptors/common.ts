import type { Connection } from '../../../types/serverTypes';
import type { AxiosError } from 'axios';

import { GraphQLError } from 'graphql';

import { isTestRunning } from '../../utils';
import { parseApiError } from '../../utils/serverConnection';

/**
 * It takes an error object and a connection object, parses the error object, and throws a new
 * GraphQLError with the parsed error message and the connection object as extensions
 * @param error - AxiosError<{ errorMessage?: string; errorCode?: string }>
 * @param {Connection} connection - Connection - The connection object that was passed to the resolver.
 */
export const onRejected = (
  error: AxiosError<{ errorCode?: string; errorMessage?: string }>,
  connection: Connection,
) => {
  const { code, errorCode, errorMessage, method, path } = parseApiError(error);

  const extensions = { path, code, errorCode, connection };

  if (!isTestRunning()) {
    console.error(
      `Response error: ${
        method ? method.toUpperCase() : ''
      } ${path} -> status: ${code} with error message: ${errorMessage} and error code: ${errorCode}`,
    );
  }

  throw new GraphQLError(errorMessage, { extensions });
};
