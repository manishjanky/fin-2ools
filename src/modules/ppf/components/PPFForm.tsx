import { useState } from 'react';
import type { PPFContribution, PPFCalculationResult } from '../types/ppf';
import { calculatePPF } from '../utils/ppfCalculator';
import Modal from '../../../components/common/Modal';

interface PPFFormProps {
  onCalculate?: (result: PPFCalculationResult) => void;
}

const PPFForm = ({ onCalculate }: PPFFormProps) => {
  const currentYear = new Date().getFullYear();
  const PPF_MATURITY_YEARS = 15;
  const [startYear, setStartYear] = useState(currentYear - 1);
  const [interestRate, setInterestRate] = useState(7.25);
  const [fixedContribution, setFixedContribution] = useState('');
  const [variablePastContributions, setVariablePastContributions] = useState(false);
  const [yearlyContributions, setYearlyContributions] = useState<PPFContribution[]>(
    Array.from({ length: PPF_MATURITY_YEARS }, (_, i) => ({
      year: (currentYear - 1) + i,
      amount: 0,
    }))
  );

  const handleToggleVariableContributions = () => {
    setVariablePastContributions(!variablePastContributions);
    if (!variablePastContributions) {
      // Initialize yearly contributions when switching to variable (15 years from start year)
      const newContribs = Array.from({ length: PPF_MATURITY_YEARS }, (_, i) => ({
        year: startYear + i,
        amount: fixedContribution ? parseFloat(fixedContribution) : 0,
      }));
      setYearlyContributions(newContribs);
    }
  };

  const handleYearlyContributionChange = (year: number, amount: number) => {
    setYearlyContributions(prev =>
      prev.map(c => c.year === year ? { ...c, amount } : c)
    );
  };

  const handleApplyToFutureYears = (fromYear: number) => {
    const contribution = yearlyContributions.find(c => c.year === fromYear);
    if (contribution) {
      setYearlyContributions(prev =>
        prev.map(c => c.year > fromYear ? { ...c, amount: contribution.amount } : c)
      );
    }
  };

  const handleStartYearChange = (newStartYear: number) => {
    setStartYear(newStartYear);
    if (variablePastContributions) {
      const newContribs = Array.from({ length: PPF_MATURITY_YEARS }, (_, i) => ({
        year: newStartYear + i,
        amount: fixedContribution ? parseFloat(fixedContribution) : 0,
      }));
      setYearlyContributions(newContribs);
    }
  };

  const handleCalculate = () => {
    const contributions = variablePastContributions
      ? yearlyContributions
      : Array.from({ length: PPF_MATURITY_YEARS }, (_, i) => ({
        year: startYear + i,
        amount: fixedContribution ? parseFloat(fixedContribution) : 0,
      }));

    const result = calculatePPF(startYear, interestRate, contributions);
    onCalculate?.(result);
  };

  const handleClearVariableContributions = () => {
    setYearlyContributions(
      Array.from({ length: PPF_MATURITY_YEARS }, (_, i) => ({
        year: startYear + i,
        amount: 0,
      }))
    );
  };

  return (
    <div
      className="rounded-lg p-8"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-primary-lighter)',
      }}
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--color-text-primary)' }}
      >
        PPF Calculator
      </h2>
      <form className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Start Year */}
          <div>
            <label
              className="block font-medium mb-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Start Year
            </label>
            <input
              type="number"
              value={startYear}
              onChange={(e) => handleStartYearChange(parseInt(e.target.value))}
              min="1900"
              max={currentYear}
              className="w-full rounded-lg px-4 py-2 transition border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-main)',
                color: 'var(--color-text-primary)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary-main)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-main)';
              }}
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label
              className="block font-medium mb-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              min="0"
              step="0.01"
              className="w-full rounded-lg px-4 py-2 transition border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-main)',
                color: 'var(--color-text-primary)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary-main)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-main)';
              }}
            />
          </div>

          {
            !variablePastContributions && <div>
              <label
                className="block font-medium mb-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Yearly Contribution
              </label>
              <input
                type="number"
                value={fixedContribution}
                onChange={(e) => setFixedContribution(e.target.value)}
                min="0"
                step="0.01"
                placeholder="Yearly Contribution Amount (₹)"
                className="w-full rounded-lg px-4 py-2 transition border"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border-main)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary-main)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-main)';
                }}
              />
            </div>
          }

        </div>

        {
          variablePastContributions && (
            <Modal onClose={() => setVariablePastContributions(false)}>
              <h3
                className="font-bold text-xl mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Annual Contributions (15-Year Maturity Period - FY {startYear}-{startYear + 1} to FY {startYear + 14}-{startYear + 15})
              </h3>

              <div className='grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-4 rounded-lg' style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                {yearlyContributions.map((contrib, index) => (
                  <div key={contrib.year}>
                    <div className="flex justify-between items-center mb-2">
                      <label
                        className="block text-sm font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        FY {contrib.year}-{contrib.year + 1}
                      </label>
                      {index < yearlyContributions.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleApplyToFutureYears(contrib.year)}
                          className="text-xs px-2 py-1 rounded transition"
                          style={{
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-primary-main)',
                            border: '1px solid var(--color-primary-main)',
                          }}
                          title="Apply this year's value to all future years"
                        >
                          Apply to future →
                        </button>
                      )}
                    </div>
                    <input
                      type="number"
                      value={contrib.amount}
                      onChange={(e) => handleYearlyContributionChange(contrib.year, parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      placeholder="₹ 0"
                      className="w-full rounded-lg px-4 py-2 transition border"
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-main)',
                        color: 'var(--color-text-primary)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary-main)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-main)';
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className='w-full flex col-span-full justify-end gap-3 mt-6'>
                <button
                  onClick={handleClearVariableContributions}
                  type="button"
                  className="px-6 py-3 rounded-lg transition font-medium"
                  style={{
                    backgroundColor: 'var(--color-status-warning)',
                    color: 'var(--color-text-inverse)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setVariablePastContributions(false)}
                  type="button"
                  className="px-6 py-3 rounded-lg transition font-medium"
                  style={{
                    backgroundColor: 'var(--color-primary-main)',
                    color: 'var(--color-text-inverse)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-main)';
                  }}
                >
                  Done
                </button>
              </div>
            </Modal>

          )
        }
        <div className='block'>
          <button
            type="button"
            onClick={handleToggleVariableContributions}
            className="my-2 mr-2 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 text-lg"
            style={{
              background: 'linear-gradient(to right, var(--color-primary-main), var(--color-secondary-main))',
              color: 'var(--color-text-inverse)',
            }}
          >
            {variablePastContributions ? 'Use Fixed Contribution' : 'Variable Contributions'}
          </button>

          <button
            type="button"
            onClick={handleCalculate}
            className="my-2 ml-2 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 text-lg"
            style={{
              background: 'linear-gradient(to right, var(--color-primary-main), var(--color-secondary-main))',
              color: 'var(--color-text-inverse)',
            }}
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

export default PPFForm;