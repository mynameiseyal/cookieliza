'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession, clearAdminSession } from '@/lib/auth';
import { getProductsByCategory } from '@/lib/products';
import Link from 'next/link';
import {
  ArrowRightOnRectangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function AdminAnalytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authenticated = getAdminSession();
    if (!authenticated) {
      toast.error('יש להתחבר תחילה');
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    clearAdminSession();
    toast.success('התנתקת בהצלחה');
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const cakes = getProductsByCategory('cake');
  const cookies = getProductsByCategory('cookie');
  const breads = getProductsByCategory('bread');

  // Mock analytics data
  const topProducts = [
    { name: 'עוגת שוקולד מפנקת', sales: 45, revenue: 7195.50, trend: 'up' },
    { name: 'עוגיות שוקולד צ\'יפס', sales: 89, revenue: 3996.10, trend: 'up' },
    { name: 'חלה ביתית', sales: 67, revenue: 2003.30, trend: 'up' },
    { name: 'עוגת גבינה אפויה', sales: 32, revenue: 5756.80, trend: 'down' },
    { name: 'לחם מחמצת', sales: 54, revenue: 1776.60, trend: 'up' },
  ];

  const monthlySales = [
    { month: 'ינואר', sales: 4200, revenue: 52300 },
    { month: 'פברואר', sales: 4800, revenue: 59800 },
    { month: 'מרץ', sales: 5200, revenue: 64500 },
    { month: 'אפריל', sales: 4900, revenue: 61200 },
    { month: 'מאי', sales: 5500, revenue: 68900 },
    { month: 'יוני', sales: 6100, revenue: 76400 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                🍪 פאנל ניהול
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium" target="_blank">
                צפה באתר
              </Link>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                התנתק
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">אנליטיקס ודוחות</h2>
          <p className="text-gray-600">נתוני מכירות וביצועים</p>
        </div>

        {/* Category Performance */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">ביצועים לפי קטגוריה</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🎂</span>
                <ArrowTrendingUpIcon className="h-6 w-6" />
              </div>
              <p className="text-white/80 text-sm mb-1">עוגות</p>
              <p className="text-3xl font-bold mb-2">{cakes.length}</p>
              <p className="text-sm text-white/90">מוצרים פעילים</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm">מכירות החודש: ₪25,400</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🍪</span>
                <ArrowTrendingUpIcon className="h-6 w-6" />
              </div>
              <p className="text-white/80 text-sm mb-1">עוגיות</p>
              <p className="text-3xl font-bold mb-2">{cookies.length}</p>
              <p className="text-sm text-white/90">מוצרים פעילים</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm">מכירות החודש: ₪18,600</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🍞</span>
                <ArrowTrendingUpIcon className="h-6 w-6" />
              </div>
              <p className="text-white/80 text-sm mb-1">לחמים</p>
              <p className="text-3xl font-bold mb-2">{breads.length}</p>
              <p className="text-sm text-white/90">מוצרים פעילים</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm">מכירות החודש: ₪12,800</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">המוצרים הנמכרים ביותר</h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} מכירות</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="font-bold text-gray-900">₪{product.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {product.trend === 'up' ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${
                        product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.trend === 'up' ? '+15%' : '-8%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Sales Chart (Simple visualization) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">מכירות חודשיות</h3>
          <div className="space-y-4">
            {monthlySales.map((data) => (
              <div key={data.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{data.sales} מכירות</span>
                    <span className="font-bold text-gray-900">₪{data.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all"
                    style={{ width: `${(data.revenue / 80000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

