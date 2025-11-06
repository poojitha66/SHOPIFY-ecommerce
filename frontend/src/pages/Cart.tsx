import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
          <li key={product._id} className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500" htmlFor={`quantity-${product._id}`}>
                Qty
              </label>
              <input
                id={`quantity-${product._id}`}
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => updateQuantity(product._id, Number(event.target.value))}
                className="w-20 rounded border border-gray-300 px-2 py-1"
              />
              <button
                className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                onClick={() => removeFromCart(product._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <p className="text-lg font-semibold text-gray-900">Total: ${total.toFixed(2)}</p>
        <Link to="/checkout" className="btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
};

export default Cart;
