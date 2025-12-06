import { NextRequest, NextResponse } from 'next/server';
import { isSessionValid } from '@/lib/admin-session';

export async function middleware(request: NextRequest) {
  // Only protect admin routes (except login page)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin') {
    
    // Check if session cookie exists and is valid
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!isSessionValid(sessionToken)) {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

