import React, { useEffect, useState } from "react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await fetch("https://showcrew-backend.onrender.com/order/my-order", {
          credentials: "include", // include cookies if using sessions
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch user orders", err);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="p-6 mt-30">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-xl shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
              <h4 className="mt-2 font-semibold">Items:</h4>
              <ul className="list-disc ml-5">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.product?.name} × {item.quantity} — ₹{item.priceAtPurchase}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
