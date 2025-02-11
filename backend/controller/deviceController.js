import { getDeviceService } from "../service/deviceServices.js";

export const getDevice = async (req, res) => {
  try {
    const devices = await getDeviceService();
    res
      .status(200)
      .json({ message: "Fetched devices successfully", data: devices });
  } catch (error) {
    console.error("Error in getDeviceController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
