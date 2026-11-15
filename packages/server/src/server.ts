import { hostname } from 'node:os';
import { createApp } from './app.ts';
import { ENV } from './dotenv.ts';
import { appLogger } from './logger.ts';

const main = async () => {
  const { SERVER_PORT = 8000 } = ENV;

  createApp().listen({ port: SERVER_PORT }, async () => {
    appLogger.info(`🚀 Server is ready at ${hostname()}:${SERVER_PORT || 8000}`);
  });
};

export default main().catch((error) => {
  appLogger.error('Error starting server', error);
});
