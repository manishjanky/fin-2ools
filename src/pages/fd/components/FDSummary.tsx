import type { FDSummary as FDSummaryType } from '../../../types/fd';

interface FDSummaryProps {
  summary: FDSummaryType;
}

export default function FDSummary({ summary }: FDSummaryProps) {
  const principal = summary.maturityAmount - summary.totalInterestEarned;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Principal Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-blue-200 font-semibold">Principal</h3>
          <span className="text-2xl">💰</span>
        </div>
        <p className="text-3xl font-bold text-white">
          ₹{principal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </p>
        <p className="text-blue-300 text-sm mt-2">Initial investment</p>
      </div>

      {/* Total Interest Card */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 hover:border-green-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-green-200 font-semibold">Total Interest</h3>
          <span className="text-2xl">📈</span>
        </div>
        <p className="text-3xl font-bold text-white">
          ₹{summary.totalInterestEarned.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </p>
        <p className="text-green-300 text-sm mt-2">Total earnings</p>
      </div>

      {/* Maturity Amount Card */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-purple-200 font-semibold">Maturity Amount</h3>
          <span className="text-2xl">🎯</span>
        </div>
        <p className="text-3xl font-bold text-white">
          ₹{summary.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </p>
        <p className="text-purple-300 text-sm mt-2">Total at maturity</p>
      </div>
    </div>
  );
}
