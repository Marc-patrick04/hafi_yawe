import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddProductForm = ({ onProductAdded }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
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

    // Validate price is a number
    if (isNaN(formData.price) || formData.price <= 0) {
      setError('Please enter a valid price');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/products',
        {
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess('Product added successfully!');
      setFormData({ name: '', price: '', description: '' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
      // Callback to refresh parent component
      if (onProductAdded) {
        onProductAdded(response.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.errors || 
                          err.response?.data?.message || 
                          'Failed to add product';
      setError(typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      
      {/* Success Toast */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-pulse">
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
          <label className="block text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Fresh Tomatoes"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price (RWF) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1500"
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
            placeholder="Describe your product..."
          />
        </div>
        
        {/* Image Placeholder */}
        <div className="mb-4 p-4 bg-gray-100 rounded text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Image upload coming soon</p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-green-300 flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Product...
            </>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;