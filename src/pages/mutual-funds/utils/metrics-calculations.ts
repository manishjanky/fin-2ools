import moment from "moment";
import type { NAVData, ReturnsMetrics } from "../../../types/mutual-funds";
import { TIMEFRAMES } from "./constants";

// Helper function to calculate CAGR (Compound Annual Growth Rate)
// Formula: CAGR = (Ending Value / Beginning Value) ^ (1 / Number of Years) - 1
export const calculateCAGR = (
  startNav: number,
  endNav: number,
  years: number
): number => {
  if (startNav <= 0 || years <= 0) return 0;
  return (Math.pow(endNav / startNav, 1 / years) - 1) * 100;
};

// Helper function to calculate XIRR (Extended Internal Rate of Return)
// For single lump sum investments (no periodic cash flows), XIRR = CAGR
// XIRR accounts for the timing of cash flows and returns an annualized percentage
export const calculateXIRR = (
  startNav: number,
  endNav: number,
  days: number
): number => {
  const years = days / 365.25; // Using 365.25 for more accurate annual calculation
  if (startNav <= 0 || years <= 0) return 0;
  // For single investment NAV data: XIRR ≈ (Ending NAV / Starting NAV) ^ (365.25 / days) - 1
  return (Math.pow(endNav / startNav, 365.25 / days) - 1) * 100;
};

/**
 * @summary Calculates returns metrics for a mutual fund scheme over predefined timeframes.
 * @param navData Historical nav data of mutual fund
 * @param currentNav Current NAV of the mutual fund
 * @returns {Record<string, ReturnsMetrics>} - An object mapping timeframe labels to their corresponding returns metrics
 */
export const calculateSchemeReturns = (
  navData: NAVData[],
  currentNav: number
): Record<string, ReturnsMetrics> => {
  const metrics: Record<string, ReturnsMetrics> = {};

  TIMEFRAMES.forEach(({ label, days }) => {
    const targetDate = moment().toDate();
    // Subtract days to get the target date for the timeframe
    targetDate.setDate(targetDate.getDate() - days);

    const filteredDates = navData.filter(({ date }) =>
      moment(date, "DD-MM-YYYY").isSameOrBefore(targetDate)
    );
    const sortedDates = filteredDates.sort((a, b) =>
      moment(b.date, "DD-MM-YYYY").diff(moment(a.date, "DD-MM-YYYY"))
    );
    // Find the closest NAV data point before or on the target date
    const historicalNav = sortedDates.find((nav) =>
      moment(nav.date, "DD-MM-YYYY").isSameOrBefore(targetDate)
    );
    if (historicalNav) {
      const startNav = parseFloat(historicalNav.nav);
      const endNav = currentNav;
      const absoluteReturn = endNav - startNav;
      const percentageReturn = (absoluteReturn / startNav) * 100;
      const years = days / 365;
      const cagr = calculateCAGR(startNav, endNav, years);

      metrics[label] = {
        timeframeLabel: label,
        days,
        startNav,
        endNav,
        absoluteReturn,
        percentageReturn,
        cagr,
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
        isAvailable: false,
      };
    }
  });

  return metrics;
};
