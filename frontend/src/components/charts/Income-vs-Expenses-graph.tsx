import { Line } from "react-chartjs-2";
import calculateIncomeAndExpenses from "../../utils/calculateIncomeAndExpensesoverperiod";
import { useTransactions } from '../../utils/TransactionsContext';
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
interface IncomeAndExpensesResult {
  income: number[];
  expenses: number[];
  months: string[];
}

const StatisticsChart = () => {
  const { transactions } = useTransactions();

  const incomeAndExpenses: IncomeAndExpensesResult = calculateIncomeAndExpenses(transactions, 6);
  console.log(incomeAndExpenses);

  const data = {
    labels: incomeAndExpenses.months,
    datasets: [
      {
        label: "Income",
        data: incomeAndExpenses.income,
        borderColor: "#3B82F6", // Blue
        backgroundColor: "#3B82F6",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: incomeAndExpenses.expenses,
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
