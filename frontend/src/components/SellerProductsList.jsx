import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EditProductForm from './EditProductForm';
import ConfirmationModal from './ConfirmationModal';

const SellerProductsList = ({ refreshTrigger, onProductChange }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSellerProducts();
  }, [refreshTrigger]);

  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/my-products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.products || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load your products');
    } finally {
      setLoading(false);
    }
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    if (onProductChange) onProductChange();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    
    setDeleting(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${deletingProduct.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      setDeletingProduct(null);
      if (onProductChange) onProductChange();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Your Products</h3>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse p-4 rounded h-20"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Your Products ({products.length})</h3>
      
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't added any products yet. Use the form to add your first product.
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-green-600 font-semibold">{product.price?.toLocaleString()} RWF</p>
                {product.description && (
                  <p className="text-xs text-gray-500 mt-1">{product.description.substring(0, 60)}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 border border-blue-500 rounded hover:bg-blue-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingProduct(product)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-500 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default SellerProductsList;