"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WishlistContextValue = {
  wishlist: string[]; // array of productIds
  wishlistCount: number;
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  mounted: boolean;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "aura-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist, mounted]);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const toggle = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggle,
        remove,
        mounted,
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
