// This is a Next.js client component for the shopping cart page
'use client';

import { useCartStore } from '../store/cart';
import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  if (getTotalItems() === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-pink-100">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6">
                  <span className="text-5xl">🛒</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">העגלה שלך ריקה</h1>
              <p className="text-xl text-gray-600 mb-8">
                נראה שעוד לא הוספת מוצרים לעגלה שלך
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
              >
                <ArrowRightIcon className="h-5 w-5" />
                התחל לקנות
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-4"
          >
            <ArrowRightIcon className="h-5 w-5" />
            חזרה לחנות
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🛒 עגלת הקניות שלך
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {getTotalItems()} מוצרים בעגלה
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl divide-y divide-gray-100 border border-pink-100">
              {items.map((item) => (
                <div key={item.id} className="p-6 hover:bg-pink-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative h-28 w-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={item.instagramPostId}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-lg font-semibold text-pink-600">₪{item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-pink-600 hover:bg-white rounded-full transition-all"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-pink-600 hover:bg-white rounded-full transition-all"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="text-left min-w-[5rem]">
                      <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₪{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      title="הסר מהעגלה"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 shadow-2xl text-white sticky top-8">
              <h2 className="text-2xl font-bold mb-6">סיכום הזמנה 📋</h2>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-white/90">סכום ביניים</span>
                    <span className="font-bold">₪{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg">
                    <span className="text-white/90">משלוח</span>
                    <span className="font-bold text-green-300">חינם! 🎉</span>
                  </div>
                  
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">סה&quot;כ</span>
                      <span className="text-3xl font-bold">
                        ₪{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-white text-pink-600 py-4 rounded-2xl hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg font-bold text-lg">
                  המשך לתשלום 💳
                </button>
                
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 text-center text-white/90 hover:text-white transition-colors font-medium"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                  המשך לקנות
                </Link>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-6">
                  <p className="text-sm text-white/80 text-center">
                    ✨ משלוח חינם על כל ההזמנות
                  </p>
                  <p className="text-sm text-white/80 text-center mt-2">
                    🔒 תשלום מאובטח 100%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 