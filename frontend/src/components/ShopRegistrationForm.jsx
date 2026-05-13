import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ShopRegistrationForm = ({ onShopCreated }) => {
  const { token, user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    village: user?.village || '',
    phone: user?.phone || '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/shops',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess('Shop created successfully!');
      setFormData({ name: '', village: '', phone: '', description: '' });
      
      // Callback to refresh parent component
      if (onShopCreated) {
        onShopCreated(response.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.shop?.[0] || 
                          err.response?.data?.message || 
                          'Failed to create shop';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Register Your Shop</h2>
      
      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Shop Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Mama's Grocery"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Village *</label>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your village"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0788888888"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell customers about your shop..."
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Shop...
            </>
          ) : (
            'Create Shop'
          )}
        </button>
      </form>
    </div>
  );
};

export default ShopRegistrationForm;