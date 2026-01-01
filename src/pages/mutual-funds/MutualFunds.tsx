import { useState } from 'react';
import Header from '../../components/common/Header';
import MutualFundList from './components/MutualFundList';

type TabType = 'all' | 'my';

export default function MutualFunds() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

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
            Explore and track mutual fund schemes with latest NAV data.
          </p>
        </section>

        {/* Tabs */}
        <div className="mb-8 border-b border-purple-500/30">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'all'
                  ? 'text-purple-300'
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            >
              All Funds
              {activeTab === 'all' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('my')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'my'
                  ? 'text-purple-300'
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            >
              My Funds
              {activeTab === 'my' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'all' && (
          <section>
            <MutualFundList />
          </section>
        )}

        {activeTab === 'my' && (
          <section className="text-center py-16">
            <p className="text-purple-200 text-lg mb-4">My Funds feature coming soon</p>
            <p className="text-purple-300 text-sm">
              Track your personal mutual fund portfolio and investments here.
            </p>
          </section>
        )}
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
