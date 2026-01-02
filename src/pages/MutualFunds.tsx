import { Navigate } from 'react-router';
import Header from '../components/common/Header';
import MutualFundList from './mutual-funds/components/MutualFundList';
import { useInvestmentStore } from './mutual-funds/store/investmentStore';

export default function MutualFunds() {
    const { hasInvestments } = useInvestmentStore();

    if (hasInvestments) {
        return <Navigate to="my-funds" replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <section className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Mutual <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Funds</span>
                    </h1>
                    <p className="text-lg text-purple-200">
                        Explore and compare mutual fund schemes with latest NAV data.
                    </p>
                </section>

                {/* Mutual Fund List */}
                <section>
                    <MutualFundList />
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-purple-500/30 mt-20 py-8 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-purple-300 text-sm">
                        <p>&copy; 2026 FinTools. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
