import { useState } from 'react';
import type { FDInput, FDSummary as FDSummaryType } from '../../../types/fd';
import { calculateFDReturns } from '../utils/fdCalculator';
import FDSummary from './FDSummary';
import FDTable from './FDTable';


export default function FDForm() {
  const [formData, setFormData] = useState<FDInput>({
    startDate: new Date().toISOString().split('T')[0],
    principal: 100000.00,
    rate: 7.50,
    tenureYears: 5,
    tenureMonths: 0,
    tenureDays: 0,
    compounding: 'annually',
    payoutType: 'maturity',
  });
  const [summary, setSummary] = useState<FDSummaryType | null>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof FDInput;

    setFormData((prev) => ({
      ...prev,
      [key]:
        key === 'principal' || key === 'rate' || key === 'tenureYears' || key === 'tenureMonths' || key === 'tenureDays'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateFDReturns(formData);
    setSummary(result);
  };

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6">FD Calculator</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Start Date */}
          <div>
            <label className="block text-purple-200 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Principal Amount */}
          <div>
            <label className="block text-purple-200 font-medium mb-2">
              Principal Amount (₹)
            </label>
            <input
              type="number"
              name="principal"
              value={formData.principal}
              onChange={handleChange}
              min="1000"
              step="0.01"
              className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-purple-200 font-medium mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Tenure Section */}
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6">
          <label className="block text-purple-200 font-semibold mb-4">
            Tenure
          </label>
          <div className="grid grid-cols-3 gap-4">
            {/* Tenure - Years */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Years
              </label>
              <input
                type="number"
                name="tenureYears"
                value={formData.tenureYears}
                onChange={handleChange}
                min="0"
                max="50"
                step="0.01"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Tenure - Months */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Months
              </label>
              <input
                type="number"
                name="tenureMonths"
                value={formData.tenureMonths}
                onChange={handleChange}
                min="0"
                max="11"
                step="0.01"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Tenure - Days */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Days
              </label>
              <input
                type="number"
                name="tenureDays"
                value={formData.tenureDays}
                onChange={handleChange}
                min="0"
                max="31"
                step="0.01"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Compounding Frequency */}
          <div>
            <label className="block text-purple-200 font-medium mb-2">
              Compounding Frequency
            </label>
            <select
              name="compounding"
              value={formData.compounding}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="halfYearly">Half-Yearly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          {/* Payout Type */}
          <div>
            <label className="block text-purple-200 font-medium mb-2">
              Payout Type
            </label>
            <select
              name="payoutType"
              value={formData.payoutType}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="maturity">At Maturity</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 text-lg"
        >
          Calculate FD Returns
        </button>
      </form>


      {/* Results Section */}
      {summary && (
        <>
          {/* Summary Card */}
          <section className="mb-12 mt-12">
            <FDSummary summary={summary} />
          </section>

          {/* Results Table */}
          <section>
            <FDTable data={summary.fyData} />
          </section>
        </>
      )}
    </div>
  );
}
