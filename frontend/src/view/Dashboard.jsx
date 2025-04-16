import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSensorData } from "../redux/data/DataSlice";

import { formatDateChart } from "../utils/date.js";

import { Typography, Box } from "@mui/material";

import DashBoardCard from "../components/DashBoardCard";
import DashBoardChart from "../components/DashBoardChart";
import DeviceControlCard from "../components/DeviceControlCard";
import ActivityHistory from "../components/ActivityList";
import ProfileModal from "../components/Profile";
import { profile } from "../utils/profile";
// import { sampleData } from "../utils/dummyData";

export default function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const sensorData = useSelector((state) => state.sensor.sensorData);
  const formattedSensorData = sensorData
    .map((item) => ({
      ...item,
      timestamp: formatDateChart(item.timestamp),
    }))
    .reverse();

  useEffect(() => {
    dispatch(
      getSensorData({ orderBy: "timestamp", orderType: "DESC", limit: 10 })
    );
  }, [dispatch]);
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
            className="card_group"
            sx={{ display: "flex", gap: "1rem", mb: "2rem" }}
          >
            <Box sx={{ width: "33.33%" }}>
              <DashBoardCard type="humidity" value={sensorData[0]?.humidity} unit="%" />
            </Box>
            <Box sx={{ width: "33.33%" }}>
              <DashBoardCard type="temperature" value={sensorData[0]?.temperature} unit="°C" />
            </Box>
            <Box sx={{ width: "33.33%" }}>
              <DashBoardCard type="light" value={sensorData[0]?.light_intensity} unit="Lux" />
            </Box>
          </Box>

          {/* Chart */}
          <Box className="data_chart" sx={{ backgroundColor: "#f9fafb" }}>
            <DashBoardChart data={formattedSensorData} />
          </Box>
        </Box>

        {/* Right Content */}
        <Box className="r_content" sx={{ width: "25%" }}>
          <Box sx={{ mb: "2rem" }}>
            <DeviceControlCard />
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
