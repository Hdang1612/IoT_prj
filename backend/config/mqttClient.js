// file mqttClient.js
import mqtt from "mqtt";
import db from "./db.js";
import { sensorDataWs } from "./webSocket.js";

const client = mqtt.connect("mqtt://192.168.1.17:1884", {
  username: "haidang",
  password: "haidanghy161",
});

client.on("connect", () => {
  console.log("✅ MQTT connected");
  client.subscribe("sensor/data");
});

client.on("message", async (topic, message) => {
  if (topic === "sensor/data") {
    try {
      const data = JSON.parse(message.toString());
      await db.query(
        "INSERT INTO sensor_data (temperature, humidity, light_intensity,timestamp) VALUES (?, ?, ?,now())",
        [data.temperature, data.humidity, data.light_level]
      );
      console.log("📥 Sensor data inserted into DB:", data);
      sensorDataWs(data);
    } catch (err) {
      console.error("❌ Error saving data:", err);
    }
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
