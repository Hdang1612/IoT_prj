import db from "../config/db.js";

export const getSensorDataService = async (
  search,
  field,
  page,
  limit,
  orderBy,
  orderType
) => {
  const offset = (page - 1) * limit;
  let sql = "SELECT * FROM sensor_data";
  let conditions = [];
  let params = [];
  const validFields = [
    "id",
    "timestamp",
    "temperature",
    "light_intensity",
    "humidity",
  ];
  if (field && search && validFields.includes(field)) {
    conditions.push(`${field} LIKE ?`);
    params.push(`%${search}%`);
  }
  if (conditions.length > 0) {
    sql += " WHERE " + conditions;
  }

  if (orderBy && validFields.includes(orderBy)) {
    const sortType = orderType === "ASC" ? "ASC" : "DESC";
    sql += ` ORDER BY ${orderBy} ${sortType}`;
  } else {
    sql += " ORDER BY timestamp DESC";
  }

  sql += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const [rows] = await db.query(sql, params);

  const [countResult] = await db.query(
    `SELECT COUNT(*) AS total FROM sensor_data ${
      conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""
    }`,
    conditions.length > 0 ? params.slice(0, -2) : []
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
