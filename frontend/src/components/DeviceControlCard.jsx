import { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Switch, CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getDeviceData } from "../redux/data/DeviceSlice";
import { fetchDeviceList, toggleAction } from "../service/service";
import webSocketService from "../service/webSocket";

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

export default function DeviceControlCard({ wind }) {
  const [deviceStatus, setDeviceStatus] = useState({});
  const [loadingDevices, setLoadingDevices] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    webSocketService.onMessage((data) => {
      try {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (parsed.type !== "device_status") return;
        console.log("Parsed data >>>>>>>>>>>>:", parsed);

        const { deviceId, status } = parsed;

        if (typeof deviceId === "number" && typeof status === "boolean") {
          setDeviceStatus((prevState) => ({
            ...prevState,
            [deviceId]: status,
          }));

          setLoadingDevices((prev) => ({
            ...prev,
            [deviceId]: false,
          }));
        }
      } catch (err) {
        console.error("Invalid WebSocket message:", err);
      }
    });

    // Kết nối WebSocket
    webSocketService.connect("ws://localhost:8000");

    // Fetch trạng thái thiết bị khi lần đầu render
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

    return () => {
      webSocketService.disconnect();
    };
  }, [dispatch]);

  const toggleDevice = async (deviceId) => {
    setLoadingDevices((prev) => ({ ...prev, [deviceId]: true }));
    try {
      await toggleAction(deviceId);
    } catch (error) {
      console.error("Error toggling device:", error);
      setLoadingDevices((prev) => ({ ...prev, [deviceId]: false }));
    }
    // dispatch (getDeviceData)
    dispatch(getDeviceData({ page: 1 }));
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

          <Switch
            checked={deviceStatus[device.id] ?? false}
            onChange={() => toggleDevice(device.id)}
            disabled={loadingDevices[device.id]}
            color="success"
          />
          {loadingDevices[device.id] && (
            <CircularProgress size={20} className="ml-2" />
          )}
        </Box>
      ))}
      <Box
        className={`${
          wind > 50 ? "blink-strong text-black" : "bg-gray-400"
        } p-3 rounded-xl text-white flex items-center justify-center`}
      >
        <LightbulbIcon className="mx-auto" sx={{ fontSize: 30 }} />
      </Box>
      <Box className="text-center mt-2">
        <span className="text-xl font-medium text-gray-800">Wind</span>
      </Box>
    </Box>
  );
}
