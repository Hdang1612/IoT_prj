import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { Typography, Box, IconButton, TextField } from "@mui/material";

import DashBoardCard from "../components/DashBoardCard";
import DashBoardChart from "../components/DashBoardChart";
import DeviceControlCard from "../components/DeviceControlCard";
import ActivityHistory from "../components/ActivityList";
import ProfileModal from "../components/Profile";
import { profile } from "../utils/profile";
const sampleData = [
  { timestamp: "10:00", humidity: 65, temperature: 28, light_itensity: 100 },
  { timestamp: "10:05", humidity: 66, temperature: 27, light_itensity: 115 },
  { timestamp: "10:10", humidity: 64, temperature: 29, light_itensity: 130 },
  { timestamp: "10:15", humidity: 63, temperature: 30, light_itensity: 125 },
  { timestamp: "10:20", humidity: 67, temperature: 28, light_itensity: 118 },
  { timestamp: "10:25", humidity: 62, temperature: 26, light_itensity: 110 },
  { timestamp: "10:30", humidity: 68, temperature: 29, light_itensity: 135 },
  { timestamp: "10:35", humidity: 70, temperature: 31, light_itensity: 140 },
  { timestamp: "10:40", humidity: 66, temperature: 27, light_itensity: 120 },
  { timestamp: "10:45", humidity: 65, temperature: 28, light_itensity: 122 },
];

export default function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <Box>
      {/* Header */}
      <Box
        className="dashboard_header"
        sx={{ height: "8rem", display: "flex", gap: "3rem", mb: "2rem" }}
      >
        {/* Search Bar */}
        <Box
          className="search__bar"
          sx={{
            width: "66.66%",
            height: "100%",
            backgroundColor: "#EDEDED",
            borderRadius: "5rem",
            display: "flex",
            alignItems: "center",
            pl: "2.5rem",
          }}
        >
          <IconButton>
            <SearchIcon sx={{ fontSize: 38, mr: "2rem" }} />
          </IconButton>
          <TextField
            placeholder="Tìm kiếm"
            variant="standard"
            InputProps={{ disableUnderline: true, sx: { fontSize: "2rem" } }}
            fullWidth
          />
        </Box>

        {/* User Profile */}
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
              <DashBoardCard type="humidity" value={65} unit="%" />
            </Box>
            <Box sx={{ width: "33.33%" }}>
              <DashBoardCard type="temperature" value={28} unit="°C" />
            </Box>
            <Box sx={{ width: "33.33%" }}>
              <DashBoardCard type="light" value={1200} unit="Lux" />
            </Box>
          </Box>

          {/* Chart */}
          <Box className="data_chart" sx={{ backgroundColor: "#f9fafb" }}>
            <DashBoardChart data={sampleData} />
          </Box>
        </Box>

        {/* Right Content */}
        <Box className="r_content" sx={{ width: "25%" }}>
          <Box sx={{ mb: "2rem" }}>
            <DeviceControlCard />
          </Box>
          <Box>
            <ActivityHistory  />
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
