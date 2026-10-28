"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import styles from "./Header.module.css";
import { BUSINESS_NAME } from "@/config/business";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems, mounted } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label={`Home – ${BUSINESS_NAME}`}>
          <span className={styles.logoText}>{BUSINESS_NAME}</span>
          <span className={styles.logoTagline}>Fine Jewellery</span>
        </Link>

        {/* Navigation – desktop */}
        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${pathname === href ? styles.active : ""}`}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Icon group */}
        <div className={styles.iconGroup}>
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={`${styles.iconLink} ${pathname === "/wishlist" ? styles.active : ""}`}
            aria-label={
              mounted && wishlistCount > 0
                ? `Wishlist – ${wishlistCount} item${wishlistCount !== 1 ? "s" : ""}`
                : "Wishlist"
            }
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {mounted && wishlistCount > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className={`${styles.iconLink} ${pathname === "/cart" ? styles.active : ""}`}
            aria-label={
              mounted && totalItems > 0
                ? `Cart – ${totalItems} item${totalItems !== 1 ? "s" : ""}`
                : "Cart"
            }
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {mounted && totalItems > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobileNavLink} ${pathname === href ? styles.active : ""}`}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/wishlist" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                Wishlist{mounted && wishlistCount > 0 ? ` (${wishlistCount})` : ""}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
