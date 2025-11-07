import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createCheckoutSession, createOrder } from '../services/api';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      const lineItems = items.map(({ product, quantity }) => ({
        product: product._id,
        quantity,
        price: product.price,
      }));

      const orderPayload = {
        order: {
          line_items: lineItems,
          shipping_address: {
            full_name: formData.get('fullName'),
            address: formData.get('address'),
            city: formData.get('city'),
            postal_code: formData.get('postalCode'),
            country: formData.get('country'),
          },
        },
      };

      await createOrder(orderPayload);
      await createCheckoutSession({
        items: lineItems,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
      });
      clearCart();
      navigate('/');
    } catch (err) {
      setError('Checkout failed. Please ensure the backend and Stripe credentials are configured.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p className="text-center text-gray-600">Add products to your cart to continue.</p>;
  }

  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      <p className="mt-2 text-gray-600">Order total: ${total.toFixed(2)}</p>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <form className="mt-6 grid gap-4" onSubmit={handleCheckout}>
        <input required className="rounded border border-gray-300 px-3 py-2" name="fullName" placeholder="Full Name" />
        <input required className="rounded border border-gray-300 px-3 py-2" name="address" placeholder="Address" />
        <div className="grid gap-4 md:grid-cols-2">
          <input required className="rounded border border-gray-300 px-3 py-2" name="city" placeholder="City" />
          <input
            required
            className="rounded border border-gray-300 px-3 py-2"
            name="postalCode"
            placeholder="Postal Code"
          />
        </div>
        <input required className="rounded border border-gray-300 px-3 py-2" name="country" placeholder="Country" />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </section>
  );
};

export default Checkout;
