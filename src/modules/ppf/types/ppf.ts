export interface PPFContribution {
  year: number;
  amount: number;
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
