import { NextRequest, NextResponse } from 'next/server';
import { createPaymentProvider } from '@/lib/payment/providers';
import type { PaymentRequest } from '@/lib/payment/types';

// POST /api/payment/process - Process payment (server-side only)
export async function POST(request: NextRequest) {
  try {
    const paymentRequest: PaymentRequest = await request.json();

    // Validate request
    if (!paymentRequest.amount || paymentRequest.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'סכום לא תקין' },
        { status: 400 }
      );
    }

    if (!paymentRequest.customer?.name || !paymentRequest.customer?.email) {
      return NextResponse.json(
        { success: false, error: 'פרטי לקוח חסרים' },
        { status: 400 }
      );
    }

    if (!paymentRequest.cardData) {
      return NextResponse.json(
        { success: false, error: 'פרטי כרטיס אשראי חסרים' },
        { status: 400 }
      );
    }

    // Server-side validation of card data
    const { cardData } = paymentRequest;
    
    // Basic validation (full validation happens in provider)
    if (!cardData.cardNumber || !cardData.cardholderName || 
        !cardData.expiryMonth || !cardData.expiryYear || !cardData.cvv) {
      return NextResponse.json(
        { success: false, error: 'פרטי כרטיס לא שלמים' },
        { status: 400 }
      );
    }

    // Get payment provider (currently test mode)
    const provider = createPaymentProvider(paymentRequest.paymentMethod.provider);

    // Process payment
    const result = await provider.processPayment(paymentRequest);

    // Log transaction (in production, save to database)
    console.log('Payment processed:', {
      orderId: paymentRequest.orderId,
      amount: paymentRequest.amount,
      success: result.success,
      transactionId: result.transactionId,
      timestamp: result.timestamp,
    });

    // Return result (don't expose sensitive card data)
    return NextResponse.json({
      success: result.success,
      transactionId: result.transactionId,
      error: result.error,
      timestamp: result.timestamp,
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'שגיאה בעיבוד התשלום' 
      },
      { status: 500 }
    );
  }
}

// GET /api/payment/providers - Get available payment providers
export async function GET() {
  return NextResponse.json({
    providers: [
      {
        id: 'test',
        name: 'Test Provider',
        enabled: true,
        testMode: true,
      },
      // Add other providers when ready
      // {
      //   id: 'visa',
      //   name: 'Visa/Mastercard',
      //   enabled: false,
      //   testMode: true,
      // },
    ],
  });
}

