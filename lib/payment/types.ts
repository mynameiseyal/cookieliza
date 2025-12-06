/**
 * Payment Provider Interfaces
 * 
 * This file defines the structure for integrating multiple payment providers.
 * Currently using test mode, but ready for production integrations.
 */

// Payment Provider Types
export type PaymentProvider = 'visa' | 'mastercard' | 'isracard' | 'paypal' | 'test';

// Payment Method Information
export interface PaymentMethod {
  provider: PaymentProvider;
  type: 'credit_card' | 'paypal';
  last4?: string; // Last 4 digits of card
  brand?: string; // Card brand (Visa, Mastercard, etc.)
  email?: string; // For PayPal
}

// Credit Card Data
export interface CreditCardData {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

// Payment Request
export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: PaymentMethod;
  cardData?: CreditCardData; // For credit card payments
}

// Payment Response
export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  provider: PaymentProvider;
  timestamp: string;
}

// Payment Provider Interface
export interface IPaymentProvider {
  name: PaymentProvider;
  processPayment(request: PaymentRequest): Promise<PaymentResponse>;
  validateCard?(cardData: CreditCardData): boolean;
  getPublicKey?(): string;
}

// Payment Configuration
export interface PaymentConfig {
  provider: PaymentProvider;
  enabled: boolean;
  testMode: boolean;
  apiKey?: string;
  publicKey?: string;
  merchantId?: string;
}

// Available Payment Providers Configuration
export const PAYMENT_PROVIDERS: Record<PaymentProvider, PaymentConfig> = {
  test: {
    provider: 'test',
    enabled: true,
    testMode: true,
  },
  visa: {
    provider: 'visa',
    enabled: false, // Will enable when API keys are added
    testMode: true,
    // apiKey: process.env.NEXT_PUBLIC_VISA_API_KEY,
    // publicKey: process.env.NEXT_PUBLIC_VISA_PUBLIC_KEY,
  },
  mastercard: {
    provider: 'mastercard',
    enabled: false,
    testMode: true,
    // apiKey: process.env.NEXT_PUBLIC_MASTERCARD_API_KEY,
  },
  isracard: {
    provider: 'isracard',
    enabled: false,
    testMode: true,
    // merchantId: process.env.NEXT_PUBLIC_ISRACARD_MERCHANT_ID,
    // apiKey: process.env.NEXT_PUBLIC_ISRACARD_API_KEY,
  },
  paypal: {
    provider: 'paypal',
    enabled: false,
    testMode: true,
    // Use PayPal sandbox for testing
    // apiKey: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  },
};

// Get enabled payment providers
export const getEnabledProviders = (): PaymentConfig[] => {
  return Object.values(PAYMENT_PROVIDERS).filter(config => config.enabled);
};

// Card validation helpers
export const validateCardNumber = (cardNumber: string): boolean => {
  // Luhn algorithm for card number validation
  const cleanNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleanNumber)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateExpiryDate = (month: string, year: string): boolean => {
  const now = new Date();
  const expiry = new Date(parseInt(`20${year}`), parseInt(month) - 1);
  return expiry > now;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const getCardBrand = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  // Visa
  if (/^4/.test(cleanNumber)) return 'Visa';
  
  // Mastercard
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) return 'Mastercard';
  
  // American Express
  if (/^3[47]/.test(cleanNumber)) return 'American Express';
  
  // Isracard (typically starts with 6)
  if (/^6/.test(cleanNumber)) return 'Isracard';
  
  return 'Unknown';
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, '');
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(' ');
};

