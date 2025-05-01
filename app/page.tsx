'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useCartStore } from './store/cart';
import Link from 'next/link';

// Define the image paths for each category
const PRODUCT_IMAGES = {
  cake: [
    '/Cakes/20210327_201219.jpg',
    '/Cakes/20220617_185816.jpg',
    '/Cakes/20220925_195313.jpg',
    '/Cakes/20210115_175132.jpg',
    '/Cakes/20230714_194746.jpg',
    '/Cakes/20210316_154216.jpg',
    '/Cakes/20210115_181048.jpg',
    '/Cakes/20210219_123623.jpg',
    '/Cakes/20210327_201124.jpg',
    '/Cakes/20210327_201419.jpg',
  ],
  cookie: [
    '/Cookies/IMG-20221021-WA0059.jpg',
    '/Cookies/IMG-20221021-WA0062.jpg',
    '/Cookies/20221021_155404.jpg',
    '/Cookies/IMG-20221021-WA0070.jpg',
    '/Cookies/20210415_165628.jpg',
    '/Cookies/IMG-20221021-WA0059.jpg',
    '/Cookies/IMG-20221021-WA0062.jpg',
    '/Cookies/20221021_155404.jpg',
    '/Cookies/IMG-20221021-WA0070.jpg',
    '/Cookies/20210415_165628.jpg',
  ],
  bread: [
    '/Breads/20210720_131623.jpg',
    '/Breads/20210720_140447.jpg',
    '/Breads/20210722_082834.jpg',
    '/Breads/20210724_082425.jpg',
    '/Breads/20210724_083844.jpg',
    '/Breads/20210726_200052.jpg',
    '/Breads/20210726_200244.jpg',
    '/Breads/20210726_200638.jpg',
    '/Breads/20240127_173950.jpg',
    '/Breads/20240217_150100.jpg',
  ],
};

export default function Home() {
  const { addItem, getTotalItems } = useCartStore();

  const handleAddToCart = (type: 'cake' | 'cookie' | 'bread', index: number, price: number) => {
    const id = `${type}-${index}`;
    const name = type === 'cake' ? `עוגה ${index + 1}` : 
                type === 'cookie' ? `עוגיה ${index + 1}` : 
                `לחם ${index + 1}`;

    addItem({
      id,
      name,
      price,
      instagramPostId: PRODUCT_IMAGES[type][index], // Using the image path instead of Instagram ID
    });
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">קוקי ליזה</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">בית</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">תפריט</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">אודות</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">צור קשר</a>
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {getTotalItems()}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-pink-50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">ברוכים הבאים לקוקי ליזה</h2>
          <p className="text-lg text-gray-600">מאפים טריים שנעשו באהבה!</p>
        </section>

        {/* Cakes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">עוגות שלנו</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
                {[...Array(10)].map((_, i) => {
                  const price = 159.90 + i * 10;
                  return (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex-shrink-0">
                      <div className="relative h-48">
                        <Image
                          src={PRODUCT_IMAGES.cake[i]}
                          alt={`עוגה ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">עוגה {i + 1}</h3>
                        <p className="text-gray-600">עוגה טעימה ומתוקה</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">₪{price}</p>
                        <button 
                          onClick={() => handleAddToCart('cake', i, price)}
                          className="mt-2 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
                        >
                          הוסף לעגלה
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">עוגיות שלנו</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
                {[...Array(10)].map((_, i) => {
                  const price = 44.90 + i * 5;
                  return (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex-shrink-0">
                      <div className="relative h-48">
                        <Image
                          src={PRODUCT_IMAGES.cookie[i]}
                          alt={`עוגיה ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">עוגיה {i + 1}</h3>
                        <p className="text-gray-600">עוגיה טעימה ומתוקה</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">₪{price}/תריסר</p>
                        <button 
                          onClick={() => handleAddToCart('cookie', i, price)}
                          className="mt-2 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
                        >
                          הוסף לעגלה
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Breads Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">לחמים שלנו</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
                {[...Array(10)].map((_, i) => {
                  const price = 29.90 + i * 3;
                  return (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex-shrink-0">
                      <div className="relative h-48">
                        <Image
                          src={PRODUCT_IMAGES.bread[i]}
                          alt={`לחם ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">לחם {i + 1}</h3>
                        <p className="text-gray-600">לחם טרי ואיכותי</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">₪{price}/כיכר</p>
                        <button 
                          onClick={() => handleAddToCart('bread', i, price)}
                          className="mt-2 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
                        >
                          הוסף לעגלה
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">© 2024 קוקי ליזה. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
