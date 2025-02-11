import dotenv from "dotenv";
import { getSensorDataService } from "../service/sensorDataServices.js";
dotenv.config();

export const fetchSensorDataList = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const { startDate, endDate } = req.query;
    const result = await getSensorDataService(page, limit, startDate, endDate);
    res
      .status(200)
      .json({ messsage: "fetch sensor data successfull", data: result });
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
