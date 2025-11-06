import { createContext, useContext, useMemo, useReducer, ReactNode } from 'react';
import type { CartItem, Product } from '../types';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' };

type CartState = {
  items: CartItem[];
};

interface CartContextValue extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.product._id === action.product._id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product._id === action.product._id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.product._id !== action.productId) };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.product._id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const value = useMemo<CartContextValue>(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return {
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
