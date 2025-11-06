import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const fetchProducts = async () => {
  const { data } = await api.get('/api/products');
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const { data } = await api.post('/api/auth/register', { name, email, password });
  return data;
};

export const createOrder = async (payload: unknown) => {
  const { data } = await api.post('/api/orders', payload);
  return data;
};

export const createCheckoutSession = async (payload: unknown) => {
  const { data } = await api.post('/api/create-checkout-session', payload);
  return data;
};

export default api;
