// This is a Next.js client component for the shopping cart page
'use client';

import { useCartStore } from '../store/cart';
import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} הוסר מהעגלה`);
  };

  const handleUpdateQuantity = (id: string, quantity: number, name: string) => {
    if (quantity === 0) {
      handleRemoveItem(id, name);
    } else {
      updateQuantity(id, quantity);
    }
  };

  if (getTotalItems() === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50" dir="rtl">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" role="main">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-pink-100">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6" aria-hidden="true">
                  <span className="text-5xl">🛒</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">העגלה שלך ריקה</h1>
              <p className="text-xl text-gray-600 mb-8">
                נראה שעוד לא הוספת מוצרים לעגלה שלך
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
              >
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                התחל לקנות
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50" dir="rtl">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12" role="main">
        <nav aria-label="ניווט דף">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors mb-4 text-sm sm:text-base"
          >
            <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            חזרה לחנות
          </Link>
        </nav>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <span aria-hidden="true">🛒</span> עגלת הקניות שלך
          </h1>
          <p className="text-gray-600 mt-2 text-base sm:text-lg" aria-live="polite">
            {getTotalItems()} מוצרים בעגלה
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <section className="lg:col-span-2" aria-labelledby="cart-items-heading">
            <h2 id="cart-items-heading" className="sr-only">פריטים בעגלה</h2>
            <ul className="bg-white rounded-2xl sm:rounded-3xl shadow-xl divide-y divide-gray-100 border border-pink-100" role="list">
              {items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 hover:bg-pink-50/50 transition-colors">
                  <article className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="relative h-20 w-20 sm:h-28 sm:w-28 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={item.instagramPostId}
                        alt={`${item.name} במחיר ${item.price} שקלים`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                      <p className="text-base sm:text-lg font-semibold text-pink-600">
                        <span className="sr-only">מחיר ליחידה: </span>₪{item.price}
                      </p>
                      
                      {/* Mobile: Quantity and Total below title */}
                      <div className="flex items-center justify-between mt-3 sm:hidden">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5" role="group" aria-label={`שינוי כמות ${item.name}`}>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                            className="p-1 text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 hover:bg-white rounded-full transition-all"
                            aria-label={`הפחת כמות של ${item.name}`}
                          >
                            <MinusIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <span className="text-base font-bold text-gray-900 min-w-[1.5rem] text-center" aria-label={`כמות: ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                            className="p-1 text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 hover:bg-white rounded-full transition-all"
                            aria-label={`הוסף כמות של ${item.name}`}
                          >
                            <PlusIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        
                        <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          <span className="sr-only">סכום כולל: </span>₪{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop: Quantity controls */}
                    <div className="hidden sm:flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2" role="group" aria-label={`שינוי כמות ${item.name}`}>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                        className="p-2 text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 hover:bg-white rounded-full transition-all"
                        aria-label={`הפחת כמות של ${item.name}`}
                      >
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center" aria-label={`כמות: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                        className="p-2 text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 hover:bg-white rounded-full transition-all"
                        aria-label={`הוסף כמות של ${item.name}`}
                      >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    
                    {/* Desktop: Total price */}
                    <div className="hidden sm:block text-left min-w-[5rem]">
                      <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        <span className="sr-only">סכום כולל: </span>₪{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="p-2 sm:p-3 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-50 rounded-full transition-all flex-shrink-0"
                      aria-label={`הסר ${item.name} מהעגלה`}
                    >
                      <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          </section>
          
          {/* Order Summary */}
          <aside className="lg:col-span-1" aria-labelledby="order-summary-heading">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-white lg:sticky lg:top-8">
              <h2 id="order-summary-heading" className="text-xl sm:text-2xl font-bold mb-6">סיכום הזמנה <span aria-hidden="true">📋</span></h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 space-y-3" role="region" aria-label="פירוט מחירים">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-white/90">סכום ביניים</span>
                    <span className="font-bold" aria-label={`סכום ביניים: ${getTotalPrice().toFixed(2)} שקלים`}>₪{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-white/90">משלוח</span>
                    <span className="font-bold text-green-300">חינם! <span aria-hidden="true">🎉</span></span>
                  </div>
                  
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl sm:text-2xl font-bold">סה&quot;כ</span>
                      <span className="text-2xl sm:text-3xl font-bold" aria-label={`סכום כולל: ${getTotalPrice().toFixed(2)} שקלים`}>
                        ₪{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-white text-pink-600 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all transform hover:scale-105 shadow-lg font-bold text-base sm:text-lg">
                  המשך לתשלום <span aria-hidden="true">💳</span>
                </button>
                
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 text-center text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2 py-1 transition-colors font-medium text-sm sm:text-base"
                >
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  המשך לקנות
                </Link>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 mt-4 sm:mt-6" role="note" aria-label="מידע נוסף">
                  <p className="text-xs sm:text-sm text-white/80 text-center">
                    <span aria-hidden="true">✨</span> משלוח חינם על כל ההזמנות
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 text-center mt-2">
                    <span aria-hidden="true">🔒</span> תשלום מאובטח 100%
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
} 