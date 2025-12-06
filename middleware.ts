import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Only protect admin routes (except login page)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin') {
    
    // Check if session cookie exists
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!sessionToken) {
      // Redirect to login if no cookie
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // Cookie exists - allow access
    // Full session validation happens in API routes if needed
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

