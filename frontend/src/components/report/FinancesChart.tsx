import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancesChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [5000, 7200, 6500, 6000, 5500, 6800],
        borderColor: '#3B82F6', // blue
        backgroundColor: '#3B82F6',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: [7500, 4500, 5000, 3500, 7000, 9000],
        borderColor: '#FB923C', // orange
        backgroundColor: '#FB923C',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Savings',
        data: [4000, 5000, 4500, 3000, 7500, 7000],
        borderColor: '#22C55E', // green
        backgroundColor: '#22C55E',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
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
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
          borderDash: [3, 3],
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
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
        align: 'end' as const, // Updated: Correct align value
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          borderRadius: 4,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#6B7280',
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
    <div className="h-full w-full">
      <div className="h-full w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancesChart;
