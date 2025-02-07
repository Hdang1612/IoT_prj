import dotenv from "dotenv";
import db from "../config/db.js";
import { getActionLogsService } from "../service/actionServices.js";
dotenv.config();

export const fetchActionLogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const { startDate, endDate } = req.query;
    const result = await getActionLogsService(page, limit, startDate, endDate);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching action logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
