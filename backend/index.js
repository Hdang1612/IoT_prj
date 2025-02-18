import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import routeSensorData from "./routes/sensorDataRoutes.js";
import routeActionData from "./routes/actionRoutes.js";
import routeDevice from "./routes/deviceRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json()); 

const PORT = process.env.PORT || 3000;

// Cấu hình Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Sửa lại cho đúng
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, 
      },
    ],
  },
  apis: ["./routes/*.js"], // Đường dẫn các file định nghĩa API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions); // Tạo tài liệu Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Tạo route cho Swagger

// Kết nối database và khởi chạy server
db.query("SELECT 1")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.log("Database connection failed", err));

// Định tuyến API
app.use("/api/data", routeSensorData);
app.use("/api/action", routeActionData);
app.use("/api/device", routeDevice);
