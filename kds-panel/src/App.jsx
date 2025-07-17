import React, { useEffect, useState } from "react";
import { API_URL, WS_URL, STATION_FILTER } from "./config";
import OrderCard from "./components/OrderCard";

export default function App() {
  const [orders, setOrders] = useState([]);
  const audio = new Audio("/ding.mp3");

  const fetchOrders = async () => {
    const res = await fetch(`${API_URL}/kitchen_orders`);
    const data = await res.json();
    const filtered = STATION_FILTER
      ? data.filter((o) => o.station === STATION_FILTER)
      : data;
    setOrders(filtered);
  };

  const markComplete = async (id) => {
    await fetch(`${API_URL}/kitchen_complete/${id}`, { method: "POST" });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();

    const ws = new WebSocket(WS_URL);
    ws.onmessage = () => {
      fetchOrders();
      audio.play();
    };

    const interval = setInterval(fetchOrders, 10000); // fallback polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center mb-4">🍽 Kitchen Display</h1>
      <div className="grid gap-4">
        {orders.map((o) => (
          <OrderCard key={o.sale_id} order={o} onComplete={markComplete} />
        ))}
      </div>
    </div>
  );
}
