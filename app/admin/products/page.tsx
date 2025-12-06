'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCTS, Product } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'cake' | 'cookie' | 'bread'>('all');
  const router = useRouter();

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

  // Filter products
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.includes(searchQuery) || 
                         product.description.includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Product) => {
    toast.success(`עריכת ${product.name} (בפיתוח)`);
  };

  const handleDelete = (product: Product) => {
    toast.error(`מחיקת ${product.name} (בפיתוח)`);
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">ניהול מוצרים</h2>
              <p className="text-gray-600">נהל את הקטלוג של המאפייה</p>
            </div>
            <button
              onClick={() => toast.success('הוספת מוצר חדש (בפיתוח)')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              <PlusIcon className="h-5 w-5" />
              הוסף מוצר
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="חפש מוצרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
              >
                <option value="all">כל הקטגוריות</option>
                <option value="cake">עוגות</option>
                <option value="cookie">עוגיות</option>
                <option value="bread">לחמים</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">תמונה</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">שם</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">קטגוריה</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">מחיר</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">סטטוס</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-pink-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        product.category === 'cake' ? 'bg-pink-100 text-pink-800' :
                        product.category === 'cookie' ? 'bg-amber-100 text-amber-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.category === 'cake' ? '🎂 עוגה' :
                         product.category === 'cookie' ? '🍪 עוגיה' :
                         '🍞 לחם'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">₪{product.price.toFixed(2)}</p>
                      {product.unit && <p className="text-sm text-gray-500">{product.unit}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'במלאי' : 'אזל'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="ערוך"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="מחק"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">לא נמצאו מוצרים</p>
          </div>
        )}
      </main>
    </div>
  );
}

