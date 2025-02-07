import db from "../config/db.js";

export const getSensorDataService = async (page, limit, startDate, endDate) => {
    const offset = (page - 1) * limit;
    let sql = "SELECT * FROM sensor_data";
    let conditions = [];
    let params = [];

    if (startDate) {
        conditions.push("timestamp >= ?");
        params.push(startDate);
    }
    if (endDate) {
        conditions.push("timestamp <= ?");
        params.push(endDate);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY timestamp DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await db.query(sql, params);

    const [countResult] = await db.query(
        `SELECT COUNT(*) AS total FROM sensor_data ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}`,
        conditions.length > 0 ? params.slice(0, -2) : [] // chống sql injection
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
