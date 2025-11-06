export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  token?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: User;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}
