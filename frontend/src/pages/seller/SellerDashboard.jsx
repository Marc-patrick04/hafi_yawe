import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import ShopRegistrationForm from '../../components/ShopRegistrationForm';
import AddProductForm from '../../components/AddProductForm';
import SellerProductsList from '../../components/SellerProductsList';

const SellerDashboard = () => {
  const { user, token } = useAuth();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshProducts, setRefreshProducts] = useState(0);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/my-shop', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShop(response.data);
    } catch (error) {
      console.error('No shop found:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShopCreated = (newShop) => {
    setShop(newShop);
  };

  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
  };

  const handleProductChange = () => {
    setRefreshProducts(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Shop Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Shop</h2>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : shop ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><span className="font-medium">Shop Name:</span> {shop.name}</p>
              <p><span className="font-medium">Village:</span> {shop.village}</p>
              <p><span className="font-medium">Phone:</span> {shop.phone}</p>
              <p><span className="font-medium">Description:</span> {shop.description || 'No description'}</p>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">You don't have a shop yet. Register one below.</p>
          )}
        </div>

        {/* Shop Registration Form - Only show if no shop */}
        {!shop && !loading && (
          <ShopRegistrationForm onShopCreated={handleShopCreated} />
        )}

        {/* Product Management - Only show if shop exists */}
        {shop && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Product Form */}
            <AddProductForm onProductAdded={handleProductAdded} />
            
            {/* Products List with Edit/Delete */}
            <div className="bg-white rounded-lg shadow p-6">
              <SellerProductsList 
                refreshTrigger={refreshProducts} 
                onProductChange={handleProductChange}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;