import type { PPFCalculationResult, PPFContribution, PPFYearData } from '../types/ppf';

const getFYYear = (year: number): string => {
  // Financial year in India: April to March
  const fy = `FY ${year}-${year + 1}`;
  return fy;
};

export const calculatePPF = (
  startYear: number,
  interestRate: number,
  contributions: PPFContribution[]
): PPFCalculationResult => {
  const PPF_MATURITY_YEARS = 15;
  const endYear = startYear + PPF_MATURITY_YEARS - 1; // 15-year maturity period

  let balance = 0;
  let totalInvested = 0;
  let totalInterestEarned = 0;
  const yearlyData: PPFYearData[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const contribution = contributions.find(c => c.year === year)?.amount || 0;

    const openingBalance = balance;

    // Add contribution to balance at the beginning of the year
    balance += contribution;

    // Calculate interest on the closing balance (after contribution)
    const interest = balance * (interestRate / 100);
    balance += interest;

    // Track totals
    totalInvested += contribution;
    totalInterestEarned += interest;

    // Create FY data
    const fyYear = getFYYear(year);
    yearlyData.push({
      year,
      fyYear,
      openingBalance,
      contribution,
      interest,
      closingBalance: balance,
    });
  }

  const absolutReturn = balance - totalInvested;
  const absolutReturnPercentage = totalInvested > 0 ? (absolutReturn / totalInvested) * 100 : 0;
  const maturityAmount = balance;

  return {
    yearlyData,
    totalInvested,
    totalInterestEarned,
    maturityAmount,
    absolutReturn,
    absolutReturnPercentage,
  };
};

export const generateFinancialYearData = (yearlyData: PPFYearData[]) => {
  return yearlyData.map(data => ({
    fyYear: data.fyYear,
    startBalance: data.openingBalance,
    contribution: data.contribution,
    endBalance: data.closingBalance,
    interestEarned: data.interest,
  }));
};
