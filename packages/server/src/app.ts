import bodyParser from 'body-parser';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import express from 'express';
import { disClient } from './api/connection/serverConnection.ts';
import { initServerMocks } from './api/mocks/serverMockAdapter.ts';
import { ENV } from './dotenv.ts';
import { appLogger } from './logger.ts';
import { register } from './metrics.ts';
import ageRouter from './router/ageRouter.ts';
import disRouter from './router/disRouter.ts';
import errorHandler from './router/errorHandler.ts';
import livenessRouter from './router/livenessRouter.ts';
import readinessRouter from './router/readinessRouter.ts';

export const createApp = (): Express => {
  const app = express();

  app.use(cors<cors.CorsRequest>({ origin: ENV.ALLOWED_ORIGINS, credentials: true }));
  app.use(bodyParser.json({ limit: '20mb' }));

  if (ENV.MOCKS_ENABLED) {
    initServerMocks(disClient.instance);
  }

  app.use('/api/v1', disRouter);
  app.use('/api/v1', ageRouter);

  app.use('/api/health', livenessRouter);
  app.use('/api/ready', readinessRouter);
  app.use(errorHandler);

  app.get('/api/metrics', async (_: Request, res: Response) => {
    try {
      const metrics = await register.metrics();
      res.set('Content-Type', register.contentType);
      res.send(metrics);
      appLogger.debug('Metrics endpoint served');
    } catch (error) {
      appLogger.error('Error serving metrics', { error });
      res.status(500).send('Internal Server Error');
    }
  });

  return app;
};
