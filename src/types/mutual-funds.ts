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
  xirr: number;
  isAvailable: boolean;
}
