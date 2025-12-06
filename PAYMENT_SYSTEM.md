# Payment System Documentation

## 🎯 Overview

The payment system is built with a modular, provider-agnostic architecture that supports multiple payment providers. Currently running in **test mode** with a mock provider, but ready for production integration.

---

## 🏗️ Architecture

### Provider Pattern
```
PaymentRequest → PaymentProvider → PaymentResponse
```

All providers implement the `IPaymentProvider` interface, making it easy to swap or add new payment methods.

---

## 💳 Supported Providers

### Currently Active:
- ✅ **Test Provider** - For development and testing

### Ready for Integration:
- 🔧 **Visa/Mastercard** (via Stripe)
- 🔧 **Isracard** (Israeli credit cards)
- 🔧 **PayPal**

---

## 🧪 Test Mode

### Test Credit Cards:

| Card Number | Brand | Result |
|------------|-------|--------|
| `4111 1111 1111 1111` | Visa | ✅ Success |
| `5500 0000 0000 0004` | Mastercard | ✅ Success |
| `4000 0000 0000 0002` | Visa | ❌ Declined |
| `4000 0000 0000 9995` | Visa | ❌ Insufficient Funds |

**Expiry**: Any future date (e.g., 12/25)  
**CVV**: Any 3-4 digits (e.g., 123)  
**Name**: Any name

---

## 📝 Usage

### Checkout Flow

1. **Customer enters shipping details** (Step 1)
2. **Customer enters payment details** (Step 2)
3. **Payment is processed** via selected provider
4. **Order is created** with payment confirmation
5. **Cart is cleared** and user is redirected

### Two-Step Process

```tsx
// Step 1: Customer Details
- Name
- Phone
- Email
- Address
- Notes (optional)

// Step 2: Payment
- Card Number (with validation)
- Cardholder Name
- Expiry Date (MM/YY)
- CVV
```

---

## 🔒 Security Features

### Current Implementation:
- ✅ Client-side card validation (Luhn algorithm)
- ✅ Expiry date validation
- ✅ CVV format validation
- ✅ Card brand detection
- ✅ No storage of full card numbers
- ✅ Only last 4 digits stored with orders

### Production Ready:
- 🔧 PCI DSS compliant structure
- 🔧 Environment variables for API keys
- 🔧 HTTPS-only requirement
- 🔧 Tokenization support
- 🔧 3D Secure ready

---

## 🔌 Integrating Real Payment Providers

### 1. Stripe (Visa/Mastercard)

**Install:**
```bash
npm install stripe @stripe/stripe-js
```

**Environment Variables:**
```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

**Update Provider:**
```typescript
// lib/payment/providers.ts
export class StripePaymentProvider implements IPaymentProvider {
  async processPayment(request: PaymentRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(request.amount * 100), // Convert to agurot
      currency: 'ils',
      payment_method_types: ['card'],
      metadata: {
        orderId: request.orderId,
      },
    });
    
    return {
      success: paymentIntent.status === 'succeeded',
      transactionId: paymentIntent.id,
      provider: this.name,
      timestamp: new Date().toISOString(),
    };
  }
}
```

**Enable in Config:**
```typescript
// lib/payment/types.ts
visa: {
  provider: 'visa',
  enabled: true, // Change to true
  testMode: false, // Use false for production
  apiKey: process.env.STRIPE_SECRET_KEY,
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
}
```

---

### 2. Isracard

**Documentation:** https://www.isracard.co.il/business/online-payment

**Environment Variables:**
```env
NEXT_PUBLIC_ISRACARD_MERCHANT_ID=your_merchant_id
ISRACARD_API_KEY=your_api_key
```

**Update Provider:**
```typescript
export class IsracardPaymentProvider implements IPaymentProvider {
  async processPayment(request: PaymentRequest) {
    // Implement Isracard API integration
    // See Isracard documentation for API details
  }
}
```

---

### 3. PayPal

**Install:**
```bash
npm install @paypal/checkout-server-sdk
```

**Environment Variables:**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
```

**Update Provider:**
```typescript
export class PayPalPaymentProvider implements IPaymentProvider {
  async processPayment(request: PaymentRequest) {
    // Implement PayPal SDK integration
    // See PayPal documentation
  }
}
```

---

## 📊 Payment Data Structure

### Order with Payment Info:
```typescript
{
  id: "order-123",
  orderNumber: "ORD-1001",
  customer: { ... },
  items: [ ... ],
  total: 249.90,
  payment: {
    method: {
      provider: "visa",
      type: "credit_card",
      last4: "1111",
      brand: "Visa"
    },
    transactionId: "ch_3ABC123",
    paidAt: "2025-12-06T14:30:00.000Z"
  }
}
```

---

## 🎨 UI Components

### CreditCardForm
Location: `components/CreditCardForm.tsx`

Features:
- Real-time card validation
- Card brand detection (Visa, Mastercard, Amex, Isracard)
- Auto-formatting (adds spaces to card number)
- Error messages in Hebrew
- WCAG AA compliant
- Disabled state during submission

Props:
```typescript
{
  onCardDataChange: (data: CreditCardData | null) => void;
  isSubmitting?: boolean;
}
```

---

## 🔧 Validation

### Card Number (Luhn Algorithm)
```typescript
validateCardNumber("4111111111111111") // true
validateCardNumber("1234567890123456") // false
```

### Expiry Date
```typescript
validateExpiryDate("12", "25") // true if future date
validateExpiryDate("01", "20") // false if past
```

### CVV
```typescript
validateCVV("123") // true
validateCVV("12")  // false
```

---

## 🚀 Testing

### Manual Testing:
1. Go to http://localhost:3000
2. Add items to cart
3. Click "המשך לתשלום"
4. Fill in customer details → Next
5. Use test card: `4111 1111 1111 1111`
6. Expiry: `12/25`, CVV: `123`
7. Click "שלם"
8. Verify order in admin panel

### Test Scenarios:
- ✅ Successful payment
- ❌ Declined card (4000 0000 0000 0002)
- ❌ Insufficient funds (4000 0000 0000 9995)
- ❌ Invalid card number
- ❌ Expired card
- ❌ Invalid CVV

---

## 📱 Mobile Support

The payment form is fully responsive:
- Single column layout on mobile
- Touch-optimized input fields
- Large, accessible buttons
- Clear error messages

---

## ♿ Accessibility

- WCAG 2.1 AA compliant
- High contrast labels and inputs
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Error announcements

---

## 🔄 Future Enhancements

### Planned Features:
- [ ] Save cards for future use (tokenization)
- [ ] Multiple payment methods per order
- [ ] Partial payments / installments
- [ ] Refund functionality
- [ ] Payment receipts (PDF)
- [ ] Multi-currency support
- [ ] Apple Pay / Google Pay
- [ ] Bank transfer option
- [ ] Invoice payment (for businesses)

---

## 📞 Production Checklist

Before going live:

- [ ] Choose payment provider (Stripe, Isracard, PayPal)
- [ ] Sign up for merchant account
- [ ] Get API keys (production)
- [ ] Add API keys to environment variables
- [ ] Enable provider in config
- [ ] Set testMode to false
- [ ] Test with real cards (small amounts)
- [ ] Configure webhooks for payment notifications
- [ ] Set up PCI compliance
- [ ] Enable HTTPS only
- [ ] Add rate limiting
- [ ] Set up monitoring and alerts
- [ ] Test refund process
- [ ] Update terms of service
- [ ] Add privacy policy for payment data

---

## 🆘 Troubleshooting

### "Payment provider not implemented"
- You're trying to use a real provider without implementation
- Switch to test provider or implement the provider

### "Invalid card number"
- Card fails Luhn algorithm
- Use test cards provided above

### "Card expired"
- Expiry date is in the past
- Use future date (e.g., 12/25)

### Payment not showing in admin
- Check localStorage for orders
- Verify order was created successfully
- Check console for errors

---

## 📚 Resources

- **Stripe Docs**: https://stripe.com/docs/api
- **PayPal Docs**: https://developer.paypal.com/
- **Isracard**: https://www.isracard.co.il/business/online-payment
- **PCI DSS**: https://www.pcisecuritystandards.org/
- **Luhn Algorithm**: https://en.wikipedia.org/wiki/Luhn_algorithm

---

**Built with ❤️ for Cookie Liza Bakery**

