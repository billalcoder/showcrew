import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Create context
const ProductContext = createContext();

// 2️⃣ Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data once
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// 3️⃣ Custom hook for easy usage
export const useProducts = () => useContext(ProductContext);
