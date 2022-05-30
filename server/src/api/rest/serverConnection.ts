import axios from 'axios';

import env from '../../dotenv';
import HttpServerError from '../error/HttpServerError';
import { isStoreEndpoint, isTestRunning } from '../utils';
import { parseApiError } from '../utils/serverConnection';

const serverConnection = axios.create({
  baseURL: env.DOCUMENT_IDENTITY_SERVICE,
  maxBodyLength: 20000000,
  headers: {
    Authorization: `Bearer ${env.AUTH_TOKEN}`,
  },
});

serverConnection.interceptors.response.use(
  (response) => {
    const { config, status } = response;

    if (!isTestRunning()) {
      console.log(`Request: ${config.method?.toUpperCase()} ${config.url} -> response status: ${status} `);
    }

    return response;
  },
  (error) => {
    const { message, code } = parseApiError(error.response.data);
    const serverError = new HttpServerError(message, code);

    const { method, url } = error.config;

    if (!isTestRunning()) {
      console.error(
        `Response error: ${method.toUpperCase()} ${url} -> status: ${
          error.response.data.status
        } with ${serverError.toString()}`,
      );
    }

    // don't throw error on /store endpoints
    if (isStoreEndpoint(url.toString())) {
      return { data: error.response.data };
    }

    throw serverError;
  },
);

export default serverConnection;
