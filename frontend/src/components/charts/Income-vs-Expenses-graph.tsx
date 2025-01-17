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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatisticsChart = () => {
  const data = {
    labels: ["Dec 1", "Dec 2", "Dec 3", "Dec 4", "Dec 5", "Dec 6", "Dec 7"],
    datasets: [
      {
        label: "Income",
        data: [2000, 3000, 1500, 4000, 3500, 4500, 3000],
        borderColor: "#3B82F6", // Blue
        backgroundColor: "#3B82F6",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: [1500, 2500, 2000, 3000, 4000, 3500, 2500],
        borderColor: "#F97316", // Orange
        backgroundColor: "#F97316",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Income vs Expenses",
        color: "#55565B",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => `$ ${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default StatisticsChart;
