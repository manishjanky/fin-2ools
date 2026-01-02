import type { UserInvestmentData } from '../../../types/mutual-funds';

const STORAGE_KEY = 'fin-tools-my-funds';

export const localStorageService = {
  // Get all user investments
  getUserInvestments(): UserInvestmentData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Get investments for a specific scheme
  getSchemeInvestments(schemeCode: number): UserInvestmentData | null {
    const investments = this.getUserInvestments();
    return investments.find((item) => item.schemeCode === schemeCode) || null;
  },

  // Add investment to a scheme
  addInvestment(schemeCode: number, investment: any): void {
    const investments = this.getUserInvestments();
    const existingScheme = investments.find((item) => item.schemeCode === schemeCode);

    if (existingScheme) {
      existingScheme.investments.push(investment);
    } else {
      investments.push({
        schemeCode,
        investments: [investment],
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
  },

  // Remove specific investment
  removeInvestment(schemeCode: number, investmentIndex: number): void {
    const investments = this.getUserInvestments();
    const schemeIndex = investments.findIndex((item) => item.schemeCode === schemeCode);

    if (schemeIndex !== -1) {
      investments[schemeIndex].investments.splice(investmentIndex, 1);
      if (investments[schemeIndex].investments.length === 0) {
        investments.splice(schemeIndex, 1);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
    }
  },

  // Check if user has any investments
  hasInvestments(): boolean {
    return this.getUserInvestments().length > 0;
  },

  // Clear all investments
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};