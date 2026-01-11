export default function Loader({ message, fullHeight }: { message?: string, fullHeight?: boolean }) {
  return (
    <div
      className={`${fullHeight ? 'min-h-screen' : ''} flex items-center justify-center`}
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
          style={{ borderColor: 'var(--color-primary-main)' }}
        ></div>
        <p style={{ color: 'var(--color-text-secondary)' }}>{message || 'Loading...'}</p>
      </div>
    </div>
  );
}