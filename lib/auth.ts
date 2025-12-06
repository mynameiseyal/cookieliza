// Simple authentication for admin panel
// In production, use NextAuth.js or similar

export interface AdminSession {
  isAuthenticated: boolean;
  email?: string;
  name?: string;
}

// Simple password check (in production, use proper authentication)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'cookie2010';

export const checkAdminAuth = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

// Store admin session in localStorage
export const setAdminSession = (authenticated: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin-authenticated', String(authenticated));
  }
};

export const getAdminSession = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin-authenticated') === 'true';
  }
  return false;
};

export const clearAdminSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin-authenticated');
  }
};

