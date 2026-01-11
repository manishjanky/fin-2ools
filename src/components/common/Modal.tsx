
export default function Modal({ children, widthClass, onClose }: { children: React.ReactNode, widthClass?: string, onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex lg:items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={($event) => $event.stopPropagation()}
        >
            <div
                className={`rounded-lg p-6 border max-h-screen lg:max-h-[90vh] overflow-y-auto w-full ${widthClass ?? 'max-w-[800px]'}`}
                style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-primary-main)',
                    color: 'var(--color-text-primary)',
                    position: 'relative',
                }}
            >
                <button
                    className="absolute right-0 top-0"
                    onClick={() => onClose()}
                    aria-label="Close Modal"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 absolute top-4 right-4 cursor-pointer hover:opacity-80 transition"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    )
}