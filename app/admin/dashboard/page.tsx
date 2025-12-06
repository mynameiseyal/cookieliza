'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession, clearAdminSession } from '@/lib/auth';
import { PRODUCTS, getProductsByCategory } from '@/lib/products';
import Link from 'next/link';
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
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
  
  const totalProducts = PRODUCTS.length;
  const inStockProducts = PRODUCTS.filter(p => p.inStock).length;
  const totalRevenue = 12450.50; // Mock data
  const todayOrders = 8; // Mock data
  const monthlyOrders = 156; // Mock data

  const stats = [
    {
      name: 'הזמנות היום',
      value: todayOrders,
      icon: ShoppingBagIcon,
      change: '+12%',
      changeType: 'positive',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'הכנסות החודש',
      value: `₪${totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      change: '+23%',
      changeType: 'positive',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'מוצרים במלאי',
      value: `${inStockProducts}/${totalProducts}`,
      icon: CubeIcon,
      change: '100%',
      changeType: 'positive',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'הזמנות החודש',
      value: monthlyOrders,
      icon: ChartBarIcon,
      change: '+18%',
      changeType: 'positive',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const recentOrders = [
    { id: '1001', customer: 'שרה כהן', items: 3, total: 349.70, status: 'completed', time: '10:30' },
    { id: '1002', customer: 'דוד לוי', items: 2, total: 189.80, status: 'pending', time: '11:15' },
    { id: '1003', customer: 'רחל אברהם', items: 5, total: 524.50, status: 'completed', time: '12:00' },
    { id: '1004', customer: 'יוסי מזרחי', items: 1, total: 159.90, status: 'processing', time: '13:45' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                🍪 פאנל ניהול - קוקי ליזה
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium"
                target="_blank"
              >
                צפה באתר
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                התנתק
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">שלום, מנהל! 👋</h2>
          <p className="text-gray-600">הנה סקירה כללית של העסק שלך היום</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">הזמנות אחרונות</h3>
              <Link
                href="/admin/orders"
                className="text-pink-600 hover:text-pink-700 text-sm font-medium"
              >
                צפה בהכל ←
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-gray-900">#{order.id}</p>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status === 'completed' ? 'הושלם' : 
                         order.status === 'processing' ? 'בטיפול' : 'ממתין'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer} • {order.items} פריטים</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">₪{order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Stock Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">סטטוס מלאי</h3>
              <Link
                href="/admin/products"
                className="text-pink-600 hover:text-pink-700 text-sm font-medium"
              >
                נהל מוצרים ←
              </Link>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-pink-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">🎂 עוגות</span>
                  <span className="font-bold text-pink-600">{cakes.length} מוצרים</span>
                </div>
                <div className="w-full bg-pink-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">🍪 עוגיות</span>
                  <span className="font-bold text-amber-600">{cookies.length} מוצרים</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">🍞 לחמים</span>
                  <span className="font-bold text-yellow-600">{breads.length} מוצרים</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">פעולות מהירות</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 rounded-xl group-hover:bg-pink-200 transition-colors">
                  <CubeIcon className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">מוצרים</p>
                  <p className="text-sm text-gray-600">נהל קטלוג</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">הזמנות</p>
                  <p className="text-sm text-gray-600">צפה וטפל</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">אנליטיקס</p>
                  <p className="text-sm text-gray-600">דוחות ונתונים</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/customers"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <UsersIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">לקוחות</p>
                  <p className="text-sm text-gray-600">ניהול לקוחות</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

