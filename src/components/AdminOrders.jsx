import React, { useEffect, useState } from "react";

const AdminOrders = () => {
   const url = "https://showcrew-backend.onrender.com" //||"http://localhost:3000" "https://showcrew-backend.onrender.com"
  const [orders, setOrders] = useState([]);
  console.log(orders);
  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${url}/order/all`, {
          credentials: "include",
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  // handle deliver
  const handleDeliver = async (orderId) => {
    try {
      const res = await fetch(`${url}/order/deliver/${orderId}`, {
        method: "PUT",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        // remove from UI (filter out delivered order)
        setOrders((prev) => prev.filter((order) => order._id !== orderId));

        console.log("Delivered:", data);
      } else {
        console.error("Failed to deliver order");
      }
    } catch (err) {
      console.error("Error delivering order", err);
    }
  };

  return (
    <div className="p-6 mt-30">
      <h2 className="text-xl font-bold mb-4">All Orders (Admin)</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-xl shadow">
              <p>
                <strong>User:</strong> {order.user?.fullname} ({order.user?.email})
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})
              </p>

              {/* Shipping Address */}
              <div className="mt-2">
                <h4 className="font-semibold">Shipping Address:</h4>
                <p>{order.shippingAddress?.streetAddress}, {order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>Phone: {order.shippingAddress?.number}</p>
              </div>

              {/* Items */}
              <h4 className="mt-2 font-semibold">Items:</h4>
              <ul className="list-disc ml-5">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-4 p-3 border-b border-gray-200 last:border-none"
                  >
                    {/* Product Image */}
                    <img
                      src={item?.product?.images[0]}
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.product?.title}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-500">SIZE: {item.size}</p>
                    </div>

                    {/* Price */}
                    <span className="text-gray-900 font-semibold">
                      ₹{item.priceAtPurchase}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Deliver Button */}
              <button
                onClick={() => handleDeliver(order._id)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Deliver
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
