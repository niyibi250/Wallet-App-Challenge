import React from "react";
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

const BudgetStatisticsChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Budget",
        data: [9000, 8500, 8700, 8800, 8900, 9100],
        backgroundColor: "#38A169",
        barThickness: 10,
        borderRadius: 5,
      },
      {
        label: "Expenses",
        data: [8000, 6000, 7000, 7500, 7600, 8700],
        backgroundColor: "#ED8936",
        barThickness: 30,
        borderRadius: 5,
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
        text: "Budget Statistics",
        color: "#2d3748",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#4a5568",
          callback: (value: number) => `$${value}`,
        },
        beginAtZero: true,
        title: {
          display: true,
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

export default BudgetStatisticsChart;

