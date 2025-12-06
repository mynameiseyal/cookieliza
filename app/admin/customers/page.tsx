'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession, clearAdminSession } from '@/lib/auth';
import Link from 'next/link';
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
}

export default function AdminCustomers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Mock customer data
  const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'שרה כהן',
      email: 'sarah@example.com',
      phone: '052-1234567',
      address: 'רחוב הרצל 45, תל אביב',
      totalOrders: 12,
      totalSpent: 3450.80,
      lastOrderDate: '2025-12-06',
      status: 'active',
    },
    {
      id: '2',
      name: 'דוד לוי',
      email: 'david@example.com',
      phone: '054-9876543',
      address: 'שדרות ירושלים 12, חיפה',
      totalOrders: 8,
      totalSpent: 1890.50,
      lastOrderDate: '2025-12-05',
      status: 'active',
    },
    {
      id: '3',
      name: 'רחל אברהם',
      email: 'rachel@example.com',
      phone: '050-5555555',
      address: 'רחוב דיזנגוף 100, תל אביב',
      totalOrders: 25,
      totalSpent: 7250.90,
      lastOrderDate: '2025-12-06',
      status: 'active',
    },
    {
      id: '4',
      name: 'יוסי מזרחי',
      email: 'yossi@example.com',
      phone: '053-7777777',
      address: 'רחוב אלנבי 25, תל אביב',
      totalOrders: 5,
      totalSpent: 1120.40,
      lastOrderDate: '2025-11-28',
      status: 'inactive',
    },
  ];

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.includes(searchQuery) ||
    customer.email.includes(searchQuery) ||
    customer.phone.includes(searchQuery)
  );

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
            <p className="text-3xl font-bold text-gray-900">{mockCustomers.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">לקוחות פעילים</p>
            <p className="text-3xl font-bold text-green-600">
              {mockCustomers.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">סה&quot;כ הכנסות</p>
            <p className="text-3xl font-bold text-pink-600">
              ₪{mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
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
                  <p className="text-2xl font-bold text-purple-600">₪{customer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">סה&quot;כ רכישות</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{customer.lastOrderDate}</p>
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

