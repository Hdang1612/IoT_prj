import OpacityIcon from "@mui/icons-material/Opacity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LightModeIcon from "@mui/icons-material/LightMode";

const iconMap = {
  humidity: <OpacityIcon sx={{ fontSize: 40 }} className="text-blue-500" />,
  temperature: <WbSunnyIcon sx={{ fontSize: 40 }} className="text-red-500" />,
  light: <LightModeIcon sx={{ fontSize: 40 }} className="text-yellow-500" />,
};
function DashBoardCard({ type, value, unit }) {
  return (
    <div className="h-[10rem] p-4 bg-[#F7F1FF] shadow-lg rounded-2xl flex border-[1px] border-gray-200 items-center space-x-4 hover:shadow-xl transition duration-300">
      <div className="p-3 bg-[#fff] rounded-full me-[2rem] ">
        {iconMap[type]}
      </div>
      <div>
        <h3 className="text-[2rem] font-semibold capitalize">
          {type === "humidity"
            ? "Humidity"
            : type === "temperature"
            ? "Temperature"
            : "Light intensity"}
        </h3>
        <p className="text-3xl font-bold text-gray-700">
          {value} <span className="text-base text-gray-500">{unit}</span>
        </p>
      </div>
    </div>
  );
}

export default DashBoardCard;
