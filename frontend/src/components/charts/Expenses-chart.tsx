import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = () => {
  const { transactions } = useAppSelector((state: RootState) => state.transaction);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= sixMonthsAgo;
  });

  const categoryExpenses: { [category: string]: number } = {};

  recentTransactions.forEach((transaction) => {
    if (transaction.type === 'expense') {
      const category = transaction.category.name;
      if (!categoryExpenses[category]) {
        categoryExpenses[category] = 0;
      }
      categoryExpenses[category] += transaction.amount;
    }
  });

  const labels = Object.keys(categoryExpenses);
  const dataValues = Object.values(categoryExpenses);

  const totalExpenses = dataValues.reduce((sum, value) => sum + value, 0);

  const backgroundColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF5733',
    '#33FF57',
    '#FFC300',
    '#DAF7A6',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#000000',
          padding: 20,
          boxWidth: 15,
          boxHeight: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        padding: 12,
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        bodySpacing: 4,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalExpenses) * 100).toFixed(2);
            return `${label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white text-Grey-80 rounded shadow">
      <div className="flex justify-center items-center mb-4">
        <h3 className="text-lg font-accent font-semibold">Expenses vs Categories</h3>
      </div>

      <div className="relative w-full h-96">
        <Doughnut data={data} options={options} />
        <p className="absolute top-1/3 right-32 text-lg font-medium">${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ExpensesChart;
