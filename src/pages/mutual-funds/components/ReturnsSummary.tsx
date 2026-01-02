import type { ReturnsMetrics } from '../../../types/mutual-funds';

interface ReturnsSummaryProps {
  selectedMetric: ReturnsMetrics;
}

export default function ReturnsSummary({ selectedMetric }: ReturnsSummaryProps) {
  const isPositive = selectedMetric.percentageReturn >= 0;

  return (
    <div className="space-y-6">
      {/* Main Return Value */}
      <div>
        <h3 className="text-purple-300 text-sm mb-3">
          Absolute Returns for {selectedMetric.timeframeLabel}
        </h3>
        <div className="md:flex sm:items-start md:items-baseline gap-4">
          <p
            className={`text-4xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'
              }`}
          >
            {isPositive ? '+' : ''}
            {selectedMetric.percentageReturn.toFixed(2)}%
          </p>
          <p
            className={`text-2xl font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'
              }`}
          >
            {isPositive ? '+' : ''}₹{selectedMetric.absoluteReturn.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-blue-300 text-xs mb-1">Start NAV</p>
          <p className="text-white font-semibold text-lg">
            ₹{selectedMetric.startNav.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-cyan-300 text-xs mb-1">Current NAV</p>
          <p className="text-white font-semibold text-lg">
            ₹{selectedMetric.endNav.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-purple-300 text-xs mb-1">Absolute Return</p>
          <p
            className={`font-semibold text-lg ${isPositive ? 'text-green-400' : 'text-red-400'
              }`}
          >
            {isPositive ? '+' : ''}₹{selectedMetric.absoluteReturn.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-purple-300 text-xs mb-1">Percentage Return</p>
          <p
            className={`font-semibold text-lg ${isPositive ? 'text-green-400' : 'text-red-400'
              }`}
          >
            {isPositive ? '+' : ''}
            {selectedMetric.percentageReturn.toFixed(2)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-green-300 text-xs mb-1">CAGR</p>
          <p
            className={`font-semibold text-lg ${selectedMetric.cagr >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
          >
            {selectedMetric.cagr >= 0 ? '+' : ''}
            {selectedMetric.cagr.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
