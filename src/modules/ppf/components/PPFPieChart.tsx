import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { PPFCalculationResult } from '../types/ppf';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PPFPieChartProps {
  result: PPFCalculationResult;
}

interface TooltipContext {
  parsed: number;
}

export default function PPFPieChart({ result }: PPFPieChartProps) {
  const data = {
    labels: ['Total Invested', 'Interest Earned'],
    datasets: [
      {
        label: 'PPF Composition',
        data: [result.totalInvested, result.totalInterestEarned],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'var(--color-text-primary)',
          padding: 20,
          font: {
            size: 14,
            weight: 500 as unknown as 'bold' | 'normal',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context: TooltipContext) {
            const value = context.parsed;
            const total = result.totalInvested + result.totalInterestEarned;
            const percentage = ((value / total) * 100).toFixed(2);
            return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm">
        <Pie data={data} options={options as never} />
      </div>
    </div>
  );
}
