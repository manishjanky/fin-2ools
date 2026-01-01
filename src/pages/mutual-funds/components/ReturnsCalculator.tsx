import { useState, useMemo } from 'react';
import type { NAVData, ReturnsMetrics } from '../../../types/mutual-funds';
import Accordion from '../../../components/common/Accordion';
import ReturnsSummary from './ReturnsSummary';
import NAVChart from './NAVChart';
import LineChart from './LineChart';
import NavStatisticsDisplay from './NavStatisticsDisplay';

interface ReturnsCalculatorProps {
    navData: NAVData[];
    currentNav: number;
}

const TIMEFRAMES = [
    { label: '1M', days: 30 },
    { label: '3M', days: 90 },
    { label: '6M', days: 180 },
    { label: '1Y', days: 365 },
    { label: '2Y', days: 730 },
    { label: '3Y', days: 1095 },
    { label: '5Y', days: 1825 },
    { label: '10Y', days: 3650 },
];

export default function ReturnsCalculator({ navData, currentNav }: ReturnsCalculatorProps) {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
    const [chartType, setChartType] = useState<'line' | 'histogram'>('line');

    const returnsMetrics = useMemo(() => {
        const today = new Date();
        const metrics: Record<string, ReturnsMetrics> = {};

        // Helper function to calculate CAGR (Compound Annual Growth Rate)
        // Formula: CAGR = (Ending Value / Beginning Value) ^ (1 / Number of Years) - 1
        const calculateCAGR = (startNav: number, endNav: number, years: number): number => {
            if (startNav <= 0 || years <= 0) return 0;
            return (Math.pow(endNav / startNav, 1 / years) - 1) * 100;
        };

        // Helper function to calculate XIRR (Extended Internal Rate of Return)
        // For single lump sum investments (no periodic cash flows), XIRR = CAGR
        // XIRR accounts for the timing of cash flows and returns an annualized percentage
        const calculateXIRR = (startNav: number, endNav: number, days: number): number => {
            const years = days / 365.25; // Using 365.25 for more accurate annual calculation
            if (startNav <= 0 || years <= 0) return 0;
            // For single investment NAV data: XIRR ≈ (Ending NAV / Starting NAV) ^ (365.25 / days) - 1
            return (Math.pow(endNav / startNav, 365.25 / days) - 1) * 100;
        };

        TIMEFRAMES.forEach(({ label, days }) => {
            const targetDate = new Date(today);
            targetDate.setDate(targetDate.getDate() - days);

            // Find the closest NAV data point before or on the target date
            const historicalNav = navData.find((nav) => {
                const navDate = new Date(nav.date.split('-').reverse().join('-'));
                return navDate <= targetDate;
            });

            if (historicalNav) {
                const startNav = parseFloat(historicalNav.nav);
                const endNav = currentNav;
                const absoluteReturn = endNav - startNav;
                const percentageReturn = (absoluteReturn / startNav) * 100;
                const years = days / 365;
                const cagr = calculateCAGR(startNav, endNav, years);
                const xirr = calculateXIRR(startNav, endNav, days);

                metrics[label] = {
                    timeframeLabel: label,
                    days,
                    startNav,
                    endNav,
                    absoluteReturn,
                    percentageReturn,
                    cagr,
                    xirr,
                    isAvailable: true,
                };
            } else {
                metrics[label] = {
                    timeframeLabel: label,
                    days,
                    startNav: 0,
                    endNav: 0,
                    absoluteReturn: 0,
                    percentageReturn: 0,
                    cagr: 0,
                    xirr: 0,
                    isAvailable: false,
                };
            }
        });

        return metrics;
    }, [navData, currentNav]);

    const selectedMetric = returnsMetrics[selectedTimeframe];
    // const isPositive = selectedMetric.percentageReturn >= 0;

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
