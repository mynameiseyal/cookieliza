'use client';

import { useState } from 'react';
import { CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { formatCardNumber, getCardBrand, validateCardNumber, validateCVV, validateExpiryDate } from '@/lib/payment/types';
import type { CreditCardData } from '@/lib/payment/types';

interface CreditCardFormProps {
  onCardDataChange: (cardData: CreditCardData | null) => void;
  isSubmitting?: boolean;
}

export default function CreditCardForm({ onCardDataChange, isSubmitting = false }: CreditCardFormProps) {
  const [cardData, setCardData] = useState<CreditCardData>({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardholderName: '',
    expiry: '',
    cvv: '',
  });

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 16) {
      const formatted = formatCardNumber(cleaned);
      setCardData(prev => ({ ...prev, cardNumber: cleaned }));
      
      // Validate on blur or when complete
      if (cleaned.length >= 13) {
        const isValid = validateCardNumber(cleaned);
        setErrors(prev => ({ ...prev, cardNumber: isValid ? '' : 'מספר כרטיס לא תקין' }));
        updateParent({ ...cardData, cardNumber: cleaned }, isValid && !errors.cardholderName && !errors.expiry && !errors.cvv);
      } else {
        setErrors(prev => ({ ...prev, cardNumber: '' }));
        updateParent(null, false);
      }
    }
  };

  const handleCardholderChange = (value: string) => {
    // Allow letters (English and Hebrew), spaces, and common punctuation
    const cleaned = value.replace(/[^a-zA-Z\u0590-\u05FF\s'-]/g, '');
    setCardData(prev => ({ ...prev, cardholderName: cleaned }));
    
    const isValid = cleaned.trim().length >= 3;
    setErrors(prev => ({ ...prev, cardholderName: isValid ? '' : 'שם בעל הכרטיס חייב להכיל לפחות 3 תווים' }));
    updateParent({ ...cardData, cardholderName: cleaned }, isValid && validateCardNumber(cardData.cardNumber) && !errors.expiry && !errors.cvv);
  };

  const handleExpiryChange = (field: 'month' | 'year', value: string) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (field === 'month' && cleaned.length <= 2) {
      const month = cleaned ? Math.min(parseInt(cleaned), 12).toString().padStart(2, '0') : '';
      setCardData(prev => ({ ...prev, expiryMonth: month }));
      
      if (month && cardData.expiryYear) {
        const isValid = validateExpiryDate(month, cardData.expiryYear);
        setErrors(prev => ({ ...prev, expiry: isValid ? '' : 'תוקף כרטיס פג' }));
        updateParent({ ...cardData, expiryMonth: month }, isValid && validateCardNumber(cardData.cardNumber) && !errors.cardholderName && !errors.cvv);
      }
    } else if (field === 'year' && cleaned.length <= 2) {
      setCardData(prev => ({ ...prev, expiryYear: cleaned }));
      
      if (cleaned.length === 2 && cardData.expiryMonth) {
        const isValid = validateExpiryDate(cardData.expiryMonth, cleaned);
        setErrors(prev => ({ ...prev, expiry: isValid ? '' : 'תוקף כרטיס פג' }));
        updateParent({ ...cardData, expiryYear: cleaned }, isValid && validateCardNumber(cardData.cardNumber) && !errors.cardholderName && !errors.cvv);
      }
    }
  };

  const handleCVVChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCardData(prev => ({ ...prev, cvv: cleaned }));
      
      if (cleaned.length >= 3) {
        const isValid = validateCVV(cleaned);
        setErrors(prev => ({ ...prev, cvv: isValid ? '' : 'CVV לא תקין' }));
        updateParent({ ...cardData, cvv: cleaned }, isValid && validateCardNumber(cardData.cardNumber) && !errors.cardholderName && !errors.expiry);
      } else {
        setErrors(prev => ({ ...prev, cvv: '' }));
        updateParent(null, false);
      }
    }
  };

  const updateParent = (data: CreditCardData | null, isValid: boolean) => {
    if (isValid && data) {
      onCardDataChange(data);
    } else {
      onCardDataChange(null);
    }
  };

  const cardBrand = cardData.cardNumber ? getCardBrand(cardData.cardNumber) : '';

  return (
    <div className="space-y-4">
      {/* Security Badge */}
      <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
        <ShieldCheckIcon className="h-5 w-5" />
        <p className="text-sm font-medium">תשלום מאובטח ומוצפן</p>
      </div>

      {/* Card Number */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-900 mb-2">
          מספר כרטיס אשראי <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            value={formatCardNumber(cardData.cardNumber)}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            disabled={isSubmitting}
            className={`w-full px-4 py-3 pr-12 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all placeholder:text-gray-600 ${
              errors.cardNumber ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
            }`}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {cardBrand ? (
              <span className="text-xs font-bold text-gray-600">{cardBrand}</span>
            ) : (
              <CreditCardIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
        {errors.cardNumber && <p className="text-sm text-red-600 mt-1">{errors.cardNumber}</p>}
        <p className="text-xs text-gray-600 mt-1">לבדיקה: 4111 1111 1111 1111 (Visa)</p>
      </div>

      {/* Cardholder Name */}
      <div>
        <label htmlFor="cardholderName" className="block text-sm font-semibold text-gray-900 mb-2">
          שם בעל הכרטיס <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="cardholderName"
          value={cardData.cardholderName}
          onChange={(e) => handleCardholderChange(e.target.value)}
          placeholder="שם מלא / FULL NAME"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all placeholder:text-gray-600 ${
            errors.cardholderName ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
          }`}
        />
        {errors.cardholderName && <p className="text-sm text-red-600 mt-1">{errors.cardholderName}</p>}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry" className="block text-sm font-semibold text-gray-900 mb-2">
            תוקף <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM"
              value={cardData.expiryMonth}
              onChange={(e) => handleExpiryChange('month', e.target.value)}
              disabled={isSubmitting}
              maxLength={2}
              className={`w-full px-3 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all text-center placeholder:text-gray-600 ${
                errors.expiry ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
              }`}
            />
            <span className="text-gray-500 text-xl self-center">/</span>
            <input
              type="text"
              placeholder="YY"
              value={cardData.expiryYear}
              onChange={(e) => handleExpiryChange('year', e.target.value)}
              disabled={isSubmitting}
              maxLength={2}
              className={`w-full px-3 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all text-center placeholder:text-gray-600 ${
                errors.expiry ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
              }`}
            />
          </div>
          {errors.expiry && <p className="text-sm text-red-600 mt-1">{errors.expiry}</p>}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-semibold text-gray-900 mb-2">
            CVV <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="cvv"
            value={cardData.cvv}
            onChange={(e) => handleCVVChange(e.target.value)}
            placeholder="123"
            disabled={isSubmitting}
            maxLength={4}
            className={`w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all text-center placeholder:text-gray-600 ${
              errors.cvv ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
            }`}
          />
          {errors.cvv && <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      {/* Test Cards Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-900 mb-1">כרטיסי בדיקה:</p>
        <p className="text-xs text-blue-700">✅ הצלחה: 4111 1111 1111 1111</p>
        <p className="text-xs text-blue-700">❌ נדחה: 4000 0000 0000 0002</p>
        <p className="text-xs text-blue-700">תוקף: כל תאריך עתידי | CVV: 123</p>
      </div>
    </div>
  );
}

