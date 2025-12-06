'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useCartStore } from './store/cart';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import toast from 'react-hot-toast';

export default function Home() {
  const { addItem, getTotalItems } = useCartStore();
  
  const cakes = getProductsByCategory('cake');
  const cookies = getProductsByCategory('cookie');
  const breads = getProductsByCategory('bread');

  const handleAddToCart = (productId: string, name: string, price: number, image: string) => {
    addItem({
      id: productId,
      name,
      price,
      instagramPostId: image,
    });
    
    // Show success toast
    toast.success(`${name} נוסף לעגלה! 🎉`, {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50" dir="rtl">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        דלג לתוכן הראשי
      </a>
      
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-pink-100" role="navigation" aria-label="תפריט ראשי">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                🍪 קוקי ליזה
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <a href="#main-content" className="hidden sm:block text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors font-medium text-sm lg:text-base">בית</a>
              <a href="#cakes" className="text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors font-medium text-xs sm:text-sm lg:text-base">עוגות</a>
              <a href="#cookies" className="text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors font-medium text-xs sm:text-sm lg:text-base">עוגיות</a>
              <a href="#breads" className="text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors font-medium text-xs sm:text-sm lg:text-base">לחמים</a>
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md transition-colors" aria-label={`עגלת קניות${getTotalItems() > 0 ? ` - ${getTotalItems()} פריטים` : ' - ריקה'}`}>
                <ShoppingCartIcon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg animate-pulse" aria-label={`${getTotalItems()} פריטים בעגלה`}>
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12" role="main">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 lg:mb-16 overflow-hidden shadow-2xl animate-fade-in" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" aria-hidden="true"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-1 text-white z-10 text-center md:text-right">
              <h2 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                ברוכים הבאים לקוקי ליזה <span aria-hidden="true">🎂</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 drop-shadow-md">
                מאפים טריים שנעשו באהבה! <span aria-hidden="true">✨</span>
              </p>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8">
                עוגות מעוצבות, עוגיות פריכות ולחמים ביתיים מהתנור שלנו אליכם
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a href="#cakes" className="bg-white text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
                  הזמינו עכשיו <span aria-hidden="true">🛒</span>
                </a>
                <a href="#about" className="bg-pink-600/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-pink-600/50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all border-2 border-white/50 text-sm sm:text-base">
                  קראו עלינו
                </a>
              </div>
            </div>
            <div className="relative z-10 mt-6 md:mt-0">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl" aria-hidden="true"></div>
                <Image
                  src="/Liza.jpg"
                  alt="ליזה, הבעלים והמאפה הראשי של קוקי ליזה"
                  width={320}
                  height={320}
                  className="relative rounded-full object-cover shadow-2xl ring-4 sm:ring-8 ring-white/30 transform hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-12 sm:mb-16 scroll-mt-24" aria-labelledby="about-heading">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-8 sm:px-10 lg:px-12 py-6">
              <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
                נעים מאוד, אני ליזה ווסק
              </h2>
            </div>
            
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  ביולוגית ביום, אמא לארבעה בנים שובבים 24/7, ואופה עם אהבה לבצקים, שוקולד ולקציפה שמגיעה בדיוק למרקם הנכון – כבר יותר מ־20 שנה.
                </p>

                <div className="border-r-4 border-gray-300 pr-6 py-4 my-6">
                  <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    האמת? הכל התחיל כתחביב קטן.
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    משהו בין "נראה לי שאנסה מתכון חדש" לבין "טוב, אולי לא הייתי אמורה לאפות שלוש עוגות בשתיים בלילה".
                  </p>
                </div>

                <p className="text-base sm:text-lg">
                  אבל אז החברים ביקשו, אחריהם החברים של החברים, ובשלב מסוים גם אנשים שאני אפילו לא מכירה - ואז הבנתי שמשהו טוב קורה כאן.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 sm:p-8 my-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    מה חשוב לי?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">שיהיה טעים באמת</p>
                        <p className="text-sm sm:text-base text-gray-600">בלי קיצורי דרך ובלי פשרות</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">שיהיה יפה</p>
                        <p className="text-sm sm:text-base text-gray-600">כי קינוח טוב מתחיל בעיניים</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">שיתאים בדיוק למזמין</p>
                        <p className="text-sm sm:text-base text-gray-600">מעוגה מפוארת ועד "פשוט מתחשק לי משהו מתוק"</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    איך הגעתי לכאן?
                  </h3>
                  <p className="text-base sm:text-lg">
                    הרבה ניסוי וטעייה, מאות מתכונים, כמות לא הגיונית של קמח על הרצפה, ובקשות בלתי-נגמרות להפוך את כל זה למשהו רשמי.
                    אז הנה אני – עם אתר, עם אהבה גדולה, ועם מטרה אחת: להפוך כל אירוע (או יום שלישי רגיל) למתוק ושמח יותר.
                  </p>
                </div>

                <div className="border-t border-b border-gray-200 py-8 my-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
                    ואם תשאלו אותי
                  </h3>
                  <p className="text-base sm:text-lg text-center text-gray-700 leading-relaxed">
                    אפייה היא לא רק מתכון.<br />
                    היא רגש, היא יצירתיות, והיא נגיעה קטנה של קסם שעוברת מביס לביס.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                    המסע המתוק־מלוח שלכם מתחיל כאן.
                  </p>
                  <a href="#cakes" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-colors shadow-md">
                    התחילו להזמין עכשיו
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cakes Section */}
        <section id="cakes" className="mb-12 sm:mb-16 scroll-mt-24" aria-labelledby="cakes-heading">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 id="cakes-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              <span aria-hidden="true">🎂</span> עוגות שלנו
            </h2>
            <div className="h-1 flex-1 mx-4 sm:mx-8 bg-gradient-to-r from-pink-200 to-transparent rounded-full" aria-hidden="true"></div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0" role="list" aria-label="רשימת עוגות">
              <div className="flex gap-4 sm:gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                {cakes.map((product) => (
                  <article key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 sm:w-72 flex-shrink-0 card-hover border border-pink-100" role="listitem">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} - ${product.description} במחיר ${product.price} שקלים`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.badge && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg" aria-label={`מוצר ${product.badge}`}>
                          {product.badge} <span aria-hidden="true">✨</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          <span className="sr-only">מחיר: </span>₪{product.price.toFixed(2)}
                        </p>
                        <button 
                          onClick={() => handleAddToCart(product.id, product.name, product.price, product.image)}
                          className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transform hover:scale-105 shadow-md font-medium text-sm sm:text-base"
                          aria-label={`הוסף ${product.name} לעגלה במחיר ${product.price} שקלים`}
                        >
                          הוסף לעגלה +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section id="cookies" className="mb-12 sm:mb-16 scroll-mt-24" aria-labelledby="cookies-heading">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 id="cookies-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              <span aria-hidden="true">🍪</span> עוגיות שלנו
            </h2>
            <div className="h-1 flex-1 mx-4 sm:mx-8 bg-gradient-to-r from-amber-200 to-transparent rounded-full" aria-hidden="true"></div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0" role="list" aria-label="רשימת עוגיות">
              <div className="flex gap-4 sm:gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                {cookies.map((product) => (
                  <article key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 sm:w-72 flex-shrink-0 card-hover border border-amber-100" role="listitem">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} - ${product.description} במחיר ${product.price} שקלים ${product.unit || ''}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.badge && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg" aria-label={`מוצר ${product.badge}`}>
                          {product.badge} <span aria-hidden="true">🔥</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          <span className="sr-only">מחיר: </span>₪{product.price.toFixed(2)}
                          {product.unit && <span className="text-xs sm:text-sm text-gray-500 font-normal">/{product.unit}</span>}
                        </p>
                        <button 
                          onClick={() => handleAddToCart(product.id, product.name, product.price, product.image)}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all transform hover:scale-105 shadow-md font-medium text-sm sm:text-base"
                          aria-label={`הוסף ${product.name} לעגלה במחיר ${product.price} שקלים ${product.unit || ''}`}
                        >
                          הוסף לעגלה +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Breads Section */}
        <section id="breads" className="mb-12 sm:mb-16 scroll-mt-24" aria-labelledby="breads-heading">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 id="breads-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
              <span aria-hidden="true">🍞</span> לחמים שלנו
            </h2>
            <div className="h-1 flex-1 mx-4 sm:mx-8 bg-gradient-to-r from-yellow-200 to-transparent rounded-full" aria-hidden="true"></div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0" role="list" aria-label="רשימת לחמים">
              <div className="flex gap-4 sm:gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                {breads.map((product) => (
                  <article key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 sm:w-72 flex-shrink-0 card-hover border border-yellow-100" role="listitem">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} - ${product.description} במחיר ${product.price} שקלים ${product.unit || ''}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.badge && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg" aria-label={product.badge}>
                          {product.badge} <span aria-hidden="true">🔥</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
                          <span className="sr-only">מחיר: </span>₪{product.price.toFixed(2)}
                          {product.unit && <span className="text-xs sm:text-sm text-gray-500 font-normal">/{product.unit}</span>}
                        </p>
                        <button 
                          onClick={() => handleAddToCart(product.id, product.name, product.price, product.image)}
                          className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-yellow-700 hover:to-amber-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all transform hover:scale-105 shadow-md font-medium text-sm sm:text-base"
                          aria-label={`הוסף ${product.name} לעגלה במחיר ${product.price} שקלים ${product.unit || ''}`}
                        >
                          הוסף לעגלה +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mt-12 sm:mt-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="text-center sm:text-right">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                <span aria-hidden="true">🍪</span> קוקי ליזה
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                מאפים טריים שנעשו באהבה מ-2010
              </p>
            </div>
            <nav className="text-center sm:text-right" aria-label="קישורים מהירים">
              <h4 className="text-white font-bold mb-4 text-base sm:text-lg">קישורים מהירים</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><a href="#cakes" className="text-gray-400 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded transition-colors">עוגות</a></li>
                <li><a href="#cookies" className="text-gray-400 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded transition-colors">עוגיות</a></li>
                <li><a href="#breads" className="text-gray-400 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded transition-colors">לחמים</a></li>
                <li><a href="/cart" className="text-gray-400 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded transition-colors">עגלת קניות</a></li>
              </ul>
            </nav>
            <address className="text-center sm:text-right sm:col-span-2 lg:col-span-1 not-italic">
              <h4 className="text-white font-bold mb-4 text-base sm:text-lg">צרו קשר</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="tel:+972501234567" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded transition-colors"><span aria-hidden="true">📞</span> טלפון: 050-123-4567</a></li>
                <li><a href="mailto:info@cookieliza.co.il" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded transition-colors"><span aria-hidden="true">📧</span> מייל: info@cookieliza.co.il</a></li>
                <li><span aria-hidden="true">📍</span> כתובת: תל אביב, ישראל</li>
              </ul>
            </address>
          </div>
          <div className="border-t border-gray-700 pt-6 sm:pt-8">
            <p className="text-center text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} קוקי ליזה. כל הזכויות שמורות. <span aria-hidden="true">✨</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
