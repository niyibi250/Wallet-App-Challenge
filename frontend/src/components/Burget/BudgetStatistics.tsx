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
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetStatistics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("6 months");

  const data = [
    { month: "Jan", budget: 8000, expenses: 7800 },
    { month: "Feb", budget: 7500, expenses: 6200 },
    { month: "Mar", budget: 7200, expenses: 7000 },
    { month: "Apr", budget: 7500, expenses: 7200 },
    { month: "May", budget: 7500, expenses: 6500 },
    { month: "Jun", budget: 8000, expenses: 8200 },
  ];

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Budget",
        data: data.map((item) => item.budget),
        backgroundColor: "#22c55e",
        borderRadius: 5,
        barPercentage: 0.6,
      },
      {
        label: "Expenses",
        data: data.map((item) => item.expenses),
        backgroundColor: "#fb923c",
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#55565B",
          font: {
            size: 12, weight: 700
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$ ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#55565B",
          font: { size: 13, weight: 700 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#55565B",
          font: { size: 13, weight: 700 },
          callback: (tickValue: string | number) => `$ ${tickValue.toLocaleString()}`,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-full p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200 font-bold font-accent">
        <h3 className="text-lg  text-Grey-80">Budget Statistics</h3>
        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-Grey-80">Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="text-Grey-80">Expenses</span>
            </div>
          </div>
          {/* Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm text-Grey-80 hover:bg-gray-100 px-2 py-1 rounded"
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedPeriod}
              <FaChevronDown />
            </button>
            <div
              className={`absolute z-10 w-fit bg-white rounded shadow-md py-1 ${isOpen ? "block" : "hidden"}`}
              id="dropdown"
              role="menu"
            >
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-Grey-5 ${selectedPeriod === "3 months" ? "bg-gray-100" : ""}`}
                onClick={() => {
                  setSelectedPeriod("3 months");
                  setIsOpen(false);
                }}
              >
                3 months
              </a>
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-Grey-5 ${selectedPeriod === "6 months" ? "bg-gray-100" : ""}`}
                onClick={() => {
                  setSelectedPeriod("6 months");
                  setIsOpen(false);
                }}
              >
                6 months
              </a>
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-Grey-5 ${selectedPeriod === "12 months" ? "bg-gray-100" : ""}`}
                onClick={() => {
                  setSelectedPeriod("12 months");
                  setIsOpen(false);
                }}
              >
                12 months
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 font-accent font-bold">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BudgetStatistics;

