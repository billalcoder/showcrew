import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const url = "https://showcrew-backend.onrender.com"
  const { cart, setCart } = useProducts();

  async function addToCart(product) {
    try {
      const res = await fetch(`${url}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product, quantity: 1 }),
      });
      const data = await res.json();
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error("Failed to add item", err);
    }
  }

  const fetchCart = async () => {
    try {
      const res = await fetch(`${url}/cart/`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
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

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.price ? item.price : item.product?.price || 0) * item.quantity,
    0
  );

  // ✅ Place Order
  const placeOrder = async () => {
    const confirmOrder = window.confirm("Do you want to place this order?");
    if (!confirmOrder) return;

    try {
      const res = await fetch(`${url}/order/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // pass cookies (sid)
        body: JSON.stringify({
          totalAmount: total,
          paymentMethod: "COD", // Cash on Delivery
          paymentStatus: "PENDING",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Order placed successfully!");
        setCart([]); // clear local cart after successful order
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      console.error("Failed to place order", err);
      alert("Something went wrong while placing order");
    }
  };

  if (cart.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600 text-lg">
        No product here to see. Add the product here...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-50">
      {/* Left: Cart Items */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.map((item) => {
          const product = item.product || item;
          return (
            <div
              key={product._id || product.id}
              className="flex justify-between items-center border-b py-3"
            >
              <Link to={`/product/${item.product.title}`} state={item.product}>
                <div className="flex items-center gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-green-600 font-bold">
                      ₹{product.price} × {item.quantity}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      + Add one more
                    </button>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => removeItem(item._id || item.id)}
                className="text-red-500 hover:underline"
              >
                ✖
              </button>
            </div>
          );
        })}
      </div>

      {/* Right: Summary */}
      <div className="bg-gray-50 p-6 border rounded">
        <h3 className="text-xl font-semibold mb-4">CART TOTALS</h3>
        <div className="flex justify-between py-2 border-b">
          <span>Subtotal</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between py-2 border-b font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        {/* ✅ COD Button triggers order API */}
        <div className="mt-4">
          <button
            onClick={placeOrder}
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Checkout with Cash on Delivery
          </button>
        </div>

        <div className="mt-4 text-gray-600 text-sm">
          Advance payment option coming soon...
        </div>
      </div>
    </div>
  );
}
