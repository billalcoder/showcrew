import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Brand() {
  const data = useLocation();
  const { products, loading } = useProducts();
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 15;

  // ✅ Memoized filtered products
  const category = useMemo(() => {
    if (products.length > 0 && data.state) {
      return products.filter((e) => e.category.includes(data.state));
    }
    return [];
  }, [products, data.state]);

  // ✅ Memoized visible products based on page
  const visibleProducts = useMemo(() => {
    return category.slice(0, page * ITEMS_PER_PAGE);
  }, [category, page]);

  const hasMore = visibleProducts.length < category.length;

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex justify-center items-start py-10 mt-50 w-full">
      <div className="w-full max-w-6xl px-4">
        <InfiniteScroll
          dataLength={visibleProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="text-center py-4">
              <Loader />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 py-4">
              🎉 You have seen all products!
            </p>
          }
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleProducts.map((item) => (
            <Link
              to={`/product/${item.title}`}
              key={item._id}
              state={item}
              className="relative group bg-white shadow-sm hover:shadow-lg rounded-lg overflow-hidden"
            >
              {item.discount && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}

              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <p className="text-gray-500 text-xs uppercase">{item.brand}</p>
                <h3 className="text-sm font-medium mt-1">{item.title}</h3>
                <div className="mt-2">
                  <span className="text-lg font-bold text-black">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
