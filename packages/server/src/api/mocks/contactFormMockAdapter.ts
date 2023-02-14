import type { AxiosInstance } from 'axios';

import MockAdapter from 'axios-mock-adapter';

import postContactFormResponse from './data/postContactFormResponse.json';

const HTTP_OK = 200;

function postContactForm() {
  return [HTTP_OK, postContactFormResponse];
}

export const initContactFormaMocks = (axios: AxiosInstance): MockAdapter => {
  const mock = new MockAdapter(axios);

  mock.onPost().reply(postContactForm);

  return mock;
};
