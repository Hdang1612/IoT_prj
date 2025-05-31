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

// Hàm để gửi dữ liệu tới tất cả client
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

// Gửi trạng thái thiết bị (device status)
const deviceNameToId = {
  fan: 1,
  bulb: 2,
  dehumidifier: 3,
};

export const deviceStatusWs = (data) => {
  // data có thể là { device: "fan", status: true }
  const deviceId = deviceNameToId[data.device];

  if (typeof deviceId !== "number") {
    console.warn("Unknown device name:", data.device);
    return;
  }

  const message = JSON.stringify({
    type: "device_status",
    deviceId,
    status: data.status,
    timestamp: new Date().toISOString(),
  });

  connectedClients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};

export default setupWebSocket;
