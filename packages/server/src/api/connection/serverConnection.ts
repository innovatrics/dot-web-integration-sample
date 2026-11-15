import { Api as DisApi } from '@innovatrics/dis-client-sdk';

import { ENV } from '../../dotenv.ts';
import { onDisConnectionRejected, onRequestFulfilled, onResponseFulfilled } from './interceptors/server.ts';

const disClient = new DisApi({
  baseURL: ENV.DIS_URL,
  ...(ENV.NODE_ENV === 'development'
    ? {
        auth: {
          authType: 'none',
        },
        headers: {
          Authorization: `Bearer ${ENV.DIS_AUTH_TOKEN}`,
        },
      }
    : {
        auth: {
          audience: ENV.DIS_AUDIENCE,
          authType: 'oauth2',
          clientId: ENV.DIS_CLIENT_ID,
          clientSecret: ENV.DIS_CLIENT_SECRET,
          sendClientInBody: true,
          tokenUrl: ENV.DIS_TOKEN_URL,
        },
      }),

  secure: true,
});

// Register request interceptors for logging outgoing requests
disClient.instance.interceptors.request.use(onRequestFulfilled('DIS'));

// Register response interceptors for logging and error handling
disClient.instance.interceptors.response.use(onResponseFulfilled('DIS'), onDisConnectionRejected);

export { disClient };
