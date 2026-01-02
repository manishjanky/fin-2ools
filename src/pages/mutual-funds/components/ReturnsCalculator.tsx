import { useState, useMemo } from 'react';
import type { NAVData, ReturnsMetrics } from '../../../types/mutual-funds';
import Accordion from '../../../components/common/Accordion';
import ReturnsSummary from './ReturnsSummary';
import NAVChart from './NAVChart';
import LineChart from './LineChart';
import NavStatisticsDisplay from './NavStatisticsDisplay';
import { calculateSchemeReturns } from '../utils/metrics-calculations';
import { TIMEFRAMES } from '../utils/constants';

interface ReturnsCalculatorProps {
    navData: NAVData[];
    currentNav: number;
}


export default function ReturnsCalculator({ navData, currentNav }: ReturnsCalculatorProps) {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
    const [chartType, setChartType] = useState<'line' | 'histogram'>('line');

    const returnsMetrics = useMemo(() => calculateSchemeReturns(navData, currentNav), [navData, currentNav]);

    const selectedMetric = returnsMetrics[selectedTimeframe];

    // Filter navData for selected timeframe
    const filteredNavData = useMemo(() => {
        if (!selectedMetric.isAvailable) return [];

        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(targetDate.getDate() - selectedMetric.days);

        return navData.filter((nav) => {
            const navDate = new Date(nav.date.split('-').reverse().join('-'));
            return navDate >= targetDate && navDate <= today;
        });
    }, [navData, selectedMetric]);

    const getTimeFrameClassname = (label: string, metric: ReturnsMetrics) => {
        if (selectedTimeframe === label) {
            return 'px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap text-sm focus:outline-none bg-slate-700 text-purple-300 border-2 border-white';
        }
        return metric.isAvailable
            ? 'px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap text-sm focus:outline-none bg-slate-700 text-purple-200 hover:bg-slate-600 border-2 border-transparent'
            : 'px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap text-sm focus:outline-none bg-slate-800 text-slate-500 cursor-not-allowed opacity-50 border-2 border-transparent';
    };

    return (
        <div className="space-y-6">
            {/* Timeframe Selector */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-lg p-4">
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {TIMEFRAMES.map(({ label }) => {
                        const metric = returnsMetrics[label];
                        return metric.isAvailable ?
                            <button
                                key={label}
                                onClick={() => setSelectedTimeframe(label)}
                                disabled={!metric.isAvailable}
                                className={getTimeFrameClassname(label, metric)}
                            >
                                {label}
                            </button>
                            : null
                    })}
                </div>
            </div>

            {/* Chart Statistics Display */}
            {selectedMetric.isAvailable && filteredNavData.length > 0 && (
                <NavStatisticsDisplay navData={filteredNavData} />
            )}

            {/* Chart Type Selector and Chart */}
            {selectedMetric.isAvailable && filteredNavData.length > 0 && (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-lg p-4 space-y-4">
                    {/* Chart Type Selector */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setChartType('line')}
                            className={`px-4 py-2 rounded-lg transition font-medium text-sm ${chartType === 'line'
                                ? 'bg-purple-600 text-white border border-purple-400'
                                : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600/50'
                                }`}
                        >
                            Line Chart
                        </button>
                        <button
                            onClick={() => setChartType('histogram')}
                            className={`px-4 py-2 rounded-lg transition font-medium text-sm ${chartType === 'histogram'
                                ? 'bg-purple-600 text-white border border-purple-400'
                                : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600/50'
                                }`}
                        >
                            Histogram
                        </button>

                    </div>

                    {/* NAV Chart */}
                    <div>
                        {chartType === 'histogram' ? (
                            <NAVChart navData={filteredNavData} timeframeLabel={selectedMetric.timeframeLabel} />
                        ) : (
                            <LineChart navData={filteredNavData} timeframeLabel={selectedMetric.timeframeLabel} />
                        )}
                    </div>
                </div>
            )}


            {selectedMetric.isAvailable && (
                <Accordion title="Returns Summary" isOpen={true}>
                    <ReturnsSummary selectedMetric={selectedMetric} />
                </Accordion>
            )}

            {!selectedMetric.isAvailable && (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-lg p-6">
                    <div className="text-center py-8">
                        <p className="text-purple-200">
                            Insufficient data available for returns calculation
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
