import { Bar } from "react-chartjs-2";
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import calculateCategoryExpensesCurrentPrevMonth from '../../utils/CurrentPrevMonthExpense';
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
   const { transactions } = useAppSelector((state: RootState) => state.transaction);
  const { currentMonthExpenses, prevMonthExpenses, categories } = calculateCategoryExpensesCurrentPrevMonth(transactions);

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Current Month",
        data: currentMonthExpenses,
        backgroundColor: "#4A90E2",
        barThickness: 20,
      },
      {
        label: "Previous Month",
        data: prevMonthExpenses,
        backgroundColor: "#50E3C2",
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
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
          callback: function (value: any) {
            return "$" + value;
          },
          color: "#4a5568",
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount",
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