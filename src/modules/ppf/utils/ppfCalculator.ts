import type { PPFCalculationResult, PPFContribution, PPFYearData } from '../types/ppf';

const getFYYear = (year: number): string => {
  // Financial year in India: April to March
  const fy = `FY ${year}-${year + 1}`;
  return fy;
};

const getDefaultContributionDate = (year: number): string => {
  // Default to April 1st of the FY
  return `${year}-04-01`;
};

const getEffectiveDate = (date: string | undefined, year: number): string => {
  // If no date provided, use April 1st of FY
  if (!date) {
    return getDefaultContributionDate(year);
  }
  return date;
};

const calculateProRataInterest = (
  amount: number,
  rate: number,
  date: string,
  year: number
): number => {
  try {
    const contribDate = new Date(date);
    const fyStartDate = new Date(`${year}-04-01`);
    
    // If contribution date is before FY start, assume full year
    if (contribDate < fyStartDate) {
      return amount * (rate / 100);
    }

    const nextFYStartDate = new Date(`${year + 1}-04-01`);
    const daysInFY = 365;
    const daysAfterContribution = Math.floor(
      (nextFYStartDate.getTime() - contribDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Pro-rata interest based on days remaining in FY
    const proportionalDays = Math.max(0, daysAfterContribution);
    return (amount * (rate / 100) * proportionalDays) / daysInFY;
  } catch {
    // If date parsing fails, return full year interest
    return amount * (rate / 100);
  }
};

export const calculatePPF = (
  startYear: number,
  defaultInterestRate: number,
  contributions: PPFContribution[]
): PPFCalculationResult => {
  const PPF_MATURITY_YEARS = 15;
  const endYear = startYear + PPF_MATURITY_YEARS - 1; // 15-year maturity period

  let balance = 0;
  let totalInvested = 0;
  let totalInterestEarned = 0;
  const yearlyData: PPFYearData[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const yearContribution = contributions.find(c => c.year === year);
    const openingBalance = balance;

    // Get all contributions for this year
    const yearContributions = yearContribution?.contributions || [];
    const effectiveRate = yearContribution?.interestRate || defaultInterestRate;

    // Add all contributions for this year to balance
    let yearlyContributionAmount = 0;
    yearContributions.forEach(contrib => {
      yearlyContributionAmount += contrib.amount;
    });
    balance += yearlyContributionAmount;

    // Calculate total interest for this year based on each contribution's pro-rata amount
    let yearlyInterest = 0;
    yearContributions.forEach(contrib => {
      const effectiveDate = getEffectiveDate(contrib.date, year);
      const interest = calculateProRataInterest(contrib.amount, effectiveRate, effectiveDate, year);
      yearlyInterest += interest;
    });

    balance += yearlyInterest;

    // Track totals
    totalInvested += yearlyContributionAmount;
    totalInterestEarned += yearlyInterest;

    // Create FY data
    const fyYear = getFYYear(year);
    yearlyData.push({
      year,
      fyYear,
      openingBalance,
      contribution: yearlyContributionAmount,
      interest: yearlyInterest,
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
