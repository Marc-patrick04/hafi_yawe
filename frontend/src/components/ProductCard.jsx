const ProductCard = ({ product, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
        <div className="flex items-center justify-center h-full">
          <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/shop/${product.shop?.id}`} className="text-xs text-emerald-600 font-medium hover:underline">
          {product.shop?.name || 'Local Shop'}
        </Link>
        <h3 className="font-semibold text-gray-800 mt-1 line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-emerald-600">
            {product.price?.toLocaleString()} RWF
          </span>
          <button className="bg-emerald-50 text-emerald-600 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;