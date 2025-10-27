import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { hostname } from 'os';

import { initServerMocks } from './api/mocks/serverMockAdapter.js';
import { disClient } from './api/rest/serverConnection.js';
import env from './dotenv.js';
import resolvers from './graphQL/resolvers/index.js';
import typeDefs from './graphQL/schema.js';
import probeRouter from './router/probeRouter.js';

const main = async () => {
  const { SERVER_PORT = 8000 } = env;
  const app = express();
  const apolloServer = new ApolloServer<{ token?: string }>({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: '20mb' }),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  if (env.MOCKS_ENABLED) {
    initServerMocks(disClient.instance);
  }

  app.use('/_alive', probeRouter);

  app.listen({ port: SERVER_PORT }, () => {
    console.log(`🚀 Server is ready at ${hostname()}:${SERVER_PORT || 8000}/graphql`);
  });
};

export default main().catch((error) => {
  console.error('Error starting server', error);
});
