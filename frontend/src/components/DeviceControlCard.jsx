import { useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

// Danh sách thiết bị
const devices = [
  {
    name: "WiFi",
    color: "bg-orange-500",
    icon: <WifiIcon sx={{ fontSize: 30 }} />,
  },
  {
    name: "Smart TV",
    color: "bg-purple-500",
    icon: <TvIcon sx={{ fontSize: 30 }} />,
  },
  {
    name: "Temperatur",
    color: "bg-gray-500",
    icon: <DeviceThermostatIcon sx={{ fontSize: 30 }} />,
  },
];

export default function DeviceControlCard() {
  const [deviceStatus, setDeviceStatus] = useState({
    WiFi: false,
    "Smart TV": true,
    Temperatur: true,
  });

  // Hàm bật/tắt thiết bị
  const toggleDevice = (deviceName) => {
    setDeviceStatus((prevState) => ({
      ...prevState,
      [deviceName]: !prevState[deviceName],
    }));
  };

  return (
    <div className="bg-[#F7F1FF] p-4 rounded-xl space-y-4 shadow-md w-full">
      {devices.map((device) => (
        <div key={device.name} className="flex items-center gap-4">
          <div className={`${device.color} p-3 rounded-xl text-white`}>
            {device.icon}
          </div>

          <span className="text-xl font-medium text-gray-800">
            {device.name}
          </span>

          <div
            onClick={() => toggleDevice(device.name)}
            className={`w-14 h-7 flex items-center rounded-full cursor-pointer transition duration-300 ml-auto ${
              deviceStatus[device.name] ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                deviceStatus[device.name] ? "translate-x-7" : "translate-x-1"
              }`}
            >     
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
