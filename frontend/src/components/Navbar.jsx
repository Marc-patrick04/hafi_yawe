import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          HAHA HAFI
        </Link>
        
        {/* Search Bar - Will add later */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search products or shops..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700">
            Search
          </button>
        </div>
        
        {/* Icons & Auth */}
        <div className="flex items-center gap-4">
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="text-gray-600 hover:text-red-500 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
          
          {/* Cart Icon with Count */}
          <Link to="/cart" className="text-gray-600 hover:text-green-600 transition relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
          
          {/* Auth Buttons or User Menu */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="text-green-600 hover:text-green-700">
                Login
              </Link>
              <Link to="/register" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;