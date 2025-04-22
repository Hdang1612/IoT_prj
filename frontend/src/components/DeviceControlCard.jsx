import { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getDeviceData } from "../redux/data/DeviceSlice";
import { fetchDeviceList, toggleAction } from "../service/service";

const devices = [
  {
    id: 1,
    name: "Ceiling Fan",
    color: "bg-orange-500",
    icon: <SettingsIcon sx={{ fontSize: 30 }} />,
  },
  {
    id: 2,
    name: "Light",
    color: "bg-purple-500",
    icon: <LightbulbIcon sx={{ fontSize: 30 }} />,
  },
  {
    id: 3,
    name: "Air Conditioner",
    color: "bg-gray-500",
    icon: <AcUnitIcon sx={{ fontSize: 30 }} />,
  },
];

export default function DeviceControlCard() {
  const [deviceStatus, setDeviceStatus] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const response = await fetchDeviceList();
        const statusMap = {};
        response.data.forEach((device) => {
          statusMap[device.id] = device.status;
        });
        setDeviceStatus(statusMap);
        dispatch(getDeviceData({ page: 1 }));
      } catch (error) {
        console.error("Error fetching device status:", error);
      }
    };

    fetchDeviceStatus();
  }, []);

  const toggleDevice = async (deviceId) => {
    try {
      await toggleAction(deviceId);
      setDeviceStatus((prevState) => ({
        ...prevState,
        [deviceId]: !prevState[deviceId],
      }));
      dispatch(getDeviceData({ page: 1 }));
      // Cập nhật actionLogs
      console.log(">>>", deviceStatus);
    } catch (error) {
      console.error("Error toggling device:", error);
    }
  };

  return (
    <Box className="bg-[#F7F1FF] p-4 rounded-xl space-y-4 shadow-md w-full">
      {devices.map((device) => (
        <Box key={device.id} className="flex items-center gap-4">
          <Box className={`${device.color} p-3 rounded-xl text-white`}>
            {device.icon}
          </Box>

          <span className="text-xl font-medium text-gray-800">
            {device.name}
          </span>

          <Box
            onClick={() => toggleDevice(device.id)}
            className={`w-14 h-7 flex items-center rounded-full cursor-pointer transition duration-300 ml-auto ${
              deviceStatus[device.id] ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <Box
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                deviceStatus[device.id] ? "translate-x-7" : "translate-x-1"
              }`}
            ></Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
