import Header from '../../components/common/Header';
import MutualFundList from './components/MutualFundList';

export default function MutualFunds() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Page Header */}
                <section className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Mutual <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Funds</span>
                    </h1>
                    <p className="text-lg text-purple-200">
                        Explore and track mutual fund schemes with latest NAV data.
                    </p>
                </section>
                <section>
                    <MutualFundList />
                </section>
            </main>
        </div>
    );
}
