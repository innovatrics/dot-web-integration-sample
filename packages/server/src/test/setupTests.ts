import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { disClient } from '../api/connection/serverConnection.ts';
import { initServerMocks } from '../api/mocks/serverMockAdapter.ts';

console.log('setting up server tests...');

initServerMocks(disClient.instance);

const oauthMock = new MockAdapter(axios);
const tokenUrl = process.env.DIS_TOKEN_URL;

if (tokenUrl) {
  oauthMock.onPost(tokenUrl).reply(200, {
    access_token: 'mock-token',
    expires_in: 3600,
    token_type: 'Bearer',
  });
}
