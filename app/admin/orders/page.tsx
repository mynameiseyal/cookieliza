'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession, clearAdminSession } from '@/lib/auth';
import { useOrdersStore } from '@/lib/orders';
import Link from 'next/link';
import {
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import type { Order } from '@/lib/orders';

export default function AdminOrders() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | Order['status']>('all');
  const router = useRouter();
  const { getAllOrders, getOrdersByStatus, updateOrderStatus } = useOrdersStore();

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

  // Get real orders
  const allOrders = getAllOrders();
  const filteredOrders = filterStatus === 'all' 
    ? allOrders 
    : getOrdersByStatus(filterStatus);

  const handleStatusChange = (orderId: string, orderNumber: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    const statusText = getStatusText(newStatus);
    toast.success(`הזמנה ${orderNumber} עודכנה ל-${statusText}`);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed': return 'הושלם';
      case 'processing': return 'בטיפול';
      case 'pending': return 'ממתין';
      case 'cancelled': return 'בוטל';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ניהול הזמנות</h2>
          <p className="text-gray-600">צפה וטפל בהזמנות הלקוחות</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === 'all'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            הכל ({allOrders.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === 'pending'
                ? 'bg-yellow-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            ממתינות ({getOrdersByStatus('pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === 'processing'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            בטיפול ({getOrdersByStatus('processing').length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === 'completed'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            הושלמו ({getOrdersByStatus('completed').length})
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.orderDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => toast.success(`פתיחת הזמנה ${order.orderNumber} (בפיתוח)`)}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <EyeIcon className="h-5 w-5" />
                  צפה בפרטים
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">פרטי לקוח:</p>
                  <p className="text-gray-900 font-medium">{order.customer.name}</p>
                  <p className="text-sm text-gray-600">{order.customer.phone}</p>
                  <p className="text-sm text-gray-600">{order.customer.email}</p>
                  <p className="text-sm text-gray-600">{order.customer.address}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">פריטים:</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-900">{item.productName} x{item.quantity}</span>
                      <span className="text-gray-600">₪{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 mt-2 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>סה&quot;כ:</span>
                      <span className="text-pink-600">₪{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">הערות:</p>
                  <p className="text-sm text-yellow-700">{order.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order.id, order.orderNumber, 'processing')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      סמן כבטיפול
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, order.orderNumber, 'cancelled')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      בטל הזמנה
                    </button>
                  </>
                )}
                {order.status === 'processing' && (
                  <button
                    onClick={() => handleStatusChange(order.id, order.orderNumber, 'completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    סמן כהושלם
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">אין הזמנות בסטטוס זה</p>
          </div>
        )}
      </main>
    </div>
  );
}

