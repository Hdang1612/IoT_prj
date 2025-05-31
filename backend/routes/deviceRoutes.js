// import express from "express";
// import { getDevice } from "../controller/deviceController.js";
// const routeDevice = express.Router();
// routeDevice.get("/fetch", getDevice);
// export default routeDevice;

import express from "express";
import { getDevice } from "../controller/deviceController.js";

const routeDevice = express.Router();

/**
 * @swagger
 * /api/device/fetch:
 *   get:
 *     summary: Lấy danh sách thiết bị
 *     description: API này trả về danh sách các thiết bị hiện có trong hệ thống.
 *     responses:
 *       200:
 *         description: Lấy danh sách thiết bị thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Device A"
 *                   status:
 *                     type: string
 *                     example: "active"
 *       500:
 *         description: Lỗi server
 */
routeDevice.get("/fetch", getDevice);

export default routeDevice;
