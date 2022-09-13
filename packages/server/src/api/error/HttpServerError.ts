import { ApolloError } from 'apollo-server-express';

class HttpServerError extends ApolloError {
  name = 'HttpServerError';

  toString(): string {
    return JSON.stringify(this);
  }
}

export default HttpServerError;
