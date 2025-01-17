import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = () => {
  const data = {
    labels: ["Food", "Health", "Utilities", "Car", "Education", "Clothes"],
    datasets: [
      {
        data: [31, 27, 22, 11, 6, 3], // Percentage distribution
        backgroundColor: [
          "#FACC15", // Food - Yellow
          "#A855F7", // Health - Purple
          "#3B82F6", // Utilities - Blue
          "#EF4444", // Car - Red
          "#22C55E", // Education - Green
          "#F97316", // Clothes - Orange
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "80%", // Creates the donut shape
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center w-full h-full">
      <h3 className="text-lg font-bold font-accent text-Grey-80 mb-2">Expenses</h3>
      <div className="relative w-56 h-56">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">$4,540.20</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesChart;
