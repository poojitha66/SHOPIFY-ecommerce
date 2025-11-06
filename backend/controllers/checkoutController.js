import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const createCheckoutSession = async (req, res) => {
  try {
    const { lineItems, amount } = req.body;
    if ((!lineItems || lineItems.length === 0) && !amount) {
      return res.status(400).json({ message: 'Line items or amount is required' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items:
        lineItems && lineItems.length > 0
          ? lineItems
          : [
              {
                price_data: {
                  currency: 'usd',
                  product_data: { name: 'E-commerce order' },
                  unit_amount: amount,
                },
                quantity: 1,
              },
            ],
      success_url: process.env.CHECKOUT_SUCCESS_URL || 'http://localhost:5173/checkout?status=success',
      cancel_url: process.env.CHECKOUT_CANCEL_URL || 'http://localhost:5173/checkout?status=cancelled',
    });

    return res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ message: error.message || 'Stripe initialization failed' });
  }
};
