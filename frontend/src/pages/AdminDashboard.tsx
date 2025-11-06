import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products || data);
      } catch (err) {
        setError('Unable to fetch products. Ensure you are authenticated as admin.');
      }
    };
    load();
  }, []);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage your catalog and view store performance. The current view lists products retrieved
          from the backend API.
        </p>
      </header>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="text-xl font-semibold text-gray-900">Products</h2>
        <table className="mt-4 w-full table-auto border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Price</th>
              <th className="py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 last:border-b-0">
                <td className="py-2 font-medium text-gray-900">{product.name}</td>
                <td className="py-2 text-gray-600">{product.category}</td>
                <td className="py-2 text-gray-600">${product.price.toFixed(2)}</td>
                <td className="py-2 text-gray-600">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && !error && (
          <p className="py-4 text-center text-gray-500">No products found. Add some via the backend.</p>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
