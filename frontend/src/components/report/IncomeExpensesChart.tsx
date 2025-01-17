import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeExpensesChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [9500, 7500, 8800, 7200, 9000, 9600],
        backgroundColor: "#3B82F6", // Blue
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Expenses",
        data: [9200, 8000, 8400, 7800, 8300, 9100],
        backgroundColor: "#FB923C", // Orange
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
      y: {
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
          borderDash: [3, 3],
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          callback: (value: any) => `$ ${value}`,
          stepSize: 2000,
          max: 10000,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: "center" as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          borderRadius: 4,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#6B7280",
        },
        margin: 20,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        padding: 12,
        titleColor: "#55565B",
        bodyColor: "#F3F4F6",
        bodySpacing: 4,
        boxWidth: 10,
        boxHeight: 10,
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white text-Grey-80 rounded shadow">
      {/* Chart Header */}
      <div className="flex justify-center items-center mb-4">
        <h3 className="text-lg font-medium">Income vs Expenses</h3>
      </div>

      {/* Chart Container */}
      <div className="w-full h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default IncomeExpensesChart;

