import { WebSocketServer } from "ws";

let connectedClients = [];

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    connectedClients.push(ws);

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      connectedClients = connectedClients.filter((client) => client !== ws);
    });
  });

  console.log("WebSocket server is running...");
};

// ⚡ Hàm để gửi dữ liệu tới tất cả client
export const sensorDataWs = (data) => {
  const message = JSON.stringify({
    ...data,
    timestamp: new Date().toISOString(), 
  });
  connectedClients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};

export default setupWebSocket;
