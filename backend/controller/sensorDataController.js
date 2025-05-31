import dotenv from "dotenv";
import { getSensorDataService } from "../service/sensorDataServices.js";

dotenv.config();

export const fetchSensorDataList = async (req, res) => {
  try {
    const search = req.query.search; 
    const field = req.query.field;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const orderBy = req.query.orderBy;
    const orderType = req.query.orderType;
    // const { startDate, endDate } = req.query;
    const result = await getSensorDataService(search,field,page, limit, orderBy, orderType);
    res
      .status(200)
      .json({ messsage: "fetch sensor data successfull", data: result });
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
