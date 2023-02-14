import type { AxiosError, AxiosResponse } from 'axios';

import { GraphQLError } from 'graphql';

import { RECAPTCHA_FULFILLED_SCORE } from '../../../constants';
import { Connection } from '../../../types/serverTypes';
import { isTestRunning } from '../../utils';

import { onRejected } from './common';

/**
 * If the error is a recaptcha error, then log the error and return a rejected promise
 * @param error - AxiosError<{ errorMessage?: string; errorCode?: string }>
 */
export const onRecaptchaConnectionRejected = (error: AxiosError<{ errorCode?: string; errorMessage?: string }>) => {
  onRejected(error, Connection.RECAPTCHA);
};

/**
 * If the recaptcha validation was not successful, throw an error
 * @param {AxiosResponse} response - AxiosResponse - this is the response from the recaptcha server.
 * @returns The response from the recaptcha validation
 */
export const onRecaptchaConnectionFulfilled = (response: AxiosResponse) => {
  const {
    data: { score, success, ...rest },
  } = response;

  const extensions = {
    code: 400, // bad request
    connection: Connection.RECAPTCHA,
  };

  if (!success) {
    if (!isTestRunning()) {
      console.error(`Recaptcha validation was not successful. Finished with error codes: ${rest['error-codes']}`);
    }

    throw new GraphQLError('An error occurred during recaptcha validation', { extensions });
  }

  if (score < RECAPTCHA_FULFILLED_SCORE) {
    if (!isTestRunning()) {
      console.error(
        `Recaptcha score: ${score} is bellow recaptcha fulfilled score threshold: ${RECAPTCHA_FULFILLED_SCORE}`,
      );
    }

    throw new GraphQLError('An error occurred during recaptcha validation', { extensions });
  }

  return response;
};
