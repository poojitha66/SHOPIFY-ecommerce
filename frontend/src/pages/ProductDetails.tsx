import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await fetchProductById(id);
        setProduct(data.product || data);
      } catch (err) {
        setError('Unable to fetch product details.');
      }
    };

    loadProduct();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/500'}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-gray-500">In stock: {product.stock}</p>
        <button className="btn-primary" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
