"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WishlistState = {
  wishlist: string[];
  mounted: boolean;
};

type WishlistAction =
  | { type: "HYDRATE"; items: string[] }
  | { type: "TOGGLE"; productId: string }
  | { type: "REMOVE"; productId: string };

type WishlistContextValue = {
  wishlist: string[];
  wishlistCount: number;
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  mounted: boolean;
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { wishlist: action.items, mounted: true };
    case "TOGGLE": {
      const exists = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    }
    case "REMOVE":
      return {
        ...state,
        wishlist: state.wishlist.filter((id) => id !== action.productId),
      };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "aura-wishlist";

function loadWishlistFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((id): id is string => typeof id === "string");
      }
    }
  } catch {
    // ignore
  }
  return [];
}

function saveWishlistToStorage(items: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlist: [],
    mounted: false,
  });

  // Hydrate once on mount
  useEffect(() => {
    dispatch({ type: "HYDRATE", items: loadWishlistFromStorage() });
  }, []);

  // Persist on change (only after mounted)
  useEffect(() => {
    if (state.mounted) {
      saveWishlistToStorage(state.wishlist);
    }
  }, [state.wishlist, state.mounted]);

  const isWishlisted = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const toggle = useCallback((productId: string) => {
    dispatch({ type: "TOGGLE", productId });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlist,
        wishlistCount: state.wishlist.length,
        isWishlisted,
        toggle,
        remove,
        mounted: state.mounted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
