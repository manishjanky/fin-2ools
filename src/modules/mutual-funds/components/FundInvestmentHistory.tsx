import moment from "moment";
import type { InvestmentInstallment } from "../types/mutual-funds";

export default function FundInvestmentHistory({ installments }: { installments: InvestmentInstallment[] }) {

    return (
        <section className="rounded-lg overflow-hidden border"
            style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-light)',
            }}
        >
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Investment Installments
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    All SIP and lump sum investment installments with NAV and units on transaction date
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                Type
                            </th>
                            <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                Installation Date
                            </th>
                            <th className="px-6 py-4 text-right font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                Amount
                            </th>
                            <th className="px-6 py-4 text-right font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                NAV
                            </th>
                            <th className="px-6 py-4 text-right font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                Units
                            </th>
                            <th className="px-6 py-4 text-center font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {installments.map((inst) => (
                            <tr key={inst.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                <td className="px-6 py-4" style={{ color: 'var(--color-text-primary)' }}>
                                    <span className="font-semibold capitalize">
                                        {inst.type === 'lumpsum' ? 'Lump Sum' : 'SIP'}
                                    </span>
                                </td>
                                <td className="px-6 py-4" style={{ color: 'var(--color-text-primary)' }}>
                                    {moment(inst.installmentDate, 'DD-MM-YYYY').format('DD MMM YYYY')}
                                </td>
                                <td className="px-6 py-4 text-right" style={{ color: 'var(--color-accent-cyan)' }}>
                                    ₹{inst.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 text-right" style={{ color: 'var(--color-text-primary)' }}>
                                    ₹{inst.nav.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right font-semibold" style={{ color: 'var(--color-secondary-main)' }}>
                                    {inst.units.toFixed(4)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold`}
                                        style={{
                                            backgroundColor: inst.isCancelled ? 'var(--color-error)' : 'var(--color-status-success)',
                                            color: 'white',
                                        }}
                                    >
                                        {inst.isCancelled ? 'Cancelled' : 'Active'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}