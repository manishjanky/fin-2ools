import type { MutualFundScheme } from "../types/mutual-funds";

export default function SchemeNAV({ scheme }: { scheme: MutualFundScheme }) {
    const navValue = scheme.nav ? parseFloat(scheme.nav).toFixed(2) : 'N/A';

    return (
        <div className="flex flex-col items-end mt-2 lg:mt-0 border bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-2  md:min-w-48">
            <span
                className="text-2xl font-bold"
                style={{ color: "var(--color-secondary-main)" }}
            >
                ₹{navValue}
            </span>
            {scheme.date && (
                <p
                    className="text-xs mt-1 font-bold"
                    style={{ color: "var(--color-secondary-main)" }}
                >
                    As of {scheme.date}
                </p>
            )}
        </div>
    )
}