import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import styles from "./page.module.css";
import { WHATSAPP_NUMBER, BUSINESS_NAME, BUSINESS_TAGLINE } from "@/config/business";

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} – Fine Jewellery`,
  description:
    "Discover handcrafted fine jewellery — necklaces, earrings, rings and bracelets. Shop the collection and order on WhatsApp.",
  openGraph: {
    title: `${BUSINESS_NAME} – Fine Jewellery`,
    description:
      "Discover handcrafted fine jewellery — necklaces, earrings, rings and bracelets.",
    url: "/",
  },
};

const whatsappConfigured = WHATSAPP_NUMBER !== "PLACEHOLDER_DIGITS_ONLY";
const whatsappHref = whatsappConfigured
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "#";

const categoryLabels: Record<string, string> = {
  necklaces: "Necklaces",
  earrings: "Earrings",
  rings: "Rings",
  bracelets: "Bracelets",
};

const categoryImages: Record<string, string> = {
  necklaces: "/images/sample-necklace-1.jpg",
  earrings: "/images/sample-earrings-1.jpg",
  rings: "/images/sample-ring-1.jpg",
  bracelets: "/images/sample-bracelet-1.jpg",
};

const trustBadges = [
  { icon: "✦", label: "BIS Hallmarked", desc: "Certified quality" },
  { icon: "◈", label: "Handcrafted", desc: "Artisan made" },
  { icon: "✧", label: "Free Shipping", desc: "Pan-India orders" },
  { icon: "◇", label: "Easy Returns", desc: "14-day policy" },
];

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/hero.jpg"
            alt="Luxury gold jewellery with diamonds on velvet"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.heroEyebrow}>Fine Jewellery</p>
          <h1 className={styles.heroTitle}>
            Where Every<br />
            Piece Tells<br />
            a Story
          </h1>
          <p className={styles.heroSub}>{BUSINESS_TAGLINE}</p>
          <div className={styles.heroCtas}>
            <Link href="/shop" className={`btn-primary ${styles.heroCta}`}>
              Shop the Collection
            </Link>
            <Link href="/about" className={`btn-outline-light ${styles.heroCta}`}>
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────── */}
      <section className={styles.trustStrip} aria-label="Trust badges">
        <div className="container">
          <ul className={styles.trustGrid}>
            {trustBadges.map((b) => (
              <li key={b.label} className={styles.trustItem}>
                <span className={styles.trustIcon} aria-hidden="true">{b.icon}</span>
                <div>
                  <p className={styles.trustLabel}>{b.label}</p>
                  <p className={styles.trustDesc}>{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-eyebrow">New Arrivals</p>
            <h2 className="section-title" id="featured-heading">
              Featured Pieces
            </h2>
          </div>
          <ProductGrid products={featured} columns={4} />
          <div className={styles.sectionFooter}>
            <Link href="/shop" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Cards ────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.categorySection}`} aria-labelledby="categories-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-eyebrow">Browse by Type</p>
            <h2 className="section-title" id="categories-heading">
              Our Collections
            </h2>
          </div>
          <ul className={styles.categoryGrid} aria-label="Product categories">
            {categories.map((cat) => (
              <li key={cat}>
                <Link href={`/shop?category=${cat}`} className={styles.categoryCard}>
                  <div className={styles.categoryImageWrapper}>
                    <Image
                      src={categoryImages[cat]}
                      alt={`Browse ${categoryLabels[cat]}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className={styles.categoryImage}
                    />
                    <div className={styles.categoryOverlay} aria-hidden="true" />
                  </div>
                  <span className={styles.categoryLabel}>{categoryLabels[cat]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Brand Story Intro ───────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.aboutSection}`} aria-labelledby="about-heading">
        <div className={`container ${styles.aboutInner}`}>
          <div>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-title" id="about-heading">
              Crafted with<br />Passion &amp; Purpose
            </h2>
            <p className={styles.aboutText}>
              At Aura Fine Jewellery, every piece is born from the hands of master craftspeople
              who have spent decades perfecting their art. We source only the finest metals and
              gemstones, ensuring that every ring, necklace, earring, and bracelet that leaves
              our studio is a work of enduring beauty.
            </p>
            <p className={styles.aboutText}>
              From traditional Indian designs rich in cultural heritage to contemporary minimalist
              pieces — our collection speaks to every occasion and every heart.
            </p>
            <Link href="/about" className="btn-outline" style={{ marginTop: "var(--space-6)" }}>
              Learn More
            </Link>
          </div>
          <div className={styles.aboutImageWrapper} aria-hidden="true">
            <Image
              src="/images/about-placeholder.jpg"
              alt="Artisan crafting jewellery in our studio"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={styles.aboutImage}
            />
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────────────────── */}
      <section className={styles.whatsappSection} aria-labelledby="whatsapp-heading">
        <div className="container">
          <p className="section-eyebrow" style={{ color: "var(--color-champagne)" }}>
            Easy Ordering
          </p>
          <h2 className={styles.whatsappTitle} id="whatsapp-heading">
            Order on WhatsApp
          </h2>
          <p className={styles.whatsappDesc}>
            Add items to your cart, fill in your details, and place your order
            directly on WhatsApp — no account needed. We confirm availability
            and shipping within 24 hours.
          </p>
          {whatsappConfigured ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          ) : (
            <Link href="/shop" className="btn-primary">
              Browse the Collection
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
