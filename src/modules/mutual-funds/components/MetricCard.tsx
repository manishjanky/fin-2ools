interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  colorKey?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'cyan';
  subtext?: string;
}

export default function MetricCard({
  label,
  value,
  suffix = '',
  colorKey = 'primary',
  subtext = '',
}: MetricCardProps) {
  const getColor = () => {
    const colors: Record<string, string> = {
      primary: 'var(--color-primary-main)',
      secondary: 'var(--color-secondary-main)',
      success: 'var(--color-status-success)',
      error: 'var(--color-error)',
      warning: 'var(--color-warning)',
      info: 'var(--color-info)',
      cyan: 'var(--color-accent-cyan)',
    };
    return colors[colorKey] || colors.primary;
  };

  return (
    <div className="rounded-lg p-4 border"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border-light)',
      }}
    >
      <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color: getColor() }}>
        {value}
        {suffix && <span className="text-lg ml-1">{suffix}</span>}
      </p>
      {subtext && (
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          {subtext}
        </p>
      )}
    </div>
  );
}
