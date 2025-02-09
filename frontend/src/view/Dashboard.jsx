import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { Typography } from "@mui/material";

import DashBoardCard from "../components/DashBoardCard";
import DashBoardChart from "../components/DashBoardChart";
import DeviceControlCard from "../components/DeviceControlCard";
import ActivityHistory from "../components/ActivityList";
import ProfileModal from "../components/Profile";
import avatar from "../assets/476159892_606573272129995_3942815568264271579_n.jpg"

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
const activities = [
  { message: "Bật đèn phòng khách", date: "2025-02-09 10:00" },
  { message: "Tắt TV", date: "2025-02-09 12:00" },
];
const profile = {
  avatar: avatar,
  name: "Tô Hải Đăng",
  studentId: "B21DCPT068",
  github: "https://github.com/Hdang1612",
  facebook: "https://www.facebook.com/h.dangg161203/",
  twitter: "https://www.figma.com/design/zIrIV192TicIQylEXokQv3/iot-dashboard-(Community)?node-id=1-2&t=OZms8QVcwZWUIMsQ-0",
};

function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div>
      <div className="dashboard_header h-[8rem] flex gap-[3rem] mb-[2rem] ">
        <div className="search__bar w-2/3 h-full bg-[#EDEDED] rounded-[5rem] flex items-center ps-10 ">
          <SearchIcon sx={{ fontSize: 38, marginRight: "2rem" }} />
          <input
            placeholder="Tìm kiếm"
            className="outline-none text-[2rem] w-full"
            type="text"
          />
        </div>
        <div className="user h full flex items-center gap-5 cursor-pointer" onClick={() => setOpenProfile(true)}>
          <img
            className="w-[8.5rem] h-[8.5rem] rounded-full"
            src="public/assets/476159892_606573272129995_3942815568264271579_n.jpg"
            alt="user"
          />
          <Typography sx={{ fontSize: "2.2rem" }}>To Hai Dang</Typography>
        </div>
      </div>
      <p className="uppercase font-[700] text-[2rem] mb-3">Overview</p>
      <div className="dashboard_content flex ">
        <div className="l_content w-2/3 me-[3rem]">
          <div className="card_group flex gap-[1rem] mb-[2rem]">
            <div className="w-1/3">
              <DashBoardCard type="humidity" value={65} unit="%" />
            </div>
            <div className="w-1/3">
              <DashBoardCard type="temperature" value={28} unit="°C" />
            </div>
            <div className="w-1/3">
              <DashBoardCard type="light" value={1200} unit="Lux" />
            </div>
          </div>
          <div className="data_chart  bg-gray-50 ">
            <DashBoardChart data={sampleData} />
          </div>
        </div>
        <div className="r_content w-1/4">
          <div className="mb-[2rem]">
            <DeviceControlCard />
          </div>
          <div>
            <ActivityHistory activities={activities} />
          </div>
        </div>
      </div>
      <ProfileModal
        open={openProfile}
        handleClose={() => setOpenProfile(false)}
        profile={profile}
      />
    </div>
  );
}

export default Dashboard;
