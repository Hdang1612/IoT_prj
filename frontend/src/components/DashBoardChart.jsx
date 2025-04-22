import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashBoardChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: "Humidity (%)",
        data: data.map((item) => item.humidity),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.temperature),
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Light Intensity (Lux)",
        data: data.map((item) => item.light_level),
        borderColor: "#FACC15",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[40rem] p-4 bg-[#F7F1FF] shadow-md rounded-2xl">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default DashBoardChart;
