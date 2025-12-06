import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Server-side password check (NOT exposed to client)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cookie2010';

// Generate a simple session token (in production, use JWT or proper session management)
function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// Store active sessions in memory (in production, use Redis or database)
const activeSessions = new Map<string, { createdAt: number }>();

// Clean up expired sessions (older than 24 hours)
function cleanExpiredSessions() {
  const now = Date.now();
  const expiryTime = 24 * 60 * 60 * 1000; // 24 hours
  
  for (const [token, session] of activeSessions.entries()) {
    if (now - session.createdAt > expiryTime) {
      activeSessions.delete(token);
    }
  }
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'סיסמה נדרשת' },
        { status: 400 }
      );
    }

    // Check password (server-side only!)
    if (password === ADMIN_PASSWORD) {
      // Generate session token
      const sessionToken = generateSessionToken();
      activeSessions.set(sessionToken, { createdAt: Date.now() });

      // Clean up old sessions
      cleanExpiredSessions();

      // Create response with secure HTTP-only cookie
      const response = NextResponse.json({
        success: true,
        message: 'התחברת בהצלחה!',
      });

      // Set HTTP-only cookie (cannot be accessed by JavaScript)
      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    } else {
      // Add small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));

      return NextResponse.json(
        { success: false, error: 'סיסמה שגויה' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'שגיאת שרת' },
      { status: 500 }
    );
  }
}

// GET /api/admin/auth - Check session
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (!sessionToken || !activeSessions.has(sessionToken)) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({ authenticated: true });
}

// DELETE /api/admin/auth - Logout
export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (sessionToken) {
    activeSessions.delete(sessionToken);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-session');

  return response;
}

