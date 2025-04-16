import { useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date.js";

function ActivityHistory() {
  const actionLogs = useSelector((state) => state.device.actionLogs);
  return (
    <div className="bg-[#F7F1FF] p-4 rounded-xl shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-400 text-white rounded-full">
            <NotificationsIcon />
          </div>
          <h2 className="text-xl font-extrabold text-black">Activities</h2>
        </div>
        <Link to="/profile" className="text-md cursor-pointer text-blue-500 hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {actionLogs?.length > 0 ? (
          actionLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 bg-white rounded-md shadow-sm"
            >
              <FlashOnIcon className="text-yellow-500" />
              <div>
                <p className="font-medium text-[1.2rem]">
                  {`Turn ${log.action} the ${log.device_name}`}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(log.timestamp) || "NAN"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Không có hoạt động nào</p>
        )}
      </div>
    </div>
  );
}

export default ActivityHistory;
