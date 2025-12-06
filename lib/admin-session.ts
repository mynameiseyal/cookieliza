/**
 * Admin Session Management
 * 
 * Simple in-memory session storage for admin authentication.
 * In production, replace with Redis, database, or JWT tokens.
 * 
 * Note: In-memory storage is lost on server restart.
 * For Vercel, this works in serverless functions but sessions
 * won't persist across different function instances.
 */

interface Session {
  createdAt: number;
}

// Store active sessions in memory
const activeSessions = new Map<string, Session>();

// Session expiry time (24 hours)
const SESSION_EXPIRY = 24 * 60 * 60 * 1000;

/**
 * Generate a new session token
 */
export function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Create a new session
 */
export function createSession(token: string): void {
  activeSessions.set(token, { createdAt: Date.now() });
  cleanExpiredSessions();
}

/**
 * Validate a session token
 */
export function isSessionValid(token: string | undefined): boolean {
  if (!token) return false;
  
  const session = activeSessions.get(token);
  if (!session) return false;
  
  // Check if session has expired
  const now = Date.now();
  if (now - session.createdAt > SESSION_EXPIRY) {
    activeSessions.delete(token);
    return false;
  }
  
  return true;
}

/**
 * Delete a session
 */
export function deleteSession(token: string): void {
  activeSessions.delete(token);
}

/**
 * Clean up expired sessions
 */
export function cleanExpiredSessions(): void {
  const now = Date.now();
  
  for (const [token, session] of activeSessions.entries()) {
    if (now - session.createdAt > SESSION_EXPIRY) {
      activeSessions.delete(token);
    }
  }
}

/**
 * Get session statistics (for debugging)
 */
export function getSessionStats() {
  return {
    totalSessions: activeSessions.size,
    sessions: Array.from(activeSessions.entries()).map(([token, session]) => ({
      token: token.substring(0, 20) + '...',
      createdAt: new Date(session.createdAt).toISOString(),
      expiresAt: new Date(session.createdAt + SESSION_EXPIRY).toISOString(),
    })),
  };
}

