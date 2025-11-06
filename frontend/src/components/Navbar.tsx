import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-xl font-bold text-indigo-600">
          ShopSphere
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/cart" className={navLinkClasses}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/checkout" className={navLinkClasses}>
            Checkout
          </NavLink>
          <NavLink to="/login" className={navLinkClasses}>
            Login
          </NavLink>
          <NavLink to="/admin" className={navLinkClasses}>
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
