export class HttpError<T = unknown> extends Error {
  status: number;

  code?: string;

  details?: T;

  constructor(message: string, status: number, code?: string, details?: T) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
