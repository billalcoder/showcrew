import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Loader from "./Loader";

export default function Brand() {
  const data = useLocation();
  const [category, setCategory] = useState([]);
  const { products, loading } = useProducts();
console.log(category);
  // Filter products when products or category changes
  useEffect(() => {
    if (products.length > 0 && data.state) {
      const filterCategory = products.filter((e) =>
        e.category.includes(data.state)
      );
      setCategory(filterCategory);
    }
  }, [products, data.state]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex justify-center items-start py-10 mt-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {category.length > 0 ? (
          category.map((item) => (
            <Link
              to={`/product/${item.title}`}
              key={item._id}
              state={item}
              className="relative group bg-white shadow-sm hover:shadow-lg rounded-lg overflow-hidden"
            >
              {/* SALE Badge */}
              {item.discount && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}

              {/* Product Image */}
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-gray-500 text-xs uppercase">{item.brand}</p>
                <h3 className="text-sm font-medium mt-1">{item.title}</h3>
                {/* <h3 className="text-sm font-medium mt-1">SIZE : {item?.size}</h3> */}
                <div className="mt-2">
                  <span className="text-gray-400 line-through mr-2">
                    {/* ₹{item.price} */}
                  </span>
                  <span className="text-lg font-bold text-black">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
