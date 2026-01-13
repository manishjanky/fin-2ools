import type { PPFCalculationResult } from '../types/ppf';
import PPFPieChart from './PPFPieChart';

interface PPFReturnsSummaryProps {
  result: PPFCalculationResult;
}

export default function PPFReturnsSummary({ result }: PPFReturnsSummaryProps) {
  return (
    <div
      className="rounded-lg overflow-hidden mt-8"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <div
        className="px-6 py-4"
        style={{
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <h2
          className="text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          PPF Returns Summary
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Investment overview and projected returns
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 p-6">
        {/* Left Section - Summary Details */}
        <div className="space-y-6">
          {/* Total Invested */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderLeft: '4px solid var(--color-accent-cyan)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Total Invested
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: 'var(--color-accent-cyan)' }}
            >
              ₹{result.totalInvested.toFixed(2)}
            </p>
          </div>

          {/* Interest Earned */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderLeft: '4px solid var(--color-success)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Interest Earned
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: 'var(--color-status-success)' }}
            >
              ₹{result.totalInterestEarned.toFixed(3)}
            </p>
          </div>

          {/* Maturity Amount */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderLeft: '4px solid var(--color-primary-main)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Maturity Amount
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: 'var(--color-primary-main)' }}
            >
              ₹{result.maturityAmount.toFixed(3)}
            </p>
          </div>

          {/* Absolute Return */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderLeft: '4px solid var(--color-secondary-main)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Absolute Returns Percentage
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: 'var(--color-secondary-main)' }}
            >
              {result.absolutReturnPercentage.toFixed(2)}%
            </p>
          </div>         
        </div>

        {/* Right Section - Pie Chart */}
        <div className="flex items-center justify-center">
          <PPFPieChart result={result} />
        </div>
      </div>
    </div>
  );
}
