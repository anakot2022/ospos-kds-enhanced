export function connectWebSocket(url, onMessage) {
  const ws = new WebSocket(url);
  ws.onopen = () => console.log("WebSocket connected");
  ws.onmessage = (evt) => {
    console.log("WS message:", evt.data);
    onMessage(evt.data);
  };
  ws.onerror = (err) => console.error("WS error:", err);
  ws.onclose = () => console.log("WebSocket closed");
  return ws;
}
