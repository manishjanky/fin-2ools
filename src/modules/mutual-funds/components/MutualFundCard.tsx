import { useState } from 'react';
import type { MutualFundScheme } from '../types/mutual-funds';
import AddInvestmentModal from './AddInvestmentModal';
import { useInvestmentStore } from '../store';
import SchemeNAV from './SchemeNAV';

interface MutualFundCardProps {
    scheme: MutualFundScheme;
}

export default function MutualFundCard({ scheme }: MutualFundCardProps) {
    const [showModal, setShowModal] = useState(false);
    const { addInvestment } = useInvestmentStore();

    const handleAddInvestment = (investment: any) => {
        addInvestment(scheme.schemeCode, investment);
        setShowModal(false);
    };
    const addToMyFunds = ($event: React.MouseEvent<HTMLButtonElement>) => {
        $event.stopPropagation();
        setShowModal(true);
    };

    return (
        <>
            <div
                className="rounded-lg p-4 hover:shadow-lg transition transform hover:scale-105 h-full border cursor-pointer"
                style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    borderColor: "var(--color-primary-lighter)",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary-main)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-primary-lighter)";
                }}
            >
                <div className="flex flex-col h-full justify-between">
                    {/* Header: Scheme Name + NAV */}
                    <div className="mb-1">
                        <div className="flex flex-col md:flex-row lg:items-start lg:justify-between lg:gap-4">
                            <div className="flex-1">
                                <h3
                                    className="text-lg font-bold lg:line-clamp-3"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {scheme.schemeName}
                                </h3>
                                {/* Fund House and Category */}
                                {scheme.fundHouse && (
                                    <p className="text-sm mb-1" style={{ color: 'var(--color-primary-main)' }}>
                                        AMC: <b>{scheme.fundHouse}</b>
                                    </p>
                                )}
                                {scheme.schemeCategory && (
                                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                                        Category: <b>{scheme.schemeCategory}</b>
                                    </p>
                                )}
                            </div>
                            <SchemeNAV scheme={scheme} />
                        </div>


                    </div>

                    <div className='flex justify-end'>
                        <button
                            onClick={addToMyFunds}
                            className=" w-full md:w-auto mt-4 px-4 py-2 rounded-lg transition font-medium text-sm"
                            style={{
                                backgroundColor: 'var(--color-primary-main)',
                                color: "var(--color-text-inverse)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--color-primary-dark)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary-main)';
                            }}
                        >
                            + Add to My Funds
                        </button>
                    </div>

                </div>
            </div>

            <AddInvestmentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddInvestment}
                schemeName={scheme.schemeName}
                schemeCode={scheme.schemeCode}
            />
        </>
    );
}
