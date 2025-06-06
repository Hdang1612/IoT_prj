import dotenv from "dotenv";
import {
  getActionLogsService,
  toggleDeviceStatusService,
} from "../service/actionServices.js";
dotenv.config();

export const fetchActionLogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const { startDate, endDate,deviceId } = req.query;
    const result = await getActionLogsService(page, limit, startDate, endDate,deviceId);

    res
      .status(200)
      .json({ messsage: "fetch sensor data successfull", data: result });
  } catch (error) {
    console.error("Error fetching action logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(400).json({ error: "Device ID is required" });
    }

    const result = await toggleDeviceStatusService(deviceId);

    res.status(200).json({
      message: `Device ${result.action} successfully`,
      status: result.newStatus === 1 ? "ON" : "OFF",
    });
  } catch (error) {
    console.error("Error toggling device:", error);
    if (error.status === 404) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
