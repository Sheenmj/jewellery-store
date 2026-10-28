import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop – All Products",
  description:
    "Browse our full collection of handcrafted necklaces, earrings, rings and bracelets. Filter by category and search by name.",
  openGraph: {
    title: "Shop – All Products",
    description:
      "Browse our full collection of handcrafted necklaces, earrings, rings and bracelets.",
    url: "/shop",
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: "var(--space-16)", textAlign: "center" }}>Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
