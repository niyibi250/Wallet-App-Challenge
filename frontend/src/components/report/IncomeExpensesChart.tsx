import { Bar } from "react-chartjs-2";
import { prepareIncomeExpenseDataForGraph } from "../../utils/calculateIncomeAndExpensesoverperiod";
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeExpensesChart = () => {
  const { transactions } = useAppSelector((state: RootState) => state.transaction);

  const incomeAndExpenses = prepareIncomeExpenseDataForGraph(transactions, 6);

  const labels = incomeAndExpenses.map((data) => data.month);
  const datasets = [
    {
      label: "Income",
      data: incomeAndExpenses.map((data) => data.income as number),
      backgroundColor: "#3B82F6",
      borderRadius: 4,
      barPercentage: 0.8,
      categoryPercentage: 0.4,
    },
    {
      label: "Expenses",
      data: incomeAndExpenses.map((data) => data.expense as number),
      backgroundColor: "#FB923C",
      borderRadius: 4,
      barPercentage: 0.8,
      categoryPercentage: 0.4,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
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
        stacked: false,
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
          stepSize: 100,
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
      },
      tooltip: {
        backgroundColor: "#1F2937",
        padding: 12,
        titleColor: "#F3F4F6",
        bodyColor: "#F3F4F6",
        bodySpacing: 4,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $ ${context.parsed.y}`;
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    hover: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="w-full p-6 bg-white text-Grey-80 rounded shadow">
      <div className="flex justify-center items-center mb-4">
        <h3 className="text-lg font-medium">Income vs Expenses</h3>
      </div>

      <div className="w-full h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default IncomeExpensesChart;

