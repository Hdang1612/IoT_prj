// file mqttClient.js
import mqtt from "mqtt";
import db from "./db.js";
import { sensorDataWs, deviceStatusWs } from "./webSocket.js";

const client = mqtt.connect("mqtt://192.168.15.173:1884", {
  username: "haidang",
  password: "haidanghy161",
});

client.on("connect", () => {
  console.log("✅ MQTT connected");
  client.subscribe("sensor/data");
  client.subscribe("device/status");
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    if (topic === "sensor/data") {
      console.log(" Sensor Data:", data);

      // Lưu vào DB
      await db.query(
        `INSERT INTO sensor_data 
        (temperature, humidity, light_intensity, wind, timestamp) 
        VALUES (?, ?, ?, ?, NOW())`,
        [data.temperature, data.humidity, data.light_level, data.wind]
      );

      console.log(" Sensor data inserted into DB");
      sensorDataWs(data); //
    } else if (topic === "device/status") {
      console.log("Device Status:", data);
      // Gửi trạng thái thiết bị qua WebSocket
      deviceStatusWs(data);
    }
  } catch (err) {
    console.error("Error handling MQTT message:", err);
  }
});

export const publishDeviceControl = (payload) => {
  const message = JSON.stringify(payload);
  client.publish("device/control", message, (err) => {
    if (err) {
      console.error("❌ Error publishing to device/control:", err);
    } else {
      console.log("📤 Sent device control:", message);
    }
  });
};

export default client;
