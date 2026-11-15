import * as promClient from 'prom-client';

export const register = new promClient.Registry();
promClient.collectDefaultMetrics({
  register,
  prefix: '',
});
