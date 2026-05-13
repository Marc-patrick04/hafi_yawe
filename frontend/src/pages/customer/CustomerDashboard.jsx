import { useAuth } from '../../context/AuthContext';
import ProductList from '../../components/ProductList';

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          <ProductList />
        </div>

        {/* Your Info Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user?.name}</p>
            <p><span className="font-medium">Phone:</span> {user?.phone}</p>
            <p><span className="font-medium">Village:</span> {user?.village}</p>
            <p><span className="font-medium">Role:</span> {user?.role}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;