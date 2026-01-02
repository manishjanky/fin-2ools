import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { MutualFundScheme, SchemeHistoryResponse } from '../../types/mutual-funds';
import { fetchSchemeDetails, fetchSchemeHistory } from './utils/mutualFundsService';
import Header from '../../components/common/Header';
import ReturnsCalculator from './components/ReturnsCalculator';
import moment from 'moment';
import Accordion from '../../components/common/Accordion';



export default function SchemeDetails() {
    const { schemeCode } = useParams<{ schemeCode: string }>();
    const [scheme, setScheme] = useState<MutualFundScheme | null>(null);
    const [history, setHistory] = useState<SchemeHistoryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!schemeCode) return;

            try {
                setLoading(true);
                setError(null);

                // First, fetch scheme details
                const schemeData = await fetchSchemeDetails(parseInt(schemeCode));

                if (schemeData) {
                    setScheme(schemeData);
                } else {
                    setError('Scheme not found');
                    setLoading(false);
                    return;
                }

                // Then, fetch history after scheme details are loaded
                const historyData = await fetchSchemeHistory(parseInt(schemeCode), 10);

                if (historyData) {
                    setHistory(historyData);
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Failed to load scheme details';
                setError(errorMessage);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [schemeCode]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-purple-200">Loading scheme details...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !scheme) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-6 text-red-200">
                        <p className="font-semibold mb-4">{error || 'Scheme not found'}</p>
                    </div>
                </main>
            </div>
        );
    }

    const currentNav = scheme.nav ? parseFloat(scheme.nav) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-0">
                {/* Scheme Header */}
                <section className="mb-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
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
                        </div>

                        {/* Latest NAV */}
                        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-2 text-right lg:min-w-48">
                            <p className="text-blue-300 text-sm mb-1">Latest NAV</p>
                            <p className="text-xl font-bold text-cyan-300 mb-1">₹{currentNav.toFixed(2)}</p>
                            {scheme.date && (
                                <p className="text-blue-400 text-md font-bold">As of {moment(scheme.date, 'DD-MM-YYYY').format('Do MMM YYYY')}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Returns Summary */}
                {history && history.data.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">NAV History</h2>
                        <ReturnsCalculator navData={history.data} currentNav={currentNav} />
                    </section>
                )}

                {/* Additional Info */}
                <Accordion title="Additional Information" isOpen={true}>
                    {(scheme.isinGrowth || scheme.isinDivReinvestment) && (
                        <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">ISIN Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {scheme.schemeCategory && (
                                    <div>
                                        <p className="text-purple-300 text-sm mb-2">Category</p>
                                        <p className="text-white font-mono bg-slate-900/50 p-3 rounded">
                                            {scheme.schemeCategory}
                                        </p>
                                    </div>
                                )}

                                {scheme.schemeType && (
                                    <div>
                                        <p className="text-purple-300 text-sm mb-2">Type</p>
                                        <p className="text-white font-mono bg-slate-900/50 p-3 rounded">
                                            {scheme.schemeType}
                                        </p>
                                    </div>
                                )}
                                {scheme.isinGrowth && (
                                    <div>
                                        <p className="text-purple-300 text-sm mb-2">Growth ISIN</p>
                                        <p className="text-white font-mono bg-slate-900/50 p-3 rounded">
                                            {scheme.isinGrowth}
                                        </p>
                                    </div>
                                )}
                                {scheme.isinDivReinvestment && (
                                    <div>
                                        <p className="text-purple-300 text-sm mb-2">Dividend Reinvestment ISIN</p>
                                        <p className="text-white font-mono bg-slate-900/50 p-3 rounded">
                                            {scheme.isinDivReinvestment}
                                        </p>
                                    </div>
                                )}

                            </div>
                        </section>
                    )}
                </Accordion>
            </main>
        </div>
    );
}
