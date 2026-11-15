import { randomUUID } from 'node:crypto';
import { appLogger } from './logger.ts';

type Session = {
  createdAt: Date;
  estimatedAge?: number;
  filename?: string;
  id: string;
};

// In-memory storage for sessions
const sessions = new Map<string, Session>();

/**
 * Creates a new session with a unique ID and stores it
 * @returns The created session object
 */
export function createSession(): string {
  const session: Session = {
    createdAt: new Date(),
    id: randomUUID(),
  };

  appLogger.info(`Created new session with id: ${session.id}`);

  sessions.set(session.id, session);

  return session.id;
}

/**
 * Updates the filename for a session
 * @param sessionId - The unique session ID
 * @param filename - The filename of the stored face image
 * @returns true if session was found and updated, false otherwise
 */
export function updateSessionFilename(sessionId: string, filename: string): boolean {
  const session = sessions.get(sessionId);

  if (session) {
    appLogger.debug(`Updating session ${sessionId} with filename of ${filename}`);
    session.filename = filename;

    return true;
  }

  return false;
}

/**
 * Updates the estimated age for a session
 * @param sessionId - The unique session IDie
 * @param estimatedAge - The estimated age as an integer
 * @returns true if session was found and updated, false otherwise
 */
export function updateSessionAge(sessionId: string, estimatedAge: number): boolean {
  const session = sessions.get(sessionId);

  if (session) {
    appLogger.debug(`Updating session ${sessionId} with age of ${estimatedAge}`);
    session.estimatedAge = estimatedAge;

    return true;
  }

  return false;
}

/**
 * Retrieves a session by its ID
 * @param sessionId - The unique session ID
 * @returns The session object if found, undefined otherwise
 */
export function getSession(sessionId: string): Session | undefined {
  appLogger.debug(`Retrieving session wit id: ${sessionId}`);
  return sessions.get(sessionId);
}

/**
 * Clears a specific session by ID
 * @param sessionId - The unique session ID to clear
 * @returns true if session was found and cleared, false otherwise
 */
export function clearSession(sessionId: string): boolean {
  appLogger.info(`Clearing session with id: ${sessionId}`);
  return sessions.delete(sessionId);
}

/**
 * Clears all sessions
 * @returns The number of sessions that were cleared
 */
export function clearAllSessions(): number {
  const count = sessions.size;

  appLogger.info(`Clearing all sessions: ${count}`);

  sessions.clear();

  return count;
}

/**
 * Removes all sessions older than the specified age in milliseconds
 * @param maxAgeMs - Maximum age in milliseconds (default: 1 hour)
 * @returns The number of sessions that were cleaned up
 */
export function cleanupOldSessions(maxAgeMs: number = 60 * 60 * 1000): number {
  const now = new Date();
  const sessionIds = Array.from(sessions.keys());
  let cleanedCount = 0;

  appLogger.info(`Cleaning up old sessions: ${sessionIds.length}`);

  for (const sessionId of sessionIds) {
    const session = sessions.get(sessionId);

    if (session && now.getTime() - session.createdAt.getTime() > maxAgeMs) {
      sessions.delete(sessionId);
      cleanedCount++;
    }
  }

  return cleanedCount;
}

/**
 * Starts a periodic cleanup process that runs at specified intervals
 * @param intervalMs - Cleanup interval in milliseconds (default: 15 minutes)
 * @param maxAgeMs - Maximum session age in milliseconds (default: 1 hour)
 * @returns The interval timer that can be used to stop the cleanup process
 */
export function startPeriodicCleanup(
  intervalMs: number = 15 * 60 * 1000,
  maxAgeMs: number = 60 * 60 * 1000,
): NodeJS.Timeout {
  return setInterval(() => {
    const cleanedCount = cleanupOldSessions(maxAgeMs);

    if (cleanedCount > 0) {
      appLogger.info(`Cleaned up ${cleanedCount} expired sessions`);
    }
  }, intervalMs);
}
