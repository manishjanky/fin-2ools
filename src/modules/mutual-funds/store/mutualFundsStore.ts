import { create } from 'zustand';
import type { MutualFundScheme, SearchResult, SchemeHistoryResponse } from '../types/mutual-funds';
import { fetchLatestNAV, searchMutualFunds, fetchSchemeHistory, fetchSchemeDetails } from '../utils/mutualFundsService';

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
  schemeHistoryCache: Map<string, SchemeHistoryResponse>;
  schemeDetailsCache: Map<number, MutualFundScheme>;
  inFlightRequests: Map<string, Promise<any>>;

  // Actions
  loadSchemes: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
  resetSearch: () => void;
  setError: (error: string | null) => void;
  getOrFetchSchemeHistory: (schemeCode: number, days: number) => Promise<SchemeHistoryResponse>;
  getOrFetchSchemeDetails: (schemeCode: number) => Promise<MutualFundScheme>;
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
  schemeHistoryCache: new Map(),
  schemeDetailsCache: new Map(),
  inFlightRequests: new Map(),

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

  // Get or fetch scheme history with caching and deduplication
  getOrFetchSchemeHistory: async (schemeCode: number, days: number) => {
    const { schemeHistoryCache, inFlightRequests } = get();
    const cacheKey = `${schemeCode}-${days}`;

    // Return cached data if available
    if (schemeHistoryCache.has(cacheKey)) {
      return schemeHistoryCache.get(cacheKey)!;
    }

    // If request is already in-flight, return the pending promise
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey)!;
    }

    // Make the API call
    const promise = fetchSchemeHistory(schemeCode, days);
    
    // Track this request as in-flight
    set((state) => {
      const newInFlightRequests = new Map(state.inFlightRequests);
      newInFlightRequests.set(cacheKey, promise);
      return { inFlightRequests: newInFlightRequests };
    });

    try {
      const data = await promise;
      
      // Cache the result only if data is not null
      if (data) {
        set((state) => {
          const newCache = new Map(state.schemeHistoryCache);
          newCache.set(cacheKey, data);
          return { schemeHistoryCache: newCache };
        });
      }

      // Remove from in-flight
      set((state) => {
        const newInFlightRequests = new Map(state.inFlightRequests);
        newInFlightRequests.delete(cacheKey);
        return { inFlightRequests: newInFlightRequests };
      });

      return data;
    } catch (error) {
      // Remove from in-flight on error
      set((state) => {
        const newInFlightRequests = new Map(state.inFlightRequests);
        newInFlightRequests.delete(cacheKey);
        return { inFlightRequests: newInFlightRequests };
      });
      throw error;
    }
  },

  // Get or fetch scheme details with caching and deduplication
  getOrFetchSchemeDetails: async (schemeCode: number) => {
    const { schemeDetailsCache, inFlightRequests } = get();
    const cacheKey = `details-${schemeCode}`;

    // Return cached data if available
    if (schemeDetailsCache.has(schemeCode)) {
      return schemeDetailsCache.get(schemeCode)!;
    }

    // If request is already in-flight, return the pending promise
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey)!;
    }

    // Make the API call
    const promise = fetchSchemeDetails(schemeCode);
    
    // Track this request as in-flight
    set((state) => {
      const newInFlightRequests = new Map(state.inFlightRequests);
      newInFlightRequests.set(cacheKey, promise);
      return { inFlightRequests: newInFlightRequests };
    });

    try {
      const data = await promise;
      
      // Cache the result only if data is not null
      if (data) {
        set((state) => {
          const newCache = new Map(state.schemeDetailsCache);
          newCache.set(schemeCode, data);
          return { schemeDetailsCache: newCache };
        });
      }

      // Remove from in-flight
      set((state) => {
        const newInFlightRequests = new Map(state.inFlightRequests);
        newInFlightRequests.delete(cacheKey);
        return { inFlightRequests: newInFlightRequests };
      });

      return data;
    } catch (error) {
      // Remove from in-flight on error
      set((state) => {
        const newInFlightRequests = new Map(state.inFlightRequests);
        newInFlightRequests.delete(cacheKey);
        return { inFlightRequests: newInFlightRequests };
      });
      throw error;
    }
  },
}))
