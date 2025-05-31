import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { getSensorData } from "../redux/data/DataSlice";

import { formatDateChart } from "../utils/date.js";

import { Typography, Box } from "@mui/material";

import DashBoardCard from "../components/DashBoardCard";
import DashBoardChart from "../components/DashBoardChart";
import DeviceControlCard from "../components/DeviceControlCard";
import ActivityHistory from "../components/ActivityList";
import ProfileModal from "../components/Profile";
import { profile } from "../utils/profile";
import webSocketService from "../service/webSocket.js";
// import { sampleData } from "../utils/dummyData";

export default function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false);
  const [sensorDataWs, setSensorDataWs] = useState([]);
  useEffect(() => {
    const wsUrl = "ws://localhost:8000";
    webSocketService.connect(wsUrl);

    webSocketService.onMessage((newData) => {
      if (newData.type === "device_status") {
        // xử lý riêng device_status tại đây (nếu cần)
        return;
      }
      const formattedData = {
        ...newData,
        timestamp: formatDateChart(newData.timestamp),
      };
      setSensorDataWs((prevData) => {
        const updatedData = [...prevData, formattedData];

        // Giới hạn số điểm hiển thị
        if (updatedData.length > 10) {
          updatedData.shift();
        }

        return updatedData;
      });
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);
  const latestData = sensorDataWs[sensorDataWs.length - 1];
  return (
    <Box>
      {/* Header */}
      <Box
        className="dashboard_header"
        sx={{ height: "8rem", display: "flex", gap: "3rem", mb: "2rem" }}
      >
        <Box sx={{ width: "66.66%" }}></Box>
        <Box
          className="user"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            cursor: "pointer",
          }}
          onClick={() => setOpenProfile(true)}
        >
          <img
            className="w-[8.5rem] h-[8.5rem] rounded-full"
            src="/assets/476159892_606573272129995_3942815568264271579_n.jpg"
            alt="user"
          />
          <Typography sx={{ fontSize: "2.2rem" }}>{profile.name}</Typography>
        </Box>
      </Box>

      {/* Overview */}
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: 700,
          fontSize: "2rem",
          mb: "0.75rem",
        }}
      >
        Overview
      </Typography>

      {/* Dashboard Content */}
      <Box className="dashboard_content" sx={{ display: "flex" }}>
        {/* Left Content */}
        <Box className="l_content" sx={{ width: "66.66%", mr: "3rem" }}>
          <Box
            className="card_group flex-wrap"
            sx={{ display: "flex", gap: "1rem", mb: "2rem" }}
          >
            <Box sx={{ width: "30%" }}>
              <DashBoardCard
                type="humidity"
                value={latestData?.humidity}
                unit="%"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <DashBoardCard
                type="temperature"
                value={latestData?.temperature}
                unit="°C"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <DashBoardCard
                type="light"
                value={latestData?.light_level}
                unit="Lux"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <DashBoardCard type="wind" value={latestData?.wind} unit="m/s" />
            </Box>
          </Box>

          {/* Chart */}
          <Box className="data_chart" sx={{ backgroundColor: "#f9fafb" }}>
            <DashBoardChart data={sensorDataWs} />
          </Box>
        </Box>

        {/* Right Content */}
        <Box className="r_content" sx={{ width: "25%" }}>
          <Box sx={{ mb: "2rem" }}>
            <DeviceControlCard wind={latestData?.wind} />
          </Box>
          <Box>
            <ActivityHistory />
          </Box>
        </Box>
      </Box>

      {/* Profile Modal */}
      <ProfileModal
        open={openProfile}
        handleClose={() => setOpenProfile(false)}
        profile={profile}
      />
    </Box>
  );
}
