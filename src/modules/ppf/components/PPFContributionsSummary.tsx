import type { PPFContribution } from '../types/ppf';

interface PPFContributionsSummaryProps {
  yearlyContributions: PPFContribution[];
  onEdit: () => void;
}

const PPFContributionsSummary = ({ yearlyContributions, onEdit }: PPFContributionsSummaryProps) => {
  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-main)',
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <h4
          className="font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Variable Contributions Summary
        </h4>
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 rounded-lg transition font-medium text-sm"
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
          ✎ Edit Contributions
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {yearlyContributions.map((contrib) => {
          const totalAmount = contrib.contributions.reduce((sum, c) => sum + c.amount, 0);
          const contributionCount = contrib.contributions.filter(c => c.amount > 0).length;
          return (
            <div
              key={contrib.year}
              className="flex justify-between items-start p-2 rounded"
              style={{ backgroundColor: 'var(--color-bg-primary)' }}
            >
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  FY {contrib.year}-{contrib.year + 1}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {contributionCount} contribution{contributionCount !== 1 ? 's' : ''} • Rate: {contrib.interestRate}%
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-primary-main)' }}
                >
                  ₹{(totalAmount).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PPFContributionsSummary;
