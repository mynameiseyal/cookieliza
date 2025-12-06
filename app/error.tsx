'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-pink-100">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full mb-6">
            <span className="text-5xl">⚠️</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            אופס! משהו השתבש
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            מצטערים, אירעה שגיאה בלתי צפויה. אנחנו כבר עובדים על זה!
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
            >
              נסה שוב
            </button>
            
            <Link
              href="/"
              className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-4 rounded-full hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
            >
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

