import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WelcomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Hero Section with Gradient & Dots Pattern - NO WAVE */}
<div className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white overflow-hidden">
  {/* Dots Pattern Background */}
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
    backgroundSize: '24px 24px'
  }}></div>
  
  {/* Animated Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
  
  <div className="relative container mx-auto px-4 py-10 text-center z-10">
    <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-3">
      🇷🇼 Rwanda's Local Marketplace
    </div>
    <h1 className="text-3xl md:text-4xl font-bold mb-2">Fresh from Local Shops</h1>
    <p className="text-emerald-100 text-sm mb-4">Connect with trusted sellers in your village</p>
    <div className="flex gap-3 justify-center">
      <Link to="/register?role=seller" className="bg-white text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 shadow-lg transition">
        Start Selling
      </Link>
      <Link to="/products" className="border-2 border-white text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-emerald-700 transition">
        Browse Products
      </Link>
    </div>
  </div>
</div>

      {/* Stats Bar with Gradient */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">500+</div>
              <div className="text-xs text-gray-500">Local Shops</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">10k+</div>
              <div className="text-xs text-gray-500">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">50k+</div>
              <div className="text-xs text-gray-500">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">30min</div>
              <div className="text-xs text-gray-500">Avg Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section with Subtle Gradient Background */}
      <div className="relative py-8">
        {/* Background Dots Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, #10B981 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}></div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                All Products
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 mt-1 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{products.length} items</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-100"></div>
                  <div className="p-3">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              <p>No products available yet.</p>
              <Link to="/register?role=seller" className="text-emerald-600 text-sm mt-2 inline-block">
                Be the first seller →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Product Image with Gradient */}
                  <div className="relative h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                      backgroundSize: '16px 16px'
                    }}></div>
                    <div className="flex items-center justify-center h-full">
                      <svg className="w-12 h-12 text-white/40 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* New Badge */}
                    {index < 3 && (
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1 group-hover:text-emerald-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-emerald-600 font-bold text-base mt-1">
                      {product.price?.toLocaleString()} RWF
                    </p>
                    <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {product.shop?.name || 'Local Shop'}
                    </p>
                    
                    {/* Add to Cart Button with Gradient */}
                    <button className="w-full mt-3 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-600 text-xs py-1.5 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 hover:text-white transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section with Gradient & Dots */}
      <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white mt-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="relative container mx-auto px-4 py-10 text-center z-10">
          <h2 className="text-xl font-bold mb-2">Ready to Start Selling?</h2>
          <p className="text-emerald-100 text-sm mb-5">Join hundreds of local sellers reaching more customers</p>
          <Link
            to="/register?role=seller"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 shadow-lg transition-all hover:gap-3"
          >
            Become a Seller Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-gray-400 py-5">
        <div className="container mx-auto px-4 text-center text-xs">
          <p>© 2024 HAHA HAFI - Rwanda's Local Marketplace</p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;