import React from "react";

export default function OrderCard({ order, onComplete }) {
  return (
    <div style={{
      background: "#222",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    }}>
      <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Order #{order.sale_id}</h2>
      <p style={{ marginTop: "0.5rem" }}>{order.order_items}</p>
      <p style={{ fontSize: "0.8rem", color: "#aaa" }}>{order.sale_time}</p>
      <button
        style={{
          marginTop: "0.8rem",
          background: "green",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none"
        }}
        onClick={() => onComplete(order.sale_id)}
      >
        ✅ Complete
      </button>
    </div>
  );
}
