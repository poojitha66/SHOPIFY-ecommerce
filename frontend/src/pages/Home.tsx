import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data.products || data);
      } catch (err) {
        setError('Failed to load products. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section>
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Discover your next favorite product</h1>
        <p className="text-gray-600">Browse a curated list of demo products powered by our backend API.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product._id} className="rounded-lg bg-white p-4 shadow">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
            <p className="mt-3 text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
            <div className="mt-4 flex items-center justify-between">
              <Link to={`/product/${product._id}`} className="text-sm font-semibold text-indigo-600 hover:underline">
                View details
              </Link>
              <button onClick={() => addToCart(product)} className="btn-primary text-sm">
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
