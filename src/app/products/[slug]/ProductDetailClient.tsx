"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { WHATSAPP_NUMBER } from "@/config/business";
import styles from "./product.module.css";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const categoryLabels: Record<string, string> = {
  necklaces: "Necklaces",
  earrings: "Earrings",
  rings: "Rings",
  bracelets: "Bracelets",
};

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const { isWishlisted, toggle, mounted } = useWishlist();

  const wishlisted = mounted && isWishlisted(product.id);
  const whatsappConfigured = WHATSAPP_NUMBER !== "PLACEHOLDER_DIGITS_ONLY";
  const enquiryText = `Hello, I'm interested in: ${product.name} (₹${product.price.toLocaleString("en-IN")}). Could you please share more details?`;
  const whatsappHref = whatsappConfigured
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryText)}`
    : "#";

  // Related products from same category, excluding current
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  function handleQuantityChange(delta: number) {
    setQuantity((q) => Math.max(1, Math.min(99, q + delta)));
  }

  function handleAddToCart() {
    add(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/shop">Shop</Link></li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/shop?category=${product.category}`}>
              {categoryLabels[product.category]}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className={styles.grid}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            {product.badge && (
              <span className={`${styles.badge} ${styles[product.badge]}`}>
                {product.badge === "bestseller" ? "Bestseller" : product.badge === "new" ? "New" : "Limited Edition"}
              </span>
            )}
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className={styles.details}>
          <div className={styles.categoryAndWishlist}>
            <p className={styles.categoryLabel}>
              {categoryLabels[product.category]}
            </p>
            <button
              type="button"
              className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ""}`}
              onClick={() => toggle(product.id)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              title={wishlisted ? "Saved in wishlist" : "Save to wishlist"}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={wishlisted ? "var(--color-crimson, #c0392b)" : "none"}
                stroke={wishlisted ? "var(--color-crimson, #c0392b)" : "currentColor"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{wishlisted ? "Saved" : "Save"}</span>
            </button>
          </div>

          <h1 className={styles.productName}>{product.name}</h1>

          <p className={styles.price}>{inrFormatter.format(product.price)}</p>

          <p className={styles.description}>{product.description}</p>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className={styles.specs}>
              <h2 className={styles.specsTitle}>Artisanal Specifications</h2>
              <dl className={styles.specsList}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <dt className={styles.specKey}>{key}</dt>
                    <dd className={styles.specVal}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quantity selector */}
          <div className={styles.quantitySection}>
            <label htmlFor="qty-input" className={styles.quantityLabel}>
              Quantity
            </label>
            <div className={styles.quantityControls}>
              <button
                type="button"
                aria-label="Decrease quantity"
                className={styles.qtyBtn}
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                id="qty-input"
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) setQuantity(Math.max(1, Math.min(99, v)));
                }}
                className={styles.qtyInput}
                aria-label="Quantity"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                className={styles.qtyBtn}
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 99}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleAddToCart}
              aria-live="polite"
              style={{ flex: 1, minWidth: "200px" }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            {whatsappConfigured ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ flex: 1, minWidth: "200px", justifyContent: "center" }}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Enquire on WhatsApp
              </a>
            ) : null}
          </div>

          {/* Trust strip */}
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>BIS Hallmarked Purity</span>
            </div>
            <div className={styles.trustItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>100% Insured Delivery</span>
            </div>
            <div className={styles.trustItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>14-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <p className="section-eyebrow">Complementary Pieces</p>
            <h2 className="section-title">You May Also Admire</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div style={{ paddingBottom: "var(--space-20)" }} />
    </div>
  );
}
