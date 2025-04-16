import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const getActionLogsService = async (page, limit, search, deviceId) => {
  const offset = (page - 1) * limit;
  let sql = `
        SELECT al.id, d.name AS device_name, al.action, al.timestamp
        FROM action_logs al
        JOIN device d ON al.device_id = d.id
    `;

  let conditions = [];
  let params = [];

  if (search) {
    conditions.push(
      "(al.timestamp LIKE ? OR DATE_FORMAT(al.timestamp, '%Y-%m-%dT%H:%i:%s.000Z') LIKE ?)"
    );
    params.push(`%${search}%`, `%${search}%`);
  }

  if (deviceId) {
    conditions.push("al.device_id = ?");
    params.push(deviceId);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY al.timestamp DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const [rows] = await db.query(sql, params);
  const [countResult] = await db.query(
    `
        SELECT COUNT(*) AS total
        FROM action_logs al
        JOIN device d ON al.device_id = d.id
        ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}
        `,
    params.slice(0, -2)
  );

  const totalItems = countResult[0].total;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: rows,
    currentPage: page,
    totalPages,
    totalItems,
  };
};

export const toggleDeviceStatusService = async (deviceId) => {
  const [device] = await db.query("SELECT status FROM device WHERE id = ?", [
    deviceId,
  ]);

  if (device.length === 0) {
    const error = new Error("Device not found");
    error.status = 404;
    throw error;
  }

  const currentStatus = device[0].status;
  const newStatus = currentStatus === 1 ? 0 : 1;

  await db.query("UPDATE device SET status = ? WHERE id = ?", [
    newStatus,
    deviceId,
  ]);

  const action = newStatus === 1 ? "ON" : "OFF";
  await db.query(
    "INSERT INTO action_logs (id,device_id, action, timestamp) VALUES (?,?, ?, NOW())",
    [uuidv4(), deviceId, action]
  );
  return { newStatus, action };
};
