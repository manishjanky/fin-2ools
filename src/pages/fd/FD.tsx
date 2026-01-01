import { useState } from 'react';
import type { FDInput, FDSummary as FDSummaryType } from '../../types/fd';
import { calculateFDReturns } from './utils/fdCalculator';
import Header from '../../components/common/Header';
import FDForm from './components/FDForm';
import FDSummary from './components/FDSummary';
import FDTable from './components/FDTable';

export default function FD() {
  const [summary, setSummary] = useState<FDSummaryType | null>(null);

  const handleCalculate = (input: FDInput) => {
    const result = calculateFDReturns(input);
    setSummary(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FD <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projections</span>
          </h1>
          <p className="text-lg text-purple-200">
            Calculate and analyze your Fixed Deposit returns with detailed year-wise breakdowns.
          </p>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <FDForm onCalculate={handleCalculate} />
        </section>

        {/* Results Section */}
        {summary && (
          <>
            {/* Summary Card */}
            <section className="mb-12">
              <FDSummary summary={summary} />
            </section>

            {/* Results Table */}
            <section>
              <FDTable data={summary.fyData} />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 mt-20 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-purple-300 text-sm">
            <p>&copy; 2026 FinTools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
