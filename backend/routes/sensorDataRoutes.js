// import express from "express";
// import { fetchSensorDataList } from "../controller/sensorDataController.js";

// const routeSensorData = express.Router();
// routeSensorData.get("/fetch", fetchSensorDataList);
// export default routeSensorData;

import express from "express";
import { fetchSensorDataList } from "../controller/sensorDataController.js";

const routeSensorData = express.Router();

/**
 * @swagger
 * /api/data/fetch:
 *   get:
 *     summary: Lấy dữ liệu cảm biến
 *     description: API trả về danh sách dữ liệu cảm biến với phân trang và lọc theo ngày.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang muốn lấy (pagination).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Số lượng dữ liệu mỗi trang.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày bắt đầu để lọc dữ liệu (YYYY-MM-DD).
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày kết thúc để lọc dữ liệu (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Lấy dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "fetch sensor data successful"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       temperature:
 *                         type: number
 *                         example: 28.5
 *                       humidity:
 *                         type: number
 *                         example: 60.2
 *                       light:
 *                         type: number
 *                         example: 300
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-02-12T14:00:00Z"
 *       500:
 *         description: Lỗi server
 */
routeSensorData.get("/fetch", fetchSensorDataList);

export default routeSensorData;
