import type { FYData } from '../../../types/fd';

interface FDTableProps {
  data: FYData[];
}

export default function FDTable({ data }: FDTableProps) {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-500/30">
        <h2 className="text-2xl font-bold text-white">Financial Year-wise Breakdown</h2>
        <p className="text-purple-200 text-sm mt-1">Interest earned and balance details for each financial year</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800/50 border-b border-purple-500/30">
              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Financial Year</th>
              <th className="px-6 py-4 text-right text-purple-200 font-semibold">Opening Balance</th>
              <th className="px-6 py-4 text-right text-purple-200 font-semibold">Interest Earned</th>
              <th className="px-6 py-4 text-right text-purple-200 font-semibold">Closing Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-purple-500/20 hover:bg-purple-500/10 transition ${
                  index % 2 === 0 ? 'bg-slate-900/30' : ''
                }`}
              >
                <td className="px-6 py-4 text-white font-medium">{row.fyYear}</td>
                <td className="px-6 py-4 text-right text-cyan-300">
                  ₹{row.startBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right text-green-300 font-semibold">
                  ₹{row.interestEarned.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right text-purple-300 font-semibold">
                  ₹{row.endBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Totals */}
      <div className="bg-slate-800/50 border-t border-purple-500/30 px-6 py-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-purple-300 text-sm">Total Interest Earned</p>
            <p className="text-2xl font-bold text-green-300 mt-1">
              ₹{data.reduce((sum, row) => sum + row.interestEarned, 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-purple-300 text-sm">Spread over Financial Years</p>
            <p className="text-2xl font-bold text-white mt-1">{data.length}</p>
          </div>
          <div>
            <p className="text-purple-300 text-sm">Final Balance</p>
            <p className="text-2xl font-bold text-purple-300 mt-1">
              ₹{(data[data.length - 1]?.endBalance || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
