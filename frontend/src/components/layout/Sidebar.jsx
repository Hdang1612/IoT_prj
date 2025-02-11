import { Link, useLocation } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { Typography } from "@mui/material";
function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className="w-[16rem] h-screen bg-[#09006F] flex flex-col items-center p-5 gap-[3rem] side_bar  ">
      <Link to="/" className="_nav home mb-[3.6rem] ">
        <HomeRoundedIcon sx={{ fontSize: 70, color: "#8F00FF" }} />
        <Typography className="nav_text home_text">SMART HOME</Typography>
      </Link>
      <Link
        to="/dashboard"
        className={`_nav ${isActive("/dashboard") ? "active" : ""}`}
      >
        <DashboardRoundedIcon sx={{ fontSize: 50, color: "#8F00FF" }} />
        <Typography className="nav_text">Dashboard</Typography>
      </Link>
      <Link
        to="/profile"
        className={`_nav ${isActive("/profile") ? "active" : ""}`}
      >
        <FeedRoundedIcon sx={{ fontSize: 50, color: "#8F00FF" }} />
        <Typography className="nav_text">Info</Typography>
      </Link>
    </div>
  );
}

export default Sidebar;
