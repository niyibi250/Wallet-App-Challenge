import { Bar } from "react-chartjs-2";
import calculateIncomeAndExpenses from "../../utils/calculateIncomeAndExpensesoverperiod"; // Adjust the import as necessary
import { useTransactions } from '../../utils/TransactionsContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IncomeAndExpensesResult {
  income: number[];
  expenses: number[];
  months: string[];
}

const IncomeExpensesChart = () => {
  const { transactions } = useTransactions();

  const incomeAndExpenses: IncomeAndExpensesResult = calculateIncomeAndExpenses(transactions, 6);
  console.log(incomeAndExpenses);
  
  const data = {
    labels: incomeAndExpenses.months,
    datasets: [
      {
        label: "Income",
        data: incomeAndExpenses.income,
        backgroundColor: "#3B82F6", // Blue
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Expenses",
        data: incomeAndExpenses.expenses,
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
