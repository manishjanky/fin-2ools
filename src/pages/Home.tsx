import { useNavigate } from 'react-router-dom';
import FeatureTile from '../components/common/FeatureTile';
import Header from '../components/common/Header';


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <section className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Tool
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl">
            Select which financial planning tool you'd like to explore today.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="cursor-pointer">
            <FeatureTile
              title="FD Projections"
              description="Calculate and project your Fixed Deposit returns with detailed maturity amounts and interest earnings. Compare rates from different providers."
              icon="📊"
              gradient="from-purple-500 to-blue-600"
              onClick={() => navigate('/fd')}
            />
          </div>
          <div className="cursor-pointer">
            <FeatureTile
              title="Mutual Funds"
              description="Explore mutual fund options, compare returns, and analyze your portfolio performance. Make informed investment decisions."
              icon="📈"
              gradient="from-blue-500 to-cyan-600"
              onClick={() => navigate('/mutual-funds')}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 mt-20 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 text-sm">&copy; 2026 FinTools. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-purple-300 hover:text-white transition text-sm">Privacy</a>
              <a href="#" className="text-purple-300 hover:text-white transition text-sm">Terms</a>
              <a href="#" className="text-purple-300 hover:text-white transition text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// function StatCard({ number, label }: { number: string; label: string }) {
//   return (
//     <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-500/50 transition">
//       <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
//         {number}
//       </p>
//       <p className="text-purple-200">{label}</p>
//     </div>
//   );
// }
