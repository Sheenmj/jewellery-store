"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import { getProductById, products } from "@/data/products";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  /** true once the client has hydrated from localStorage */
  mounted: boolean;
};

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; productId: string; quantity?: number }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "jewellery-cart-v1";
const MIN_QTY = 1;
const MAX_QTY = 99;

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items, mounted: true };

    case "ADD": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find(
        (i) => i.productId === action.productId
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.productId
              ? {
                  ...i,
                  quantity: Math.min(MAX_QTY, i.quantity + qty),
                }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { productId: action.productId, quantity: Math.min(MAX_QTY, qty) },
        ],
      };
    }

    case "SET_QUANTITY": {
      const clamped = Math.max(MIN_QTY, Math.min(MAX_QTY, action.quantity));
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: clamped } : i
        ),
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.productId),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

type CartContextValue = {
  items: CartItem[];
  mounted: boolean;
  totalItems: number;
  subtotal: number;
  formattedSubtotal: string;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function sanitiseStoredItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];

  const knownIds = new Set(products.map((p) => p.id));

  return raw.filter((item): item is CartItem => {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof item.productId !== "string" ||
      typeof item.quantity !== "number"
    )
      return false;

    if (!knownIds.has(item.productId)) return false;
    if (!Number.isInteger(item.quantity)) return false;
    if (item.quantity < MIN_QTY || item.quantity > MAX_QTY) return false;

    return true;
  });
}

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return sanitiseStoredItems(JSON.parse(raw));
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    mounted: false,
  });

  // Hydrate once on client
  useEffect(() => {
    dispatch({ type: "HYDRATE", items: loadFromStorage() });
  }, []);

  // Persist whenever items change (but only after mounted)
  useEffect(() => {
    if (state.mounted) {
      saveToStorage(state.items);
    }
  }, [state.items, state.mounted]);

  const subtotal = useMemo(
    () =>
      state.items.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    mounted: state.mounted,
    totalItems: state.items.reduce((s, i) => s + i.quantity, 0),
    subtotal,
    formattedSubtotal: inrFormatter.format(subtotal),
    add: (productId, quantity) =>
      dispatch({ type: "ADD", productId, quantity }),
    setQuantity: (productId, quantity) =>
      dispatch({ type: "SET_QUANTITY", productId, quantity }),
    remove: (productId) => dispatch({ type: "REMOVE", productId }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
