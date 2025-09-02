import React, { useMemo } from "react";
import { useProducts } from "../context/ProductContext"; // adjust path as needed
import { Link } from "react-router-dom";

export function ProductSection({ title, description, category }) {
  const { products, loading } = useProducts();

 

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }, [products, category])

  // Show only first 20
  const limitedProducts = useMemo(() => { return filteredProducts.slice(0, 20); }, [filteredProducts])

   if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-8">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto text-center px-4 py-8">
      {/* Heading */}
      <h2 className="inline-block text-2xl font-bold border-b-2 border-gray-300 pb-1">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {limitedProducts.map((product) => (
          <Link
            to={`product/${product.title}`}
            state={product}
            key={product._id}
          >
            <div className="relative bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              {/* Sale Badge */}
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  SALE
                </div>
              )}

              {/* Product Image */}
              <img
                src={product.images[0]}
                alt={product.title}
                loading="lazy"
                className="w-full rounded-lg object-cover h-48"
              />

              {/* Product Title */}
              <h4 className="mt-3 font-medium text-gray-800">
                {product.title}
              </h4>
              <h4 className="mt-3 font-medium text-gray-800">
                {product.size[0]}
              </h4>

              {/* Price */}
              <p className="mt-1 text-sm">
                <span className="text-lg font-bold text-black">
                  ₹{product.price}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
