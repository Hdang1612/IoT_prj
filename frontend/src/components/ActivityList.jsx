import NotificationsIcon from "@mui/icons-material/Notifications";
import FlashOnIcon from "@mui/icons-material/FlashOn";

function ActivityHistory({ activities }) {
  return (
    <div className="bg-[#F7F1FF] p-4 rounded-xl shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-400 text-white rounded-full">
            <NotificationsIcon />
          </div>
          <h2 className="text-xl font-extrabold text-black">Activities</h2>
        </div>
        <button className="text-md cursor-pointer text-blue-500 hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        {activities?.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <FlashOnIcon className="text-yellow-500" />
              <div>
                <p className="font-medium text-[1.2rem]">{activity.message || "Không có nội dung"}</p>
                <p className="text-sm text-gray-500">{activity.date || "Chưa xác định"}</p>
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
