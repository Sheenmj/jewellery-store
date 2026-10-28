"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import styles from "./wishlist.module.css";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function WishlistPage() {
  const { wishlist, remove, mounted } = useWishlist();
  const { add } = useCart();

  if (!mounted) {
    return (
      <div className={styles.loading}>
        <p>Loading wishlist…</p>
      </div>
    );
  }

  const wishlistItems = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg aria-hidden="true" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <p className="section-eyebrow">Wishlist</p>
        <h1 className="page-title" style={{ marginTop: "var(--space-3)" }}>
          Your Wishlist is Empty
        </h1>
        <p className={styles.emptyDesc}>
          Save pieces you love by clicking the heart icon on any product.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header" style={{ textAlign: "left" }}>
        <h1 className="page-title">Your Wishlist</h1>
        <p className="page-subtitle">
          {wishlistItems.length} saved piece{wishlistItems.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ul className={styles.grid}>
        {wishlistItems.map((product) => (
          <li key={product.id} className={styles.card}>
            <Link href={`/products/${product.slug}`} className={styles.imageLink}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className={styles.image}
                />
              </div>
            </Link>

            <div className={styles.body}>
              <p className={styles.category}>{product.category}</p>
              <Link href={`/products/${product.slug}`} className={styles.name}>
                {product.name}
              </Link>
              <p className={styles.price}>{inrFormatter.format(product.price)}</p>

              <div className={styles.actions}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    add(product.id, 1);
                  }}
                  style={{ fontSize: "var(--text-sm)", padding: "var(--space-2) var(--space-4)" }}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  style={{ color: "var(--color-muted)" }}
                >
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ paddingBottom: "var(--space-20)" }} />
    </div>
  );
}
