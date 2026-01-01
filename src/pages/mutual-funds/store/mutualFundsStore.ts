import { create } from 'zustand';
import type { MutualFundScheme, SearchResult } from '../../../types/mutual-funds';
import { fetchLatestNAV, searchMutualFunds } from '../utils/mutualFundsService';

interface MutualFundsStore {
  // State
  schemes: MutualFundScheme[];
  filteredSchemes: MutualFundScheme[];
  searchQuery: string;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  hasLoaded: boolean;
  searchResults: Map<string, SearchResult[]>;

  // Actions
  loadSchemes: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
  resetSearch: () => void;
  setError: (error: string | null) => void;
}

export const useMutualFundsStore = create<MutualFundsStore>((set, get) => ({
  // Initial state
  schemes: [],
  filteredSchemes: [],
  searchQuery: '',
  currentPage: 1,
  isLoading: false,
  error: null,
  hasLoaded: false,
  searchResults: new Map(),

  // Load all schemes
  loadSchemes: async () => {
    const { hasLoaded } = get();
    
    // Return cached data if already loaded
    if (hasLoaded) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const data = await fetchLatestNAV(1000, 0);
      set({
        schemes: data,
        filteredSchemes: data,
        hasLoaded: true,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load mutual funds';
      set({ error: errorMessage, isLoading: false });
      console.error(err);
    }
  },

  // Set search query
  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  // Perform search with local filtering first, then API fallback
  performSearch: async (query: string) => {
    const { schemes, searchResults } = get();

    // If empty query, show all schemes
    if (query.trim() === '') {
      set({ filteredSchemes: schemes, searchQuery: '', currentPage: 1 });
      return;
    }

    const lowerQuery = query.toLowerCase();

    // First, try to filter from locally loaded schemes
    const localMatches = schemes.filter((scheme) =>
      scheme.schemeName.toLowerCase().includes(lowerQuery) ||
      scheme.fundHouse?.toLowerCase().includes(lowerQuery)
    );

    // If local results found, use them
    if (localMatches.length > 0) {
      set({
        filteredSchemes: localMatches,
        searchQuery: query,
        currentPage: 1,
        isLoading: false,
      });
      return;
    }

    // If no local results, check cache
    if (searchResults.has(query)) {
      const cachedResults = searchResults.get(query)!;
      const matched = schemes.filter((scheme) =>
        cachedResults.some((result) => result.schemeCode === scheme.schemeCode)
      );
      set({
        filteredSchemes: matched,
        searchQuery: query,
        currentPage: 1,
        isLoading: false,
      });
      return;
    }

    // If no cache and no local results, call API
    set({ isLoading: true, error: null });
    try {
      const results = await searchMutualFunds(query);

      // Update cache
      set((state) => {
        const newSearchResults = new Map(state.searchResults);
        newSearchResults.set(query, results);
        return { searchResults: newSearchResults };
      });

      // Match search results with full scheme data
      const matched = schemes.filter((scheme) =>
        results.some((result) => result.schemeCode === scheme.schemeCode)
      );

      set({
        filteredSchemes: matched,
        searchQuery: query,
        currentPage: 1,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to search mutual funds';
      set({ error: errorMessage, isLoading: false, filteredSchemes: [] });
      console.error(err);
    }
  },

  // Set current page
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  // Reset search
  resetSearch: () => {
    const { schemes } = get();
    set({
      searchQuery: '',
      filteredSchemes: schemes,
      currentPage: 1,
      error: null,
    });
  },

  // Set error
  setError: (error: string | null) => {
    set({ error });
  },
}));
