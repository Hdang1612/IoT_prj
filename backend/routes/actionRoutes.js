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
 *     description: API này trả về danh sách các hành động đã thực hiện (bật/tắt thiết bị), có thể lọc theo thời gian và thiết bị.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang (mặc định là 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Số lượng bản ghi trên mỗi trang.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "2024-02-12"
 *         description: Lọc theo timestamp (YYYY-MM-DD).
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: integer
 *           example: 101
 *         description: ID thiết bị cần lọc.
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "a1b2c3d4"
 *                       device_name:
 *                         type: string
 *                         example: "Smart Fan"
 *                       action:
 *                         type: string
 *                         example: "ON"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-02-12T10:00:00Z"
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 totalItems:
 *                   type: integer
 *                   example: 50
 *       400:
 *         description: Yêu cầu không hợp lệ.
 *       500:
 *         description: Lỗi server.
 */
routeActionData.get("/fetch", fetchActionLogs);

/**
 * @swagger
 * /api/action/toggle/{deviceId}:
 *   put:
 *     summary: Bật/Tắt thiết bị
 *     description: API này cho phép bật hoặc tắt thiết bị dựa trên `deviceId`. Trạng thái mới sẽ được cập nhật tự động và ghi vào lịch sử.
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         description: ID của thiết bị cần bật/tắt.
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newStatus:
 *                   type: integer
 *                   example: 1
 *                   description: "Trạng thái mới của thiết bị (1: ON, 0: OFF)."
 *                 action:
 *                   type: string
 *                   example: "ON"
 *       400:
 *         description: Yêu cầu không hợp lệ.
 *       404:
 *         description: Không tìm thấy thiết bị.
 *       500:
 *         description: Lỗi server.
 */
routeActionData.put("/toggle/:deviceId", toggleDevice);

export default routeActionData;
