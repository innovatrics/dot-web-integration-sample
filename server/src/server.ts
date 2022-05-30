import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { GraphQLError } from 'graphql';
import { hostname } from 'os';

import HttpServerError from './api/error/HttpServerError';
import { initMocks, isMockAdapterEnabled } from './api/mocks/mockAdapter';
import serverConnection from './api/rest/serverConnection';
import env from './dotenv';
import resolvers from './graphQL/resolvers';
import typeDefs from './graphQL/schema';
import probeRouter from './router/probeRouter';

const main = async () => {
  const { SERVER_PORT = 8000 } = env;
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error: GraphQLError) => {
      if (error.originalError?.name === 'HttpServerError') {
        const { message, extensions } = error;
        const code = extensions.code as string;

        if (!message || !code) {
          console.error(error);

          return error;
        }

        return new HttpServerError(message, code);
      }

      console.error(error);

      return error;
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, bodyParserConfig: { limit: '20mb' } });

  if (isMockAdapterEnabled()) {
    initMocks(serverConnection);
  }

  app.use('/_alive', probeRouter);

  app.listen({ port: SERVER_PORT }, () => {
    console.log(`🚀 Server is ready at ${hostname()}:${SERVER_PORT || 8000}/graphql`);
  });
};

export default main().catch((error) => {
  console.log('Error starting server', error);
});
