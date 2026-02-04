import { create } from "zustand";

interface WatchlistStore {
  watchlist: number[];
  hasWatchlist: boolean;
  loadWatchlist: () => void;
  addToWatchlist: (schemeCode: number) => void;
  removeFromWatchlist: (schemeCode: number) => void;
  isInWatchlist: (schemeCode: number) => boolean;
  getWatchlist: () => number[];
}

const WATCHLIST_KEY = "mf_watchlist";

export const useWatchlistStore = create<WatchlistStore>((set, get) => ({
  watchlist: [],
  hasWatchlist: false,

  loadWatchlist: () => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      const watchlist = stored ? JSON.parse(stored) : [];
      set({
        watchlist,
        hasWatchlist: watchlist.length > 0,
      });
    } catch (error) {
      console.error("Error loading watchlist:", error);
      set({ watchlist: [], hasWatchlist: false });
    }
  },

  addToWatchlist: (schemeCode: number) => {
    const { watchlist } = get();
    if (!watchlist.includes(schemeCode)) {
      const newWatchlist = [...watchlist, schemeCode];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
      set({
        watchlist: newWatchlist,
        hasWatchlist: true,
      });
    }
  },

  removeFromWatchlist: (schemeCode: number) => {
    const { watchlist } = get();
    const newWatchlist = watchlist.filter((code) => code !== schemeCode);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
    set({
      watchlist: newWatchlist,
      hasWatchlist: newWatchlist.length > 0,
    });
  },

  isInWatchlist: (schemeCode: number) => {
    return get().watchlist.includes(schemeCode);
  },

  getWatchlist: () => {
    return get().watchlist;
  },
}));
