import Link from "next/link";
import styles from "./Footer.module.css";
import {
  BUSINESS_NAME,
  BUSINESS_EMAIL,
  BUSINESS_TAGLINE,
  BUSINESS_INSTAGRAM,
  WHATSAPP_NUMBER,
} from "@/config/business";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <p className={styles.brandName}>{BUSINESS_NAME}</p>
          <p className={styles.brandTagline}>Fine Jewellery</p>
          <p className={styles.brandDesc}>
            {BUSINESS_TAGLINE}. Handcrafted with certified 18k and 22k BIS hallmarked gold,
            ethically sourced diamonds, and timeless artistry.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer navigation" className={styles.navCol}>
          <p className={styles.navHeading}>Explore</p>
          <ul className={styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop Collection</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/cart">Cart</Link></li>
          </ul>
        </nav>

        {/* Customer Care & Policies */}
        <nav aria-label="Customer Care" className={styles.navCol}>
          <p className={styles.navHeading}>Customer Care</p>
          <ul className={styles.navList}>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/shipping">Shipping Policy</Link></li>
            <li><Link href="/returns">Returns & Exchange</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <div className={styles.contactCol}>
          <p className={styles.navHeading}>Connect</p>
          <address className={styles.address}>
            <p>
              Email:{" "}
              <a href={`mailto:${BUSINESS_EMAIL}`}>
                {BUSINESS_EMAIL}
              </a>
            </p>
            {WHATSAPP_NUMBER && WHATSAPP_NUMBER !== "PLACEHOLDER_DIGITS_ONLY" ? (
              <p>
                WhatsApp:{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +{WHATSAPP_NUMBER}
                </a>
              </p>
            ) : (
              <p>WhatsApp: Available on order</p>
            )}
            {BUSINESS_INSTAGRAM && (
              <p>
                Instagram:{" "}
                <a
                  href={BUSINESS_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @aurajewellery
                </a>
              </p>
            )}
            <p style={{ marginTop: "var(--space-2)", fontSize: "0.8rem", color: "#8e8579" }}>
              Mon – Sat, 10:00 AM – 7:00 PM IST
            </p>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>
            &copy; {year} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            All prices in Indian Rupees (₹). Orders verified and placed seamlessly via WhatsApp.
            100% Certified Purity.
          </p>
        </div>
      </div>
    </footer>
  );
}
