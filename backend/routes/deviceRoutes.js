import express from "express";
import { getDevice } from "../controller/deviceController.js";
getDevice
const routeDevice = express.Router();
routeDevice.get("/fetch", getDevice);
export default routeDevice;
