import type { PPFSingleContribution } from '../types/ppf';

interface PPFYearContributionEditorProps {
    year: number;
    interestRate: number;
    onInterestRateChange: (rate: number) => void;
    contributions: PPFSingleContribution[];
    onContributionChange: (index: number, amount: number, date: string) => void;
    onAddContribution: () => void;
    onRemoveContribution: (index: number) => void;
    onApplyRateToFuture?: () => void;
    isNotLastYear: boolean;
}

const PPFYearContributionEditor = ({
    year,
    interestRate,
    onInterestRateChange,
    contributions,
    onContributionChange,
    onAddContribution,
    onRemoveContribution,
    onApplyRateToFuture,
    isNotLastYear,
}: PPFYearContributionEditorProps) => {
    const totalAmount = contributions.reduce((sum, c) => sum + c.amount, 0);
    const maxAllowed = 150000;
    const remainingLimit = maxAllowed - totalAmount;

    return (
        <div
            className="border rounded-lg p-4"
            style={{ borderColor: 'var(--color-border-main)' }}
        >
            <div className="mb-4">
                <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    FY {year}-{year + 1}
                </label>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    Total contributions: ₹{totalAmount.toFixed(2)} / ₹150,000
                </p>
            </div>

            {/* Interest Rate Input */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label
                        className="block text-sm font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Interest Rate (% per annum)
                    </label>
                    {isNotLastYear && (
                        <button
                            type="button"
                            onClick={onApplyRateToFuture}
                            className="text-xs px-2 py-1 rounded transition"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-primary-main)',
                                border: '1px solid var(--color-primary-main)',
                            }}
                            title="Apply this year's rate to all future years"
                        >
                            Apply to future →
                        </button>
                    )}
                </div>
                <input
                    type="number"
                    value={interestRate || ''}
                    onChange={(e) => onInterestRateChange(parseFloat(e.target.value) || 0)}
                    step="0.01"
                    placeholder="7.25"
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

            {/* Contributions List */}
            <div className="mb-4 space-y-3">
                {contributions.map((contrib, index) => (
                    <>
                        <div
                            key={index}
                            className="p-3 rounded-lg flex gap-3 items-center"
                            style={{ backgroundColor: 'var(--color-bg-primary)' }}

                        >
                            <div className="flex-1">
                                <label
                                    className="block text-xs font-medium mb-1"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Contribution {index + 1} - Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={contrib.amount}
                                    onChange={(e) =>
                                        onContributionChange(index, parseFloat(e.target.value), contrib.date || '')
                                    }
                                    max={remainingLimit + contrib.amount}
                                    step="0.01"
                                    placeholder="0"
                                    className="w-full rounded px-3 py-1 transition border"
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

                            <div className="flex-1">
                                <label
                                    className="block text-xs font-medium mb-1"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    value={contrib.date || ''}
                                    onChange={(e) => onContributionChange(index, contrib.amount, e.target.value)}
                                    className="w-full rounded px-3 py-1 transition border"
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
                            {(contributions.length > 1 || index > 0) && (
                                <div className="flex ">
                                    <button
                                        type="button"
                                        onClick={() => onRemoveContribution(index)}
                                        className="px-3 mt-4 rounded transition text-sm font-medium"
                                        style={{
                                            backgroundColor: 'var(--color-warning)',
                                            color: 'var(--color-text-inverse)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '0.8';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ))}
            </div>

            {/* Add Contribution Button */}
            {remainingLimit > 0 && (
                <button
                    type="button"
                    onClick={onAddContribution}
                    className="w-full px-3 py-2 rounded-lg transition text-sm font-medium"
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-primary-main)',
                        border: '1px dashed var(--color-primary-main)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary-lighter)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    }}
                >
                    + Add Another Contribution (Remaining: ₹{remainingLimit.toFixed(2)})
                </button>
            )}
        </div>
    );
};

export default PPFYearContributionEditor;
