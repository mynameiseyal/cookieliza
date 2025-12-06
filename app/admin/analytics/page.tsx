'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProductsByCategory, PRODUCTS } from '@/lib/products';
import { useOrdersStore } from '@/lib/orders';
import Link from 'next/link';
import {
  ArrowRightOnRectangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function AdminAnalytics() {
  const router = useRouter();
  const { getAllOrders } = useOrdersStore();

  const handleLogout = async () => {
    try {
      // Call logout API to clear HTTP-only cookie
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      toast.success('התנתקת בהצלחה');
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin');
    }
  };

  const cakes = getProductsByCategory('cake');
  const cookies = getProductsByCategory('cookie');
  const breads = getProductsByCategory('bread');

  // Calculate real analytics from orders
  const allOrders = getAllOrders();
  
  // Calculate revenue by category
  const categoryRevenue = {
    cake: 0,
    cookie: 0,
    bread: 0,
  };

  allOrders.forEach(order => {
    if (order.status !== 'cancelled') {
      order.items.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (product) {
          categoryRevenue[product.category] += item.price * item.quantity;
        }
      });
    }
  });

  // Calculate top products
  const productSales: Record<string, { name: string; sales: number; revenue: number }> = {};
  
  allOrders.forEach(order => {
    if (order.status !== 'cancelled') {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            sales: 0,
            revenue: 0,
          };
        }
        productSales[item.productId].sales += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    }
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map(product => ({
      ...product,
      trend: 'up' as const, // Can be enhanced with historical data
    }));

  // Calculate monthly sales (last 6 months)
  const monthlySales = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthOrders = allOrders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getMonth() === date.getMonth() && 
             orderDate.getFullYear() === date.getFullYear() &&
             order.status !== 'cancelled';
    });
    
    return {
      month: date.toLocaleDateString('he-IL', { month: 'long' }),
      sales: monthOrders.length,
      revenue: monthOrders.reduce((sum, order) => sum + order.total, 0),
    };
  });

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
                <p className="text-sm">מכירות החודש: ₪{categoryRevenue.cake.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>
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
                <p className="text-sm">מכירות החודש: ₪{categoryRevenue.cookie.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>
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
                <p className="text-sm">מכירות החודש: ₪{categoryRevenue.bread.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">המוצרים הנמכרים ביותר</h3>
          {topProducts.length > 0 ? (
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
                      <p className="font-bold text-gray-900">₪{product.revenue.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>
                      <div className="flex items-center gap-1">
                        {product.trend === 'up' ? (
                          <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${
                          product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.trend === 'up' ? 'פופולרי' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">אין עדיין נתוני מכירות</p>
          )}
        </div>

        {/* Monthly Sales Chart (Simple visualization) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">מכירות חודשיות</h3>
          {monthlySales.some(m => m.sales > 0) ? (
            <div className="space-y-4">
              {monthlySales.map((data) => (
                <div key={data.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{data.sales} מכירות</span>
                      <span className="font-bold text-gray-900">₪{data.revenue.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: data.revenue > 0 ? `${Math.min((data.revenue / Math.max(...monthlySales.map(m => m.revenue))) * 100, 100)}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">אין עדיין נתוני מכירות חודשיים</p>
          )}
        </div>
      </main>
    </div>
  );
}

