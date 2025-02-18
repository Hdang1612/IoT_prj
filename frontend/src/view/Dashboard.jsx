import { useState } from "react";

import { Typography, Box } from "@mui/material";

import DashBoardCard from "../components/DashBoardCard";
import DashBoardChart from "../components/DashBoardChart";
import DeviceControlCard from "../components/DeviceControlCard";
import ActivityHistory from "../components/ActivityList";
import ProfileModal from "../components/Profile";
import { profile } from "../utils/profile";
import { sampleData } from "../utils/dummyData";

export default function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <Box>
      {/* Header */}
      <Box
        className="dashboard_header"
        sx={{ height: "8rem", display: "flex", gap: "3rem", mb: "2rem" }}
      >
        <Box sx={{ width: "66.66%" }}></Box>
        {/* Search Bar */}
        {/* <Box
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
        </Box> */}

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
