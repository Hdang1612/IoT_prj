import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import http from "http";
import setupWebSocket from "./config/webSocket.js";
import swaggerDocs from "./config/swagger.js";

import routeSensorData from "./routes/sensorDataRoutes.js";
import routeActionData from "./routes/actionRoutes.js";
import routeDevice from "./routes/deviceRoutes.js";

import "./config/mqttClient.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);

// Khởi tạo WebSocket
setupWebSocket(server);

const PORT = process.env.PORT || 3000;

// Cấu hình Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

db.query("SELECT 1")
  .then(() => {
    console.log("Connected to DB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((err) => console.log("Database connection failed", err));

// Định tuyến API
app.use("/api/data", routeSensorData);
app.use("/api/action", routeActionData);
app.use("/api/device", routeDevice);
