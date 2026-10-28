"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, categories, type Category } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import styles from "./shop.module.css";

const categoryLabels: Record<Category, string> = {
  necklaces: "Necklaces",
  earrings: "Earrings",
  rings: "Rings",
  bracelets: "Bracelets",
};

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const sortLabels: Record<SortOption, string> = {
  default: "Default",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
};

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [activeCategory, setActiveCategory] = useState<Category | "all">(
    () => {
      const cat = searchParams.get("category");
      if (cat && (categories as readonly string[]).includes(cat)) {
        return cat as Category;
      }
      return "all";
    }
  );

  // Keep URL in sync with filter state (no server-round-trip needed for static)
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }, [activeCategory, router]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    // Sort
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, activeCategory, sort]);

  function clearFilters() {
    setSearch("");
    setActiveCategory("all");
    setSort("default");
  }

  return (
    <>
      {/* Page heading */}
      <div className="page-header">
        <p className="section-eyebrow">Browse</p>
        <h1 className="page-title">All Products</h1>
        <p className="page-subtitle">
          {products.length} piece{products.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="container">
        {/* ── Controls ── */}
        <div className={styles.controls}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <label htmlFor="search-products" className="sr-only">
              Search products
            </label>
            <svg
              aria-hidden="true"
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              id="search-products"
              type="search"
              className={`form-input ${styles.searchInput}`}
              placeholder="Search by name or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Sort */}
          <div className={styles.sortWrapper}>
            <label htmlFor="sort-products" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-products"
              className={`form-input ${styles.sortSelect}`}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filters */}
        <div className={styles.filters} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === "all" ? styles.filterActive : ""}`}
            aria-pressed={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* ── Results ── */}
        {filtered.length > 0 ? (
          <>
            <p className={styles.resultsCount} aria-live="polite" aria-atomic="true">
              Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "all" ? ` in ${categoryLabels[activeCategory]}` : ""}
              {search ? ` for "${search}"` : ""}
            </p>
            <ProductGrid products={filtered} columns={4} />
          </>
        ) : (
          <div className={styles.empty} role="status" aria-live="polite">
            <p className={styles.emptyTitle}>No products found</p>
            <p className={styles.emptyDesc}>
              Try a different search term or category.
            </p>
            <button type="button" className="btn-outline" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}

        <div style={{ paddingBottom: "var(--space-20)" }} />
      </div>
    </>
  );
}
