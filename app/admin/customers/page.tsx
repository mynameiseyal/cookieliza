'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrdersStore, getCustomersFromOrders } from '@/lib/orders';
import Link from 'next/link';
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Get real customers from orders
  const allOrders = getAllOrders();
  const customers = getCustomersFromOrders(allOrders);

  const filteredCustomers = customers.filter(customer =>
    customer.name.includes(searchQuery) ||
    customer.email.includes(searchQuery) ||
    customer.phone.includes(searchQuery)
  );

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ניהול לקוחות</h2>
          <p className="text-gray-600">צפה במידע על הלקוחות שלך</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="חפש לקוח לפי שם, מייל או טלפון..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
          />
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">סך הכל לקוחות</p>
            <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">לקוחות פעילים</p>
            <p className="text-3xl font-bold text-green-600">
              {customers.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">סה&quot;כ הכנסות</p>
            <p className="text-3xl font-bold text-pink-600">
              ₪{totalRevenue.toLocaleString('he-IL', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="h-10 w-10 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status === 'active' ? 'פעיל' : 'לא פעיל'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{customer.address}</span>
                </div>
              </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">{customer.totalOrders}</p>
                    <p className="text-xs text-gray-600">הזמנות</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">₪{customer.totalSpent.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-600">סה&quot;כ רכישות</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(customer.lastOrderDate).toLocaleDateString('he-IL')}
                    </p>
                    <p className="text-xs text-gray-600">הזמנה אחרונה</p>
                  </div>
                </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">לא נמצאו לקוחות</p>
          </div>
        )}
      </main>
    </div>
  );
}

