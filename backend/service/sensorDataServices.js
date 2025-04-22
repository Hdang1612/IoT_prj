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

  // Nếu có search nhưng không có field hợp lệ, mặc định tìm trong timestamp
  if (search) {
    if (field && validFields.includes(field)) {
      conditions.push(`${field} LIKE ?`);
    } else {
      conditions.push(`timestamp LIKE ?`);
    }
    params.push(`%${search}%`);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  // Sắp xếp theo orderBy nếu hợp lệ, ngược lại mặc định theo timestamp DESC
  if (orderBy && validFields.includes(orderBy)) {
    const sortType = orderType === "ASC" ? "ASC" : "DESC";
    sql += ` ORDER BY ${orderBy} ${sortType}`;
  } else {
    sql += " ORDER BY timestamp DESC";
  }

  sql += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const [rows] = await db.query(sql, params);

  // Tính tổng số lượng dữ liệu tìm thấy
  const [countResult] = await db.query(
    `SELECT COUNT(*) AS total FROM sensor_data ${
      conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""
    }`,
    params.slice(0, -2) // Loại bỏ limit, offset khỏi params
  );

  const totalItems = countResult[0]?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: rows,
    currentPage: page,
    totalPages,
    totalItems,
  };
};
