import express from "express";
import { fetchActionLogs,toggleDevice } from "../controller/actionController.js";

const routeActionData = express.Router();
routeActionData.get("/fetch", fetchActionLogs);
routeActionData.put("/toggle/:deviceId", toggleDevice);
export default routeActionData;
