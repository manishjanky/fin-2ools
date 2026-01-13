export interface PPFSingleContribution {
  amount: number;
  date?: string; // ISO date format: YYYY-MM-DD, defaults to April 1st of FY if not provided
}

export interface PPFContribution {
  year: number;
  interestRate: number;
  contributions: PPFSingleContribution[];
}

export interface PPFYearData {
  year: number;
  fyYear: string;
  openingBalance: number;
  contribution: number;
  interest: number;
  closingBalance: number;
}

export interface PPFCalculationResult {
  yearlyData: PPFYearData[];
  totalInvested: number;
  totalInterestEarned: number;
  maturityAmount: number;
  absolutReturn: number;
  absolutReturnPercentage: number;
}

export interface PPFFormInputs {
  startYear: number;
  endYear: number;
  interestRate: number;
  isVariableContribution: boolean;
  contributions: PPFContribution[];
}
