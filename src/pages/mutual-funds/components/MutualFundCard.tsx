import type { MutualFundScheme } from '../../../types/mutual-funds';

interface MutualFundCardProps {
    scheme: MutualFundScheme;
}

export default function MutualFundCard({ scheme }: MutualFundCardProps) {
    const navValue = scheme.nav ? parseFloat(scheme.nav).toFixed(2) : 'N/A';

    return (
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4 hover:border-blue-500/50 hover:shadow-lg transition transform hover:scale-105 h-full">
            <div className="flex flex-col h-full justify-between">
                {/* Header: Scheme Name + NAV */}
                <div className="mb-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-4 mb-1">
                        <h3 className="text-lg flex-col font-bold text-white lg:line-clamp-4 flex-1">
                            {scheme.schemeName}
                            {/* Fund House and Category */}
                            {scheme.fundHouse && (
                                <p className="text-blue-300 text-sm mb-1">AMC: <b>{scheme.fundHouse}</b></p>
                            )}
                            {scheme.schemeCategory && (
                                <p className="text-blue-200 text-xs">Category: <b>{scheme.schemeCategory}</b></p>
                            )}
                        </h3>
                        <div className="flex flex-col items-end sm:mt-2 lg:mt-0">
                            <span className="text-2xl font-bold text-cyan-300">₹{navValue}</span>
                            {scheme.date && (
                                <p className="text-blue-400 text-xs mt-1 font-bold">As of {scheme.date}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
