import { useEffect, useState } from 'react';
import type { MutualFundScheme, UserInvestmentData, NAVData } from '../types/mutual-funds';
import { investmentMetricSingleFund } from '../utils/investmentCalculations';
import { useMutualFundsStore } from '../store/mutualFundsStore';
import AddInvestmentModal from './AddInvestmentModal';
import { useInvestmentStore } from '../store';
import SchemeNAV from './SchemeNAV';

interface MyFundsCardProps {
  scheme: MutualFundScheme;
  investmentData: UserInvestmentData;
}

export default function MyFundsCard({ scheme, investmentData }: MyFundsCardProps) {
  const getOrFetchSchemeHistory = useMutualFundsStore(
    (state) => state.getOrFetchSchemeHistory
  );
  const [navHistory, setNavHistory] = useState<NAVData[]>([]);
  const [, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navValue = scheme.nav ? parseFloat(scheme.nav).toFixed(2) : 'N/A';
  const { getSchemeInvestments, addInvestment } = useInvestmentStore();
  const [investmentDataState, setInvestmentData] = useState<UserInvestmentData>(investmentData);
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getOrFetchSchemeHistory(scheme.schemeCode, 365);
        if (history?.data) {
          setNavHistory(history.data);
        }
      } catch (error) {
        console.error('Error loading NAV history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [scheme.schemeCode, getOrFetchSchemeHistory]);

  const investmentMetrics = investmentMetricSingleFund(navHistory, investmentDataState);
  const isPositive = investmentMetrics.absoluteGain >= 0;

  const handleAddInvestment = (investment: any) => {
    if (scheme.schemeCode) {
      addInvestment(scheme.schemeCode, investment);
      setInvestmentData(getSchemeInvestments(scheme.schemeCode));
      setShowModal(false);
    }
  };


  const addMoreInvestments = ($event: React.MouseEvent) => {
    $event.stopPropagation();
    setShowModal(true);
  }

  return (
    <div
      className="rounded-lg p-4 hover:shadow-lg transition border cursor-pointer bg-bg-primary border-primary-lighter hover:border-primary-main"
    >
      <div className="grid md:grid-cols-3 gap-4 items-start">
        {/* Scheme Info */}
        <div className="md:col-span-2">
          <h3
            className="text-lg font-bold mb-2 line-clamp-2 text-text-primary"
          >
            {scheme.schemeName}
          </h3>
          {scheme.schemeCategory && (
            <p className="text-xs text-text-secondary">
              <span className="font-semibold">Category:</span> {scheme.schemeCategory}
            </p>
          )}
        </div>

        {/* Current NAV */}
        <div className="text-right max-w-sm md:ml-auto">
          <SchemeNAV scheme={scheme} />
        </div>
      </div>

      {/* Investment Metrics */}
      <div
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-border-light"
      >
        <div>
          <p className="text-xs mb-1 text-text-tertiary">
            Amount Invested
          </p>
          <p className="text-lg font-semibold text-text-primary">
            ₹{investmentMetrics.totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-xs mb-1 text-text-tertiary">
            Current Value
          </p>
          <p className="text-lg font-semibold text-text-primary">
            ₹{investmentMetrics.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-xs mb-1 text-text-tertiary">
            Gain / Loss
          </p>
          <p
            className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-error'}`}
          >
            {investmentMetrics.absoluteGain >= 0 ? '+' : ''}
            ₹{Math.abs(investmentMetrics.absoluteGain).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-xs mb-1 text-text-tertiary">
            Return %
          </p>
          <p
            className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-error'}`}
          >
            {investmentMetrics.percentageReturn >= 0 ? '+' : ''}
            {investmentMetrics.percentageReturn.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs mb-1 text-text-tertiary">
            Units Held
          </p>
          <p
            className="text-lg font-semibold text-secondary-main"
          >
            {investmentMetrics.units?.toFixed(4)}
          </p>
        </div>
      </div>


      <section className="mt-4 border-t border-border-light pt-4">
        <button
          onClick={addMoreInvestments}
          className="px-6 py-3 rounded-lg transition font-medium bg-primary-main text-text-inverse hover:bg-primary-dark"
        >
          + Add More Investment
        </button>
      </section>
      <AddInvestmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddInvestment}
        schemeName={scheme.schemeName}
        schemeCode={scheme.schemeCode}
      />
    </div>
  );
}
