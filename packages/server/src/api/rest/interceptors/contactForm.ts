import type { AxiosError, AxiosResponse } from 'axios';

import { GraphQLError } from 'graphql';

import { Connection } from '../../../types/serverTypes';
import { isTestRunning } from '../../utils';

import { onRejected } from './common';

/**
 * If the error is a network error, then show a network error message, otherwise show the error message
 * returned by the server.
 * @param error - AxiosError<{ errorMessage?: string; errorCode?: string }>
 */
export const onContactFormConnectionRejected = (error: AxiosError<{ errorCode?: string; errorMessage?: string }>) => {
  onRejected(error, Connection.CONTACT_FORM);
};

/**
 * If the response status is not 'validation_failed', return the response. Otherwise, throw an error
 * @param {AxiosResponse} response - AxiosResponse - this is the response object that Axios returns.
 * @returns The response from the post request.
 */
export const onContactFormConnectionFulfilled = (response: AxiosResponse) => {
  const {
    data: { invalid_fields, status },
  } = response;

  if (status === 'validation_failed') {
    if (!isTestRunning()) {
      console.error(
        `Post contact form was not successful. Finished with error codes: ${
          invalid_fields ? JSON.stringify(invalid_fields) : undefined
        }`,
      );
    }

    const extensions = {
      code: 400, // bad request
      connection: Connection.CONTACT_FORM,
    };

    throw new GraphQLError('An error occurred during contact form post', { extensions });
  }

  return response;
};
