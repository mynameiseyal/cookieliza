// This is a Next.js client component for the shopping cart page
'use client';

import { useCartStore } from '../store/cart';
import { useOrdersStore } from '@/lib/orders';
import { createPaymentProvider } from '@/lib/payment/providers';
import type { CreditCardData } from '@/lib/payment/types';
import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreditCardForm from '@/components/CreditCardForm';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrdersStore();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardData, setCardData] = useState<CreditCardData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

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

  const handleNextStep = () => {
    // Validate customer details
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast.error('אנא מלא את כל השדות הנדרשים');
      return;
    }
    setCheckoutStep('payment');
  };

  const handleBackToDetails = () => {
    setCheckoutStep('details');
  };

  const handleSkipPayment = async () => {
    // For testing only - skip payment validation
    setIsSubmitting(true);

    try {
      // Create order without payment
      const order = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        },
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.instagramPostId,
        })),
        total: getTotalPrice(),
        notes: formData.notes || undefined,
        payment: {
          method: {
            provider: 'test' as const,
            type: 'credit_card' as const,
            last4: '0000',
            brand: 'Test',
          },
          transactionId: `SKIP-${Date.now()}`,
          paidAt: new Date().toISOString(),
        },
      };

      addOrder(order);
      clearCart();
      setIsSubmitting(false);
      setShowCheckout(false);
      setCheckoutStep('details');
      
      toast.success('🎉 הזמנה נוצרה ללא תשלום (מצב בדיקה)');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
      });
      setCardData(null);

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ אירעה שגיאה');
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardData) {
      toast.error('אנא מלא את פרטי כרטיס האשראי');
      return;
    }

    setIsSubmitting(true);

    try {
      // Process payment using test provider
      const paymentProvider = createPaymentProvider('test');
      
      const paymentRequest = {
        amount: getTotalPrice(),
        currency: 'ILS',
        orderId: `temp-${Date.now()}`,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        paymentMethod: {
          provider: 'test' as const,
          type: 'credit_card' as const,
          last4: cardData.cardNumber.slice(-4),
          brand: cardData.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        },
        cardData,
      };

      const paymentResponse = await paymentProvider.processPayment(paymentRequest);

      if (!paymentResponse.success) {
        toast.error(`❌ תשלום נכשל: ${paymentResponse.error}`);
        setIsSubmitting(false);
        return;
      }

      // Payment successful - create order
      const order = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        },
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.instagramPostId,
        })),
        total: getTotalPrice(),
        notes: formData.notes || undefined,
        payment: {
          method: paymentRequest.paymentMethod,
          transactionId: paymentResponse.transactionId,
          paidAt: paymentResponse.timestamp,
        },
      };

      addOrder(order);
      clearCart();
      setIsSubmitting(false);
      setShowCheckout(false);
      setCheckoutStep('details');
      
      toast.success('🎉 התשלום בוצע בהצלחה! ההזמנה נקלטה במערכת.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
      });
      setCardData(null);

      // Redirect to home after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('❌ אירעה שגיאה בעיבוד התשלום. נסה שוב.');
      setIsSubmitting(false);
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
                
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-white text-pink-600 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all transform hover:scale-105 shadow-lg font-bold text-base sm:text-lg"
                >
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

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4" onClick={() => !isSubmitting && setShowCheckout(false)}>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} dir="rtl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl sm:rounded-t-3xl z-10">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {checkoutStep === 'details' ? 'השלמת הזמנה' : 'פרטי תשלום'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                    שלב {checkoutStep === 'details' ? '1' : '2'} מתוך 2
                  </p>
                </div>
                <button
                  onClick={() => !isSubmitting && setShowCheckout(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  disabled={isSubmitting}
                  aria-label="סגור"
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </button>
              </div>

              <form onSubmit={checkoutStep === 'details' ? (e) => { e.preventDefault(); handleNextStep(); } : handleCheckout} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {checkoutStep === 'details' ? (
                  <>
                    {/* Customer Information */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">פרטי איש קשר</h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      שם מלא <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border-2 border-gray-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all placeholder:text-gray-600"
                      placeholder="שם פרטי ומשפחה"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      טלפון <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border-2 border-gray-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all placeholder:text-gray-600"
                      placeholder="050-123-4567"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      אימייל <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border-2 border-gray-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all placeholder:text-gray-600"
                      placeholder="example@email.com"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      כתובת למשלוח <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border-2 border-gray-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all placeholder:text-gray-600"
                      placeholder="רחוב, מספר, עיר"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      הערות (אופציונלי)
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border-2 border-gray-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all resize-none placeholder:text-gray-600"
                      placeholder="הקדשה, הוראות מיוחדות למשלוח..."
                      disabled={isSubmitting}
                    />
                    </div>
                  </div>
                    
                  {/* Next Button */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      disabled={isSubmitting}
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      ביטול
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      המשך לתשלום →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Payment Step */}
                  <CreditCardForm 
                      onCardDataChange={setCardData}
                      isSubmitting={isSubmitting}
                    />
                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">סיכום הזמנה</h3>
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">{item.name} x{item.quantity}</span>
                          <span className="font-semibold text-gray-900">₪{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-300 pt-1.5 sm:pt-2 mt-1.5 sm:mt-2">
                        <div className="flex justify-between font-bold text-base sm:text-lg">
                          <span>סה&quot;כ לתשלום:</span>
                          <span className="text-pink-600">₪{getTotalPrice().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={handleBackToDetails}
                        disabled={isSubmitting}
                        className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        ← חזור
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !cardData}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        {isSubmitting ? 'מעבד תשלום...' : `שלם ₪${getTotalPrice().toFixed(2)}`}
                      </button>
                    </div>

                    {/* Skip Payment for Testing - Only in development */}
                    {process.env.NODE_ENV !== 'production' && (
                      <button
                        type="button"
                        onClick={handleSkipPayment}
                        disabled={isSubmitting}
                        className="w-full text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🧪 דלג על תשלום (מצב בדיקה)
                      </button>
                    )}

                    <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                      התשלום מאובטח ומוצפן. לא נשמור את פרטי הכרטיס שלך.
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 