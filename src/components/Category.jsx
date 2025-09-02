import React, { useMemo, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Category() {
  const data = useLocation();
  const { products, loading } = useProducts();
  const [visibleCount, setVisibleCount] = useState(15);

  // ✅ Memoized filtered products
  const category = useMemo(() => {
    if (!loading && products.length > 0 && data.state?.brand) {
      return products.filter(
        (p) => p.brand?.toLowerCase() === data.state.brand.toLowerCase()
      );
    }
    return [];
  }, [products, loading, data.state]);

  // ✅ Slice for visible products
  const visibleProducts = useMemo(() => {
    return category.slice(0, visibleCount);
  }, [category, visibleCount]);

  // ✅ Function for loading more
  const fetchMoreData = () => {
    setTimeout(() => {
      setVisibleCount((prev) =>
        prev + 20 <= category.length ? prev + 20 : category.length
      );
    }, 800); // small delay for smooth loading effect
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex justify-center items-start py-10 mt-50 w-full">
      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={fetchMoreData}
        hasMore={visibleProducts.length < category.length}
        loader={<p className="text-center py-4 text-gray-500">Loading more...</p>}
        endMessage={
          <p className="text-center py-4 text-gray-500">
            🎉 You have seen all products!
          </p>
        }
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4"
      >
        {visibleProducts.length > 0 ? (
          visibleProducts.map((item) => (
            <Link
              to={`/product/${item.title}`}
              key={item._id || item.id}
              state={item}
              className="relative group bg-white shadow-sm hover:shadow-lg rounded-lg overflow-hidden"
            >
              {/* SALE Badge */}
              {item.discountPercentage > 0 && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}

              {/* Product Image */}
              <div className="relative">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-64 object-scale-down transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-gray-500 text-xs uppercase">
                  {item.brand || "Unknown"}
                </p>
                <h3 className="text-sm font-medium mt-1">{item.title}</h3>
                <div className="mt-2">
                  {item.discountPercentage > 0 && (
                    <span className="text-gray-400 line-through mr-2">
                      ₹
                      {(
                        item.price /
                        (1 - item.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
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
      </InfiniteScroll>
    </div>
  );
}
