// import express from "express";
// import { fetchActionLogs,toggleDevice } from "../controller/actionController.js";

// const routeActionData = express.Router();
// routeActionData.get("/fetch", fetchActionLogs);
// routeActionData.put("/toggle/:deviceId", toggleDevice);
// export default routeActionData;

import express from "express";
import {
  fetchActionLogs,
  toggleDevice,
} from "../controller/actionController.js";

const routeActionData = express.Router();

/**
 * @swagger
 * /api/action/fetch:
 *   get:
 *     summary: Lấy danh sách lịch sử hành động
 *     description: API này trả về danh sách các hành động đã thực hiện (bật/tắt thiết bị), hỗ trợ lọc theo khoảng thời gian và ID thiết bị.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Trang hiện tại để phân trang (mặc định là 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: Số lượng bản ghi trên mỗi trang (mặc định là 5).
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *         required: false
 *         description: Ngày bắt đầu để lọc dữ liệu (định dạng YYYY-MM-DD).
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-02-12"
 *         required: false
 *         description: Ngày kết thúc để lọc dữ liệu (định dạng YYYY-MM-DD).
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: integer
 *           example: 101
 *         required: false
 *         description: ID của thiết bị để lọc các hành động liên quan đến thiết bị đó.
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fetch action logs successful"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       deviceId:
 *                         type: integer
 *                         example: 101
 *                       action:
 *                         type: string
 *                         example: "ON"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-02-12T10:00:00Z"
 *       500:
 *         description: Lỗi server
 */
routeActionData.get("/fetch", fetchActionLogs);

/**
 * @swagger
 * /api/action/toggle/{deviceId}:
 *   put:
 *     summary: Bật/Tắt thiết bị
 *     description: API này cho phép bật hoặc tắt một thiết bị dựa trên `deviceId`.
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         description: ID của thiết bị cần bật/tắt
 *         schema:
 *           type: integer
 *           example: 101
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ON, OFF]
 *                 example: "ON"
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thiết bị thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Device turned ON successfully"
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       404:
 *         description: Không tìm thấy thiết bị
 *       500:
 *         description: Lỗi server
 */
routeActionData.put("/toggle/:deviceId", toggleDevice);

export default routeActionData;
