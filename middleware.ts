import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Only protect admin routes (except login page)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin') {
    
    // Check if session cookie exists
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!sessionToken) {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // Optionally verify session with API (for extra security)
    // For now, just check if cookie exists
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

