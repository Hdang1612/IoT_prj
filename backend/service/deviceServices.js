import db from "../config/db.js";

export const getDeviceService = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM device");
    return rows; 
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};
