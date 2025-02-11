import axios from "axios";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AcUnitIcon from "@mui/icons-material/AcUnit";

// Danh sách thiết bị với deviceId tương ứng
const devices = [
  { id: 1, name: "Ceiling Fan", color: "bg-orange-500", icon: <SettingsIcon sx={{ fontSize: 30 }} /> },
  { id: 2, name: "Light", color: "bg-purple-500", icon: <LightbulbIcon sx={{ fontSize: 30 }} /> },
  { id: 3, name: "Air Conditioner", color: "bg-gray-500", icon: <AcUnitIcon sx={{ fontSize: 30 }} /> },
];

export default function DeviceControlCard() {
  const [deviceStatus, setDeviceStatus] = useState({
    1: false, 
    2: true, 
    3: true,  
  });

  // Hàm toggle thiết bị và gọi API
  const toggleDevice = async (deviceId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/action/toggle/${deviceId}`);
      setDeviceStatus((prevState) => ({
        ...prevState,
        [deviceId]: !prevState[deviceId],
      }));
      
      console.log(response.data.message); 
    } catch (error) {
      console.error("Error toggling device:", error);
    }
  };

  return (
    <div className="bg-[#F7F1FF] p-4 rounded-xl space-y-4 shadow-md w-full">
      {devices.map((device) => (
        <div key={device.id} className="flex items-center gap-4">
          <div className={`${device.color} p-3 rounded-xl text-white`}>
            {device.icon}
          </div>

          <span className="text-xl font-medium text-gray-800">
            {device.name}
          </span>

          <div
            onClick={() => toggleDevice(device.id)}
            className={`w-14 h-7 flex items-center rounded-full cursor-pointer transition duration-300 ml-auto ${
              deviceStatus[device.id] ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                deviceStatus[device.id] ? "translate-x-7" : "translate-x-1"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
