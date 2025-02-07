import express from "express";
import { fetchSensorDataList } from "../controller/sensorDataController.js";

const routeSensorData = express.Router();
routeSensorData.get("/fetch", fetchSensorDataList);
export default routeSensorData;
