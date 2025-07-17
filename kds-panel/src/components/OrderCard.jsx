import React from "react";

export default function OrderCard({ order, onComplete }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Order #{order.sale_id}</h2>
      <p className="mt-2">{order.order_items}</p>
      <p className="text-xs text-gray-400">{order.sale_time}</p>
      <button
        className="mt-3 bg-green-500 px-4 py-2 rounded"
        onClick={() => onComplete(order.sale_id)}
      >
        ✅ Complete
      </button>
    </div>
  );
}
