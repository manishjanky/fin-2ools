interface PPFFormBasicsProps {
  startYear: number | null;
  onStartYearChange: (year: number | null) => void;
  interestRate: number;
  onInterestRateChange: (rate: number) => void;
  currentYear: number;
}

const PPFFormBasics = ({
  startYear,
  onStartYearChange,
  interestRate,
  onInterestRateChange,
  currentYear,
}: PPFFormBasicsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Start Year - REQUIRED */}
      <div>
        <label
          className="block font-medium mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Start Year <span style={{ color: 'var(--color-status-error)' }}>*</span>
        </label>
        <input
          type="number"
          value={startYear || ''}
          onChange={(e) => onStartYearChange(e.target.value ? parseInt(e.target.value) : null)}
          min="1900"
          max={currentYear}
          placeholder="Enter start year"
          className="w-full rounded-lg px-4 py-2 transition border"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: startYear ? 'var(--color-border-main)' : 'var(--color-status-error)',
            color: 'var(--color-text-primary)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary-main)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = startYear ? 'var(--color-border-main)' : 'var(--color-status-error)';
          }}
        />
        {!startYear && (
          <p className="text-xs mt-2" style={{ color: 'var(--color-status-error)' }}>
            Start year is required
          </p>
        )}
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
          onChange={(e) => onInterestRateChange(parseFloat(e.target.value))}
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
    </div>
  );
};

export default PPFFormBasics;
