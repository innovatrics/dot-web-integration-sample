import type { AxiosError, AxiosResponse } from 'axios';

import { Connection } from '../../../types/serverTypes';
import { isTestRunning } from '../../utils';

import { onRejected } from './common';

/**
 * If the error is a server error, then log the error message and error code
 * @param error - AxiosError<{ errorMessage?: string; errorCode?: string }>
 */
export const onServerConnectionRejected = (error: AxiosError<{ errorCode?: string; errorMessage?: string }>) => {
  onRejected(error, Connection.SERVER);
};

/**
 * It logs the request method and url to the console, and returns the response
 * @param {AxiosResponse} response - AxiosResponse - the response object from the server
 * @returns The response object
 */
export const onServerConnectionFulfilled = (response: AxiosResponse) => {
  const { config, status } = response;

  if (!isTestRunning()) {
    console.log(`Request: ${config.method?.toUpperCase()} ${config.url} -> response status: ${status} `);
  }

  return response;
};
