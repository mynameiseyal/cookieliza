// This is a Next.js client component for the shopping cart page
'use client';

import { useCartStore } from '../store/cart';
import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  if (getTotalItems() === 0) {
    return (
      <div className="min-h-screen bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">עגלת הקניות שלך</h1>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">העגלה שלך ריקה</p>
            <Link 
              href="/"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700"
            >
              המשך לקנות
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">עגלת הקניות שלך</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex items-center">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.instagramPostId}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 mr-4">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500">₪{item.price}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="mx-2 text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">
                      ₪{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">סיכום הזמנה</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">סכום ביניים</span>
                  <span className="text-gray-900">₪{getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">משלוח</span>
                  <span className="text-gray-900">₪0.00</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">סה&quot;כ</span>
                    <span className="text-lg font-medium text-gray-900">
                      ₪{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700">
                  המשך לתשלום
                </button>
                
                <Link
                  href="/"
                  className="block text-center text-pink-600 hover:text-pink-700"
                >
                  המשך לקנות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 