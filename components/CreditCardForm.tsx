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
      setCardData(prev => {
        const newData = { ...prev, cardNumber: cleaned };
        
        // Validate on blur or when complete
        if (cleaned.length >= 13) {
          const isValid = validateCardNumber(cleaned);
          setErrors(prev => ({ ...prev, cardNumber: isValid ? '' : 'מספר כרטיס לא תקין' }));
          // Use newData which has the updated values
          updateParent(newData, isValid && !errors.cardholderName && !errors.expiry && !errors.cvv);
        } else {
          setErrors(prev => ({ ...prev, cardNumber: '' }));
          updateParent(null, false);
        }
        
        return newData;
      });
    }
  };

  const handleCardholderChange = (value: string) => {
    // Allow letters (English and Hebrew), spaces, and common punctuation
    const cleaned = value.replace(/[^a-zA-Z\u0590-\u05FF\s'-]/g, '');
    setCardData(prev => {
      const newData = { ...prev, cardholderName: cleaned };
      
      const isValid = cleaned.trim().length >= 3;
      setErrors(prev => ({ ...prev, cardholderName: isValid ? '' : 'שם בעל הכרטיס חייב להכיל לפחות 3 תווים' }));
      // Use newData which has the updated values
      updateParent(newData, isValid && validateCardNumber(newData.cardNumber) && !errors.expiry && !errors.cvv);
      
      return newData;
    });
  };

  const handleExpiryChange = (field: 'month' | 'year', value: string) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (field === 'month' && cleaned.length <= 2) {
      let month = cleaned;
      
      // Auto-format: if user types 2-9 as first digit, prepend 0
      if (cleaned.length === 1 && parseInt(cleaned) > 1) {
        month = '0' + cleaned;
      } else if (cleaned.length === 2) {
        month = Math.min(parseInt(cleaned), 12).toString().padStart(2, '0');
      }
      
      setCardData(prev => {
        const newData = { ...prev, expiryMonth: month };
        
        // Auto-focus year field when month is complete
        if (month.length === 2) {
          document.getElementById('expiryYear')?.focus();
        }
        
        // Validate if both month and year are present
        if (month && month.length === 2 && newData.expiryYear) {
          const isValid = validateExpiryDate(month, newData.expiryYear);
          setErrors(prev => ({ ...prev, expiry: isValid ? '' : 'תוקף כרטיס פג' }));
          updateParent(newData, isValid && validateCardNumber(newData.cardNumber) && !errors.cardholderName && !errors.cvv);
        } else {
          setErrors(prev => ({ ...prev, expiry: '' }));
        }
        
        return newData;
      });
    } else if (field === 'year' && cleaned.length <= 2) {
      setCardData(prev => {
        const newData = { ...prev, expiryYear: cleaned };
        
        // Validate if both month and year are present
        if (cleaned.length === 2 && newData.expiryMonth) {
          const isValid = validateExpiryDate(newData.expiryMonth, cleaned);
          setErrors(prev => ({ ...prev, expiry: isValid ? '' : 'תוקף כרטיס פג' }));
          updateParent(newData, isValid && validateCardNumber(newData.cardNumber) && !errors.cardholderName && !errors.cvv);
        }
        
        return newData;
      });
    }
  };

  const handleCVVChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCardData(prev => {
        const newData = { ...prev, cvv: cleaned };
        
        if (cleaned.length >= 3) {
          const isValid = validateCVV(cleaned);
          setErrors(prev => ({ ...prev, cvv: isValid ? '' : 'CVV לא תקין' }));
          updateParent(newData, isValid && validateCardNumber(newData.cardNumber) && !errors.cardholderName && !errors.expiry);
        } else {
          setErrors(prev => ({ ...prev, cvv: '' }));
          updateParent(null, false);
        }
        
        return newData;
      });
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
          <label htmlFor="expiryMonth" className="block text-sm font-semibold text-gray-900 mb-2">
            תוקף <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              id="expiryMonth"
              placeholder="MM"
              value={cardData.expiryMonth}
              onChange={(e) => handleExpiryChange('month', e.target.value)}
              disabled={isSubmitting}
              maxLength={2}
              inputMode="numeric"
              className={`w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all text-center placeholder:text-gray-600 text-lg ${
                errors.expiry ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
              }`}
            />
            <span className="text-gray-500 text-xl font-bold">/</span>
            <input
              type="text"
              id="expiryYear"
              placeholder="YY"
              value={cardData.expiryYear}
              onChange={(e) => handleExpiryChange('year', e.target.value)}
              disabled={isSubmitting}
              maxLength={2}
              inputMode="numeric"
              className={`w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all text-center placeholder:text-gray-600 text-lg ${
                errors.expiry ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
              }`}
            />
          </div>
          {errors.expiry && <p className="text-sm text-red-600 mt-1">{errors.expiry}</p>}
          <p className="text-xs text-gray-600 mt-1">לדוגמה: 12/25</p>
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
            inputMode="numeric"
            className={`w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all text-center placeholder:text-gray-600 text-lg ${
              errors.cvv ? 'border-red-500 focus:border-red-600' : 'border-gray-400 focus:border-pink-600'
            }`}
          />
          {errors.cvv && <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>}
          <p className="text-xs text-gray-600 mt-1">3-4 ספרות</p>
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

