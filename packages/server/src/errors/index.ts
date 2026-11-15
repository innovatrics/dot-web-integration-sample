export type ThirdPartySource = 'DIS';

export class BaseServerError extends Error {
  status: number;
  code?: string;
  details?: Record<string, unknown>;

  constructor(message: string, status: number, code?: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'BaseServerError';
    this.status = status;
    this.code = code;
    this.details = details;

    // Ensure proper prototype chain when transpiling to ES5 or CJS
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ThirdPartyApiError extends BaseServerError {
  source: ThirdPartySource;
  method?: string;
  path?: string;
  errorCode?: string;

  constructor(params: {
    message: string;
    status: number;
    source: ThirdPartySource;
    method?: string;
    path?: string;
    errorCode?: string;
    details?: Record<string, unknown>;
  }) {
    super(params.message, params.status, params.errorCode, params.details);
    this.name = 'ThirdPartyApiError';
    this.source = params.source;
    this.method = params.method;
    this.path = params.path;
    this.errorCode = params.errorCode;
  }
}

export class ProcessingError extends BaseServerError {
  operation: string;
  originalError?: Error;

  constructor(params: {
    message: string;
    status?: number;
    operation: string;
    originalError?: Error;
    details?: Record<string, unknown>;
  }) {
    super(params.message, params.status ?? 500, 'PROCESSING_ERROR', params.details);
    this.name = 'ProcessingError';
    this.operation = params.operation;
    this.originalError = params.originalError;
  }
}

export class RequestValidationError extends BaseServerError {
  constructor() {
    super('Invalid request body', 400, 'INVALID_REQUEST_BODY');
    this.name = 'RequestValidationError';
  }
}
