/**
 * Test Payment Provider
 * 
 * This is a mock payment provider for testing and development.
 * It simulates payment processing without charging real money.
 * 
 * Test Cards:
 * - Success: 4111 1111 1111 1111 (Visa)
 * - Success: 5500 0000 0000 0004 (Mastercard)
 * - Decline: 4000 0000 0000 0002
 * - Insufficient Funds: 4000 0000 0000 9995
 */

import type {
  IPaymentProvider,
  PaymentRequest,
  PaymentResponse,
  CreditCardData,
  PaymentProvider,
} from './types';
import { validateCardNumber, validateCVV, validateExpiryDate } from './types';

export class TestPaymentProvider implements IPaymentProvider {
  name: PaymentProvider = 'test';

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate card if provided
    if (request.cardData) {
      const isValid = this.validateCard(request.cardData);
      if (!isValid) {
        return {
          success: false,
          error: 'כרטיס אשראי לא תקין',
          provider: this.name,
          timestamp: new Date().toISOString(),
        };
      }

      // Test specific card numbers
      const cardNumber = request.cardData.cardNumber.replace(/\s/g, '');
      
      // Decline card
      if (cardNumber === '4000000000000002') {
        return {
          success: false,
          error: 'כרטיס נדחה על ידי המנפיק',
          provider: this.name,
          timestamp: new Date().toISOString(),
        };
      }

      // Insufficient funds
      if (cardNumber === '4000000000009995') {
        return {
          success: false,
          error: 'יתרה לא מספקת',
          provider: this.name,
          timestamp: new Date().toISOString(),
        };
      }
    }

    // Success - generate mock transaction ID
    const transactionId = `TEST-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return {
      success: true,
      transactionId,
      provider: this.name,
      timestamp: new Date().toISOString(),
    };
  }

  validateCard(cardData: CreditCardData): boolean {
    // Validate card number
    if (!validateCardNumber(cardData.cardNumber)) {
      return false;
    }

    // Validate expiry date
    if (!validateExpiryDate(cardData.expiryMonth, cardData.expiryYear)) {
      return false;
    }

    // Validate CVV
    if (!validateCVV(cardData.cvv)) {
      return false;
    }

    // Validate cardholder name
    if (!cardData.cardholderName || cardData.cardholderName.trim().length < 3) {
      return false;
    }

    return true;
  }

  getPublicKey(): string {
    return 'TEST_PUBLIC_KEY';
  }
}

/**
 * Placeholder for Real Payment Providers
 * These will be implemented when integrating with actual APIs
 */

// Visa/Mastercard (typically through Stripe or similar)
export class StripePaymentProvider implements IPaymentProvider {
  name: PaymentProvider = 'visa';

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // TODO: Implement Stripe integration
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({...});
    
    throw new Error('Stripe integration not yet implemented. Use test provider.');
  }

  validateCard(cardData: CreditCardData): boolean {
    return validateCardNumber(cardData.cardNumber);
  }
}

// Isracard
export class IsracardPaymentProvider implements IPaymentProvider {
  name: PaymentProvider = 'isracard';

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // TODO: Implement Isracard integration
    // Documentation: https://www.isracard.co.il/business/online-payment
    
    throw new Error('Isracard integration not yet implemented. Use test provider.');
  }

  validateCard(cardData: CreditCardData): boolean {
    return validateCardNumber(cardData.cardNumber);
  }
}

// PayPal
export class PayPalPaymentProvider implements IPaymentProvider {
  name: PaymentProvider = 'paypal';

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // TODO: Implement PayPal integration
    // const paypal = require('@paypal/checkout-server-sdk');
    // Documentation: https://developer.paypal.com/docs/checkout/
    
    throw new Error('PayPal integration not yet implemented. Use test provider.');
  }
}

// Payment Provider Factory
export const createPaymentProvider = (provider: PaymentProvider): IPaymentProvider => {
  switch (provider) {
    case 'test':
      return new TestPaymentProvider();
    case 'visa':
    case 'mastercard':
      return new StripePaymentProvider();
    case 'isracard':
      return new IsracardPaymentProvider();
    case 'paypal':
      return new PayPalPaymentProvider();
    default:
      return new TestPaymentProvider();
  }
};

