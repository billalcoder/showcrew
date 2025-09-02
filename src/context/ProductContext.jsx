import { createContext, useContext, useEffect, useState, useMemo } from "react";

const url = "https://showcrew-backend.onrender.com";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    fetch(`${url}/products/all`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Fetch cart
  useEffect(() => {
    fetch(`${url}/cart`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.cart) setCart(data.cart);
      })
      .catch(err => console.error("Error fetching cart:", err));
  }, []);

  // Cart actions
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(`${url}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`${url}/cart/remove/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  // ✅ Memoize context value
  const value = useMemo(
    () => ({ products, loading, cart, setCart, addToCart, removeFromCart }),
    [products, loading, cart] // only change if these change
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
