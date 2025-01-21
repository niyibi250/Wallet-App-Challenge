import { Line } from "react-chartjs-2";
import {prepareIncomeExpenseDataForGraph} from '../../utils/calculateIncomeAndExpensesoverperiod'
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
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
  const { transactions } = useAppSelector((state: RootState) => state.transaction);
  const incomeAndExpenses = prepareIncomeExpenseDataForGraph(transactions, 6);
  
  const data = {
    labels: incomeAndExpenses.map(item => item.month),
    datasets: [
      {
        label: "Income",
        data: incomeAndExpenses.map(item => item.income),
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: incomeAndExpenses.map(item => item.expense),
        borderColor: "#F97316",
        backgroundColor: "#F97316",
        tension: 0.4,
      },
      {
        label: "Savings",
        data: incomeAndExpenses.map(item => item.saving),
        borderColor: "#22C55E",
        backgroundColor: "#22C55E",
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
        color: "#55565b",
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

