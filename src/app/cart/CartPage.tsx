"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { WHATSAPP_NUMBER } from "@/config/business";
import styles from "./cart.module.css";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  phone: string;
  address: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Validation ──────────────────────────────────────────────────────────────

function validatePhone(raw: string): string {
  // Strip spaces and +91 prefix
  const digits = raw.replace(/\s/g, "").replace(/^\+?91/, "");
  if (!/^\d{10}$/.test(digits)) {
    return "Enter a valid 10-digit Indian mobile number";
  }
  return "";
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const name = data.name.trim();
  if (!name) errors.name = "Name is required";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer";

  const phoneErr = validatePhone(data.phone);
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  else if (phoneErr) errors.phone = phoneErr;

  if (data.address.length > 300) errors.address = "Address must be 300 characters or fewer";

  return errors;
}

// ─── WhatsApp message builder ─────────────────────────────────────────────────

function buildWhatsAppMessage(
  form: FormData,
  items: { name: string; quantity: number; lineTotal: number }[],
  subtotal: number
): string {
  const lines: string[] = [
    "Hello, I would like to place an order.",
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
  ];

  const addr = form.address.trim();
  if (addr) lines.push(`Address: ${addr}`);

  lines.push("Items:");
  for (const item of items) {
    lines.push(`- ${item.name} × ${item.quantity} = ${inrFormatter.format(item.lineTotal)}`);
  }
  lines.push(`Subtotal: ${inrFormatter.format(subtotal)}`);
  lines.push(
    "Please confirm availability, shipping and final total before payment."
  );

  return lines.join("\n");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const { items, mounted, setQuantity, remove, clear, subtotal, formattedSubtotal } = useCart();
  const [form, setForm] = useState<FormData>({ name: "", phone: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  // Derive errors on every render after first submit — avoids setState-in-effect
  const errors = useMemo<FormErrors>(
    () => (submitted ? validateForm(form) : {}),
    [form, submitted]
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs: Record<keyof FormData, React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    address: addressRef,
  };

  const whatsappConfigured = WHATSAPP_NUMBER !== "PLACEHOLDER_DIGITS_ONLY";

  // Build enriched line items for display + message
  const lineItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateForm(form);

    if (Object.keys(errs).length > 0) {
      // Focus first invalid field
      const firstKey = (["name", "phone", "address"] as (keyof FormData)[]).find(
        (k) => errs[k]
      );
      if (firstKey) {
        // Use requestAnimationFrame to allow the derived errors to render first
        requestAnimationFrame(() => {
          const ref = fieldRefs[firstKey];
          if (ref.current) ref.current.focus();
        });
      }
      return;
    }

    if (!whatsappConfigured) return;
    if (lineItems.length === 0) return;

    const messageItems = lineItems.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      lineTotal: i.lineTotal,
    }));

    const message = buildWhatsAppMessage(form, messageItems, subtotal);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  }

  if (!mounted) {
    return (
      <div className={styles.loadingState}>
        <p>Loading cart…</p>
      </div>
    );
  }

  if (lineItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className="section-eyebrow">Cart</p>
        <h1 className="page-title" style={{ marginTop: "var(--space-3)" }}>
          Your Cart is Empty
        </h1>
        <p className={styles.emptyDesc}>
          Browse our collection and add pieces you love.
        </p>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header" style={{ textAlign: "left" }}>
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">{lineItems.length} item{lineItems.length !== 1 ? "s" : ""}</p>
      </div>

      <div className={styles.layout}>
        {/* ── Cart Items ── */}
        <section aria-label="Cart items" className={styles.itemsSection}>
          <ul className={styles.itemList}>
            {lineItems.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className={styles.cartItem}>
                <Link href={`/products/${product.slug}`} className={styles.itemImageLink}>
                  <div className={styles.itemImageWrapper}>
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="96px"
                      className={styles.itemImage}
                    />
                  </div>
                </Link>

                <div className={styles.itemBody}>
                  <div className={styles.itemHeader}>
                    <div>
                      <p className={styles.itemCategory}>{product.category}</p>
                      <Link href={`/products/${product.slug}`} className={styles.itemName}>
                        {product.name}
                      </Link>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from cart`}
                      className={`btn-ghost ${styles.removeBtn}`}
                      onClick={() => remove(product.id)}
                    >
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                      </svg>
                    </button>
                  </div>

                  <div className={styles.itemFooter}>
                    <div className={styles.itemQtyControls} role="group" aria-label={`Quantity for ${product.name}`}>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className={styles.qtyBtn}
                        onClick={() =>
                          quantity > 1
                            ? setQuantity(product.id, quantity - 1)
                            : remove(product.id)
                        }
                      >
                        −
                      </button>
                      <span className={styles.qtyDisplay} aria-live="polite">{quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className={styles.qtyBtn}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        disabled={quantity >= 99}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.itemPricing}>
                      <span className={styles.unitPrice}>{inrFormatter.format(product.price)} ea.</span>
                      <span className={styles.lineTotal}>{inrFormatter.format(lineTotal)}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.cartActions}>
            <button type="button" className="btn-ghost" onClick={clear}>
              Clear cart
            </button>
            <Link href="/shop" className={styles.continueLink}>
              ← Continue Shopping
            </Link>
          </div>
        </section>

        {/* ── Order Form + Summary ── */}
        <aside className={styles.summarySection} aria-label="Order summary and checkout">
          {/* Subtotal */}
          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryAmount}>{formattedSubtotal}</span>
            </div>
            <p className={styles.summaryNote}>
              Shipping and final total confirmed via WhatsApp.
            </p>
          </div>

          {/* Checkout form */}
          {!whatsappConfigured && (
            <div className={styles.waNoticeBox} role="alert">
              <strong>WhatsApp not configured.</strong> The store phone number
              has not been set up. The order button is disabled.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={styles.form}
            noValidate
            aria-label="Order details form"
          >
            <h2 className={styles.formTitle}>Your Details</h2>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="customer-name" className="form-label">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef as React.RefObject<HTMLInputElement>}
                id="customer-name"
                type="text"
                className="form-input"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                maxLength={80}
              />
              {errors.name && (
                <span id="name-error" className="form-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="customer-phone" className="form-label">
                Phone <span aria-hidden="true">*</span>
              </label>
              <input
                ref={phoneRef as React.RefObject<HTMLInputElement>}
                id="customer-phone"
                type="tel"
                className="form-input"
                autoComplete="tel"
                placeholder="e.g. 98765 43210"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="form-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Address (optional) */}
            <div className="form-group">
              <label htmlFor="customer-address" className="form-label">
                Delivery Address <span className={styles.optionalLabel}>(optional)</span>
              </label>
              <textarea
                ref={addressRef as React.RefObject<HTMLTextAreaElement>}
                id="customer-address"
                className="form-textarea"
                autoComplete="street-address"
                placeholder="Full delivery address"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                maxLength={300}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "address-error" : undefined}
              />
              {errors.address && (
                <span id="address-error" className="form-error" role="alert">
                  {errors.address}
                </span>
              )}
              <span className={styles.charCount} aria-live="polite">
                {form.address.length}/300
              </span>
            </div>

            <button
              type="submit"
              className="btn-whatsapp"
              disabled={!whatsappConfigured}
              style={{ width: "100%" }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Order on WhatsApp
            </button>

            <p className={styles.disclaimer}>
              Clicking the button opens WhatsApp with your order details.
              No order is confirmed until the store responds.
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}
