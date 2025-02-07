import express from "express";
import { fetchActionLogs } from "../controller/actionController.js";

const routeActionData = express.Router();
routeActionData.get("/fetch", fetchActionLogs);
export default routeActionData;
