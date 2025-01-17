import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesCompared = () => {
  const data = {
    labels: ["Clothes", "Car", "Health", "Education", "Utilities", "Food"],
    datasets: [
      {
        label: "March",
        data: [800, 600, 500, 700, 900, 1000],
        backgroundColor: "#4A90E2",
        barThickness: 20,
      },
      {
        label: "February",
        data: [700, 500, 400, 600, 800, 900],
        backgroundColor: "#50E3C2",
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4a5568",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Expenses Compare to Previous Month",
        color: "#55565B",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
          color: "#4a5568",
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "",
          color: "#4a5568",
        },
      },
      x: {
        ticks: {
          color: "#4a5568",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesCompared;

