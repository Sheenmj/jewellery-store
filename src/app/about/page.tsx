import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_NAME } from "@/config/business";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Learn about ${BUSINESS_NAME} — our craftsmanship, values, and commitment to fine jewellery.`,
};

const milestones = [
  { year: "2005", title: "The Beginning", desc: "Founded in a small atelier in Jaipur, with a passion for traditional goldsmithing." },
  { year: "2010", title: "Growing Craft", desc: "Expanded our studio, welcoming master artisans from across Rajasthan." },
  { year: "2016", title: "BIS Certification", desc: "Achieved BIS hallmarking certification — our commitment to verified purity." },
  { year: "2024", title: "Online Boutique", desc: "Launched our online store, bringing fine jewellery to customers across India." },
];

const values = [
  { icon: "✦", title: "Authentic Craftsmanship", desc: "Every piece is handmade by skilled artisans using traditional techniques passed down through generations." },
  { icon: "◈", title: "Certified Quality", desc: "All gold jewellery is BIS hallmarked. Gemstones are sourced from reputable certified suppliers." },
  { icon: "✧", title: "Ethical Sourcing", desc: "We are committed to responsible sourcing of metals and gemstones, with full supply chain transparency." },
  { icon: "◇", title: "Customer First", desc: "Your satisfaction is our priority. From ordering on WhatsApp to doorstep delivery — we are with you every step." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/about-placeholder.jpg"
            alt="Artisan crafting jewellery in Aura Fine Jewellery studio"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.heroEyebrow}>Est. 2005</p>
          <h1 className={styles.heroTitle}>Our Story</h1>
          <p className={styles.heroSub}>
            Two decades of passion, precision, and beauty
          </p>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyText}>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title" style={{ marginTop: "var(--space-3)" }}>
              Crafted with<br />Heart &amp; Heritage
            </h2>
            <p className={styles.bodyText}>
              Aura Fine Jewellery was born from a deep love of traditional Indian jewellery-making
              and a belief that truly beautiful pieces should be accessible to every celebration —
              from everyday elegance to once-in-a-lifetime moments.
            </p>
            <p className={styles.bodyText}>
              Our artisans bring decades of experience in ancient techniques including meenakari,
              kundan setting, and filigree work. Each piece in our collection is the product of
              many hours of patient, skilled craftsmanship. We do not mass-produce. We create.
            </p>
            <p className={styles.bodyText}>
              Based in Jaipur — the Pink City and the jewellery capital of India — we draw
              inspiration from the rich cultural heritage around us, blending timeless Indian
              designs with contemporary sensibilities.
            </p>
          </div>
          <div className={styles.storyImageWrapper}>
            <Image
              src="/images/sample-necklace-1.jpg"
              alt="Royal Heritage Necklace – a signature Aura piece"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className={styles.storyImage}
            />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
            <p className="section-eyebrow">What We Stand For</p>
            <h2 className="section-title" style={{ marginTop: "var(--space-3)" }}>Our Values</h2>
          </div>
          <ul className={styles.valuesGrid}>
            {values.map((v) => (
              <li key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
            <p className="section-eyebrow">Our Journey</p>
            <h2 className="section-title" style={{ marginTop: "var(--space-3)" }}>Milestones</h2>
          </div>
          <ol className={styles.timeline}>
            {milestones.map((m, i) => (
              <li key={m.year} className={`${styles.timelineItem} ${i % 2 === 1 ? styles.timelineRight : ""}`}>
                <div className={styles.timelineContent}>
                  <p className={styles.timelineYear}>{m.year}</p>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="section-eyebrow" style={{ color: "var(--color-champagne)" }}>Begin Your Journey</p>
          <h2 className={styles.ctaTitle}>Find Your Perfect Piece</h2>
          <p className={styles.ctaDesc}>
            Browse our curated collection of handcrafted fine jewellery — made with love, for moments that matter.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn-primary">Shop the Collection</Link>
            <Link href="/contact" className="btn-outline" style={{ color: "var(--color-ivory)", borderColor: "rgba(251,248,243,0.4)" }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
