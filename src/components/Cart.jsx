import React from "react";
import { useProducts } from "../context/ProductContext";

export default function Cart() {
  const { cart, setCart } = useProducts();

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-green-600 font-bold">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:underline"
            >
              ✖
            </button>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button className="border border-black px-4 py-2 font-medium hover:bg-gray-100">
            ← CONTINUE SHOPPING
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 font-medium rounded hover:bg-gray-700">
            UPDATE CART
          </button>
        </div>
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
        <button className="w-full bg-black text-white py-3 mt-4 font-semibold rounded hover:opacity-90">
          PROCEED TO CHECKOUT
        </button>
        <div className="mt-4 text-gray-600">
          <span className="inline-flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.469 1.622 11.532 1.622 11.951 2.927L13.236 6.875C13.39 7.329 13.781 7.668 14.26 7.745L18.455 8.39C19.834 8.607 20.358 10.409 19.251 11.31L16.217 13.74C15.843 14.031 15.678 14.512 15.798 14.964L16.835 18.92C17.216 20.29 15.686 21.365 14.499 20.58L11.27 18.473C10.865 18.22 10.312 18.22 9.907 18.473L6.678 20.58C5.491 21.365 3.961 20.29 4.342 18.92L5.379 14.964C5.499 14.512 5.334 14.031 4.96 13.74L1.926 11.31C0.819 10.409 1.343 8.607 2.722 8.39L6.917 7.745C7.396 7.668 7.787 7.329 7.941 6.875L9.226 2.927H9.049z" />
            </svg>
            Coupon
          </span>
        </div>
      </div>
    </div>
  );
}
