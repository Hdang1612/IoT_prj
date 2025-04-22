import express from "express";
import { fetchSensorDataList } from "../controller/sensorDataController.js";

const routeSensorData = express.Router();

/**
 * @swagger
 * /api/data/fetch:
 *   get:
 *     summary: Lấy danh sách dữ liệu cảm biến
 *     description: API trả về danh sách dữ liệu cảm biến có phân trang, tìm kiếm và sắp xếp.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Giá trị tìm kiếm trong dữ liệu cảm biến.
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         description: Trường dữ liệu cần tìm kiếm, ví dụ "id", "temperature", "humidity", "light_intensity".
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang cần lấy (pagination).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Số lượng dữ liệu mỗi trang.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Trường dữ liệu dùng để sắp xếp, ví dụ "id", "temperature", "humidity", "light_intensity".
 *       - in: query
 *         name: orderType
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Kiểu sắp xếp, "ASC" (tăng dần) hoặc "DESC" (giảm dần).
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
routeSensorData.get("/fetch", fetchSensorDataList);

export default routeSensorData;
