import type { MutualFundScheme } from "../types/mutual-funds";
import SchemeNAV from "./SchemeNAV";

export default function FundHeader({ scheme, duration }: { scheme: MutualFundScheme; duration?: string }) {

    return (
        <section className="mb-4 border border-blue-500/30 rounded-lg p-4" >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {scheme.schemeName}
                    </h1>

                    {scheme.fundHouse && (
                        <p className="text-blue-300 text-lg mb-2">
                            <span className="text-blue-400 font-semibold">Fund House:</span> {scheme.fundHouse}
                        </p>
                    )}
                    {scheme.schemeCategory && (
                        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                            Category: <b>{scheme.schemeCategory}</b>
                        </p>
                    )}
                    {
                        duration && (
                            <p className="text-blue-300 text-lg">
                                <span className="text-blue-400 font-semibold">Investment Duration:</span> {duration}
                            </p>

                        )
                    }
                </div>

                <SchemeNAV scheme={scheme} />
            </div>
        </section >
    )
}