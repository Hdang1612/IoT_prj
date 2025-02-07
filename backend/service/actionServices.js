import db from "../config/db.js";

export const getActionLogsService = async (page, limit, startDate, endDate) => {
    const offset = (page - 1) * limit;
    let sql = `
        SELECT al.id, d.name AS device_name, al.action, al.timestamp
        FROM action_logs al
        JOIN device d ON al.device_id = d.id
    `;

    let conditions = [];
    let params = [];

    if (startDate) {
        conditions.push("al.timestamp >= ?");
        params.push(startDate);
    }
    if (endDate) {
        conditions.push("al.timestamp <= ?");
        params.push(endDate);
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
