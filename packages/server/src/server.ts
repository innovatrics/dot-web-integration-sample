import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { hostname } from 'os';

import { initServerMocks, isMockAdapterEnabled } from './api/mocks/serverMockAdapter';
import { serverConnection } from './api/rest/serverConnection';
import env from './dotenv';
import resolvers from './graphQL/resolvers';
import typeDefs from './graphQL/schema';
import probeRouter from './router/probeRouter';

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
    json({ limit: '20mb' }),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  if (isMockAdapterEnabled()) {
    initServerMocks(serverConnection);
  }

  app.use('/_alive', probeRouter);

  app.listen({ port: SERVER_PORT }, () => {
    console.log(`🚀 Server is ready at ${hostname()}:${SERVER_PORT || 8000}/graphql`);
  });
};

export default main().catch((error) => {
  console.error('Error starting server', error);
});
