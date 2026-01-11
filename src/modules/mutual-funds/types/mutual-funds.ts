export interface MutualFundScheme {
  schemeCode: number;
  schemeName: string;
  fundHouse?: string;
  schemeType?: string;
  schemeCategory?: string;
  isinGrowth?: string | null;
  isinDivReinvestment?: string | null;
  nav?: string;
  date?: string;
}

export interface MutualFundListResponse {
  schemes: MutualFundScheme[];
  total: number;
}

export interface SearchResult {
  schemeCode: number;
  schemeName: string;
}

export interface NAVData {
  date: string;
  nav: string;
}

export interface SchemeHistoryResponse {
  meta: {
    scheme_code: number;
    scheme_name: string;
    fund_house: string;
    scheme_type?: string;
    scheme_category?: string;
    isin_growth?: string;
    isin_div_reinvestment?: string;
  };
  data: NAVData[];
}

export interface ReturnsMetrics {
  timeframeLabel: string;
  days: number;
  startNav: number;
  endNav: number;
  absoluteReturn: number;
  percentageReturn: number;
  cagr: number;
  xirr?: number;
  isAvailable: boolean;
}

// Track SIP amount modifications with effective dates
export interface SIPAmountModification {
  effectiveDate: string; // Date from which new amount applies
  amount: number; // New SIP amount from this date
}

// New types for user investments
export interface UserInvestment {
  schemeCode: number;
  investmentType: 'lumpsum' | 'sip';
  startDate: string;
  amount: number;
  sipAmount?: number; // For SIP: monthly investment amount (original amount)
  sipMonthlyDate?: number; // For SIP: day of month (1-31) when SIP is deducted
  sipEndDate?: string; // For SIP: end date (if cancelled) - if not provided, SIP is active
  sipAmountModifications?: SIPAmountModification[]; // Track all SIP amount changes with effective dates
}

export interface UserInvestmentData {
  schemeCode: number;
  investments: UserInvestment[];
}

export interface InvestmentMetrics {
  totalInvested: number;
  currentValue: number;
  absoluteGain: number;
  percentageReturn: number;
  xirr?: number;
  cagr?: number;
  numberOfFunds?: number;
  units?: number;
}

export interface InvestmentInstallment {
  id: string;
  type: 'lumpsum' | 'sip-installment';
  originalStartDate: string;
  installmentDate: string;
  amount: number;
  nav: number;
  units: number;
  isCancelled: boolean;
  cancelledOn?: string;
}

export interface FundInvestmentDetails {
  scheme: MutualFundScheme;
  installments: InvestmentInstallment[];
  summary: InvestmentMetrics;
}

