import { useMemo } from 'react';
import moment from 'moment';
import type { NAVData } from '../../../types/mutual-funds';

interface ChartStatisticsDisplayProps {
    navData: NAVData[];
}

export default function NavStatisticsDisplay({ navData }: ChartStatisticsDisplayProps) {
    const stats = useMemo(() => {
        if (!navData || navData.length === 0) return null;

        // Extract NAV values
        const navValues = navData.map((item) => {
            const nav = typeof item.nav === 'string' ? parseFloat(item.nav) : item.nav;
            return nav;
        });

        // Calculate statistics
        const minNav = Math.min(...navValues);
        const maxNav = Math.max(...navValues);
        const avgNav = navValues.reduce((a, b) => a + b, 0) / navValues.length;
        const startNav = navValues[0];
        const endNav = navValues[navValues.length - 1];
        const changePercent = ((endNav - startNav) / startNav) * 100;

        // Get month information from data range using moment.js
        const firstDate = moment(navData[0].date, 'DD-MM-YYYY');
        const lastDate = moment(navData[navData.length - 1].date, 'DD-MM-YYYY');
        const firstMonthYear = firstDate.format('MMM YYYY');
        const lastMonthYear = lastDate.format('MMM YYYY');
        // Data is in reverse chronological order
        const periodLabel = firstMonthYear === lastMonthYear ? `${firstMonthYear} Stats` : `${lastMonthYear} - ${firstMonthYear} Stats`;

        return {
            minNav,
            maxNav,
            avgNav,
            startNav,
            endNav,
            changePercent,
            periodLabel,
        };
    }, [navData]);

    if (!stats) return null;

    return (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">{stats.periodLabel}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Highest NAV */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Highest NAV
                    </p>
                    <p className="text-xl font-semibold text-purple-300">
                        ₹{stats.maxNav.toFixed(2)}
                    </p>
                </div>

                {/* Lowest NAV */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Lowest NAV
                    </p>
                    <p className="text-xl font-semibold text-purple-300">
                        ₹{stats.minNav.toFixed(2)}
                    </p>
                </div>

                {/* Average NAV */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Average NAV
                    </p>
                    <p className="text-xl font-semibold text-purple-300">
                        ₹{stats.avgNav.toFixed(2)}
                    </p>
                </div>

                {/* Change Percentage */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Change
                    </p>
                    <p className={`text-xl font-semibold ${stats.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(2)}%
                    </p>
                </div>
            </div>
        </div>
    );
}
