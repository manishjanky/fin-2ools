import Header from '../components/common/Header';
import FDForm from './fd/components/FDForm';



export default function FD() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FD <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projections</span>
          </h1>
          <p className="text-lg text-purple-200">
            Calculate and analyze your Fixed Deposit returns with detailed year-wise breakdowns.
          </p>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <FDForm />
        </section>

      </main>
    </div>
  );
}
