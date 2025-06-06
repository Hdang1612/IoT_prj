import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER_NAME;
const MYSQL_PASSWORD = process.env.MYSQL_USER_PASSWORD;

const db = await mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: "iot",
  timezone: "+07:00",
});

export default db;
