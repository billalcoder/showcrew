import React from "react";
import { useProducts } from "../context/ProductContext";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function Branding() {
  const { products, loading } = useProducts();

  if (loading) return <Loader />;

  // Group products by brand & pick the first product for display
  const brands = {};
  products.forEach((product) => {
    if (!brands[product.brand]) {
      brands[product.brand] = product; // store first product per brand
    }
  });

  const brandList = Object.values(brands);

  return (
    <div className="branding-wrapper p-6">
      {/* Centered title with lines */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex-grow border-t border-gray-300"></div>
        <h2 className="mx-4 text-lg md:text-xl font-bold tracking-wide">
          WATCHES BY BRANDS
        </h2>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {brandList.map((brand) => (
          <Link
            key={brand._id}
            to={`/brand/${encodeURIComponent(brand.brand)}`}
            state={brand.category}
            className="text-center group"
          >
            <img
              src={brand.images[0]}
              alt={brand.title}
              className="mx-auto h-48 object-scale-down transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="mt-3 text-sm font-bold uppercase">
              {brand.brand}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
