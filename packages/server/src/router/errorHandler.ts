import type { ErrorRequestHandler } from 'express';

import RequiredError from '../api/error/RequiredError.ts';
import { ProcessingError, RequestValidationError, ThirdPartyApiError } from '../errors/index.ts';
import { appLogger } from '../logger.ts';

const GENERIC_SERVER_ERROR = 'Internal server error';
const GENERIC_UPSTREAM_ERROR = 'Upstream service error';

const BODY_PARSER_MESSAGES: Record<number, string> = {
  413: 'Request body too large',
  415: 'Unsupported request body encoding',
};

type BodyParserError = { status: number; type: string };

// body-parser rejects malformed, oversized or wrongly encoded bodies before any route runs.
const isBodyParserError = (err: unknown): err is BodyParserError => {
  const candidate = err as Partial<BodyParserError> | null;

  return (
    typeof candidate?.type === 'string' &&
    typeof candidate.status === 'number' &&
    candidate.status >= 400 &&
    candidate.status < 500
  );
};

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof RequestValidationError) {
    res.status(err.status).json({ message: err.message });

    return;
  }

  if (isBodyParserError(err)) {
    appLogger.info(`Rejected request body: ${err.type}`);

    res.status(err.status).json({ message: BODY_PARSER_MESSAGES[err.status] ?? 'Invalid request body' });

    return;
  }

  if (err instanceof RequiredError) {
    const message = err.message || `${err.field} is required`;

    res.status(400).json({ message });

    return;
  }

  if (err instanceof ThirdPartyApiError) {
    appLogger.error(`Third-party API error [${err.source}]`, {
      source: err.source,
      method: err.method,
      path: err.path,
      status: err.status,
      message: err.message,
    });

    const isClientError = err.status >= 400 && err.status < 500;

    res.status(isClientError ? err.status : 500).json({
      message: isClientError ? err.message : GENERIC_UPSTREAM_ERROR,
      source: err.source,
      status: isClientError ? err.status : 500,
    });

    return;
  }

  if (err instanceof ProcessingError) {
    appLogger.error(`Processing error in ${err.operation}`, {
      operation: err.operation,
      originalError: err.originalError?.message,
    });

    res.status(err.status).json({ message: err.message });

    return;
  }

  appLogger.error('Unhandled error during request processing', { error: err instanceof Error ? err.message : err });

  res.status(500).json({ message: GENERIC_SERVER_ERROR });
};

export default errorHandler;
