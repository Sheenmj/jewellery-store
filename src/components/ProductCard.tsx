"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import styles from "./ProductCard.module.css";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const badgeLabels: Record<NonNullable<Product["badge"]>, string> = {
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited",
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { isWishlisted, toggle, mounted } = useWishlist();
  const wishlisted = mounted && isWishlisted(product.id);

  return (
    <article className={styles.card}>
      <div className={styles.imageArea}>
        <Link
          href={`/products/${product.slug}`}
          className={styles.imageLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={styles.image}
            />
          </div>
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge--${product.badge}`]}`}>
            {badgeLabels[product.badge]}
          </span>
        )}

        {/* Wishlist button */}
        {mounted && (
          <button
            type="button"
            className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ""}`}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            onClick={() => toggle(product.id)}
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}

        {/* Quick view overlay */}
        <Link href={`/products/${product.slug}`} className={styles.quickView}>
          View Details
        </Link>
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>

        <h2 className={styles.name}>
          <Link href={`/products/${product.slug}`} className={styles.nameLink}>
            {product.name}
          </Link>
        </h2>

        <p className={styles.price}>{inrFormatter.format(product.price)}</p>
      </div>
    </article>
  );
}
