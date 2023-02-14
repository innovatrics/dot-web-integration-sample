import type { AxiosInstance } from 'axios';

import MockAdapter from 'axios-mock-adapter';

import validateRecaptchaResponse from './data/validateRecaptchaResponse.json';

const HTTP_OK = 200;

function validateRecaptcha() {
  return [HTTP_OK, validateRecaptchaResponse];
}

export const initRecaptchaMocks = (axios: AxiosInstance): MockAdapter => {
  const mock = new MockAdapter(axios);

  mock.onPost().reply(validateRecaptcha);

  return mock;
};
