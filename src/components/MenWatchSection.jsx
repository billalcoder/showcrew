import React from "react";
import { useProducts } from "../context/ProductContext"; // adjust path as needed
import { Link } from "react-router-dom";

export  function ProductSection({ title, description, category }) {
  const { products, loading } = useProducts();
console.log(products);
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-8">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

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
        {filteredProducts.map((product) => (
          <Link to={`product/${product.title}`} state={product}>
          <div
            className="relative bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            key={product.id}
          >
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
              className="w-full rounded-lg object-cover h-48"
            />

            {/* Product Title */}
            <h4 className="mt-3 font-medium text-gray-800">{product.title}</h4>
            <h4 className="mt-3 font-medium text-gray-800">{product.size[0]}</h4>

            {/* Price */}
            <p className="mt-1 text-sm">
              <span className="line-through text-gray-400 mr-2">
                ₹
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(0)}
              </span>
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
