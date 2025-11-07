import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
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
  const { data } = await api.get('/products');
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const { data } = await api.post('/auth/register', { user: { name, email, password, password_confirmation: password } });
  return data;
};

export const createOrder = async (payload: unknown) => {
  const { data } = await api.post('/orders', payload);
  return data;
};

export const createCheckoutSession = async (payload: unknown) => {
  const { data } = await api.post('/checkout/session', payload);
  return data;
};

export default api;
