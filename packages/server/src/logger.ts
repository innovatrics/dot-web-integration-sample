import pino, { type Logger as PinoLogger } from 'pino';
import { sanitizeForLogging } from './api/connection/interceptors/server.ts';
import { ENV } from './dotenv.ts';

// Create logger with environment-specific configuration
export function createPino() {
  const pinoInstance = pino({
    redact: {
      paths: ['.authorization', '.password', '.secret', '.token'],
      censor: '[REDACTED]',
    },
    serializers: { payload: sanitizeForLogging, data: sanitizeForLogging },
    level: ENV.LOG_LEVEL,

    transport:
      ENV.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
              singleLine: true,
              messageFormat: '{msg}',
            },
          }
        : undefined, // No transport in production - outputs JSON directly
    formatters: {
      // Add application-specific metadata to all logs
      level: (label) => ({ level: label }),
    },
    base: {
      service: 'web-demo-server',
      environment: ENV.NODE_ENV,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  });

  return pinoInstance;
}

export const createLogger = (logger: PinoLogger, context: string) => {
  const childLogger = logger.child({ context });

  const childLoggerInterface = {
    info: (msg: string, data: Record<string, unknown> = {}) => childLogger.info({ ...data, msg }),
    error: (msg: string, data: Record<string, unknown> = {}) => childLogger.error({ ...data, msg }),
    warn: (msg: string, data: Record<string, unknown> = {}) => childLogger.warn({ ...data, msg }),
    debug: (msg: string, data: Record<string, unknown> = {}) => childLogger.debug({ ...data, msg }),
    trace: (msg: string, data: Record<string, unknown> = {}) => childLogger.trace({ ...data, msg }),
  };

  return childLoggerInterface;
};

export type LoggerInterface = ReturnType<typeof createLogger>;

const pinoLogger = createPino();

export const appLogger = createLogger(pinoLogger, 'web-demo-server');
