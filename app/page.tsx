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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50" dir="rtl">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                🍪 קוקי ליזה
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">בית</a>
              <a href="#cakes" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">עוגות</a>
              <a href="#cookies" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">עוגיות</a>
              <a href="#breads" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">לחמים</a>
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors">
                <ShoppingCartIcon className="h-7 w-7" />
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 rounded-3xl p-12 mb-16 overflow-hidden shadow-2xl animate-fade-in">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white z-10">
              <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
                ברוכים הבאים לקוקי ליזה 🎂
              </h2>
              <p className="text-2xl mb-6 drop-shadow-md">
                מאפים טריים שנעשו באהבה! ✨
              </p>
              <p className="text-lg opacity-90 mb-8">
                עוגות מעוצבות, עוגיות פריכות ולחמים ביתיים מהתנור שלנו אליכם
              </p>
              <div className="flex gap-4">
                <a href="#cakes" className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg">
                  הזמינו עכשיו 🛒
                </a>
                <a href="#about" className="bg-pink-600/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600/50 transition-all border-2 border-white/50">
                  קראו עלינו
                </a>
              </div>
            </div>
            <div className="relative z-10">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
                <Image
                  src="/Liza.jpg"
                  alt="Liza"
                  width={320}
                  height={320}
                  className="relative rounded-full object-cover shadow-2xl ring-8 ring-white/30 transform hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cakes Section */}
        <section id="cakes" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              🎂 עוגות שלנו
            </h2>
            <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-pink-200 to-transparent rounded-full"></div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                {[...Array(10)].map((_, i) => {
                  const price = 159.90 + i * 10;
                  return (
                    <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 flex-shrink-0 card-hover border border-pink-100">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={PRODUCT_IMAGES.cake[i]}
                          alt={`עוגה ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          חדש ✨
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">עוגה {i + 1}</h3>
                        <p className="text-gray-600 mb-4">עוגה טעימה ומתוקה מיוצרת באהבה</p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            ₪{price}
                          </p>
                          <button 
                            onClick={() => handleAddToCart('cake', i, price)}
                            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-md font-medium"
                          >
                            הוסף לעגלה +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section id="cookies" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              🍪 עוגיות שלנו
            </h2>
            <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-amber-200 to-transparent rounded-full"></div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                {[...Array(10)].map((_, i) => {
                  const price = 44.90 + i * 5;
                  return (
                    <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 flex-shrink-0 card-hover border border-amber-100">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={PRODUCT_IMAGES.cookie[i]}
                          alt={`עוגיה ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          פופולרי 🔥
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">עוגיה {i + 1}</h3>
                        <p className="text-gray-600 mb-4">עוגיה פריכה ומתוקה בדיוק כמו שצריך</p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            ₪{price}
                            <span className="text-sm text-gray-500 font-normal">/תריסר</span>
                          </p>
                          <button 
                            onClick={() => handleAddToCart('cookie', i, price)}
                            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md font-medium"
                          >
                            הוסף לעגלה +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Breads Section */}
        <section id="breads" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
              🍞 לחמים שלנו
            </h2>
            <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-yellow-200 to-transparent rounded-full"></div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                {[...Array(10)].map((_, i) => {
                  const price = 29.90 + i * 3;
                  return (
                    <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 flex-shrink-0 card-hover border border-yellow-100">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={PRODUCT_IMAGES.bread[i]}
                          alt={`לחם ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          טרי מהתנור 🔥
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">לחם {i + 1}</h3>
                        <p className="text-gray-600 mb-4">לחם טרי ואיכותי נאפה בבוקר</p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
                            ₪{price}
                            <span className="text-sm text-gray-500 font-normal">/כיכר</span>
                          </p>
                          <button 
                            onClick={() => handleAddToCart('bread', i, price)}
                            className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-6 py-3 rounded-xl hover:from-yellow-700 hover:to-amber-700 transition-all transform hover:scale-105 shadow-md font-medium"
                          >
                            הוסף לעגלה +
                          </button>
                        </div>
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
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                🍪 קוקי ליזה
              </h3>
              <p className="text-gray-400">
                מאפים טריים שנעשו באהבה מ-2010
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">קישורים מהירים</h4>
              <ul className="space-y-2">
                <li><a href="#cakes" className="text-gray-400 hover:text-pink-400 transition-colors">עוגות</a></li>
                <li><a href="#cookies" className="text-gray-400 hover:text-pink-400 transition-colors">עוגיות</a></li>
                <li><a href="#breads" className="text-gray-400 hover:text-pink-400 transition-colors">לחמים</a></li>
                <li><a href="/cart" className="text-gray-400 hover:text-pink-400 transition-colors">עגלת קניות</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">צרו קשר</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 טלפון: 050-123-4567</li>
                <li>📧 מייל: info@cookieliza.co.il</li>
                <li>📍 כתובת: תל אביב, ישראל</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} קוקי ליזה. כל הזכויות שמורות. ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
