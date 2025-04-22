import { WebSocketServer } from "ws";
import db from "./db.js"; // Import kết nối database nếu cần

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    // Gửi dữ liệu cảm biến tự động mỗi 2 giây
    const sendSensorData = async () => {
      try {
        const [rows] = await db.query(
          "SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1"
        );
        if (rows.length > 0) {
          const latestData = rows[0];
          ws.send(JSON.stringify(latestData));
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const interval = setInterval(sendSensorData, 2000);

    ws.on("close", () => clearInterval(interval)); 
  });

  console.log("WebSocket server is running...");
};

export default setupWebSocket;
