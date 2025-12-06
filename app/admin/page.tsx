'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            // Already logged in, redirect to dashboard
            router.push('/admin/dashboard');
            return;
          }
        }
      } catch {
        // Not logged in, show login form
        console.log('Not authenticated');
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call server-side API (secure!)
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('התחברת בהצלחה! 🎉');
        // Use window.location for hard navigation to ensure middleware runs
        window.location.href = '/admin/dashboard';
      } else {
        toast.error(data.error || 'סיסמה שגויה. נסה שוב.');
        setPassword('');
      }
    } catch (error) {
      toast.error('שגיאה בהתחברות. נסה שוב.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-pink-100">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              כניסת מנהל
            </h1>
            <p className="text-gray-600">
              קוקי ליזה - פאנל ניהול
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="הזן סיסמת מנהל"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transform hover:scale-105 shadow-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'מתחבר...' : 'התחבר'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

