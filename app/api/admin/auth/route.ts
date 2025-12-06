import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  generateSessionToken,
  createSession,
  deleteSession,
  isSessionValid,
} from '@/lib/admin-session';

// Server-side password check (NOT exposed to client)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cookie2010';

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
      createSession(sessionToken);

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
export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (!isSessionValid(sessionToken)) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({ authenticated: true });
}

// DELETE /api/admin/auth - Logout
export async function DELETE() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (sessionToken) {
    deleteSession(sessionToken);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-session');

  return response;
}

