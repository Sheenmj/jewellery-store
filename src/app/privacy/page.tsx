import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_EMAIL } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and customer data protection standards at ${BUSINESS_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: "800px", paddingBlock: "var(--space-16)" }}>
      <div className="page-header" style={{ textAlign: "left", marginBottom: "var(--space-10)" }}>
        <p className="section-eyebrow">Data & Security</p>
        <h1 className="page-title" style={{ textAlign: "left" }}>Privacy Policy</h1>
        <p className="page-subtitle" style={{ textAlign: "left" }}>
          How we safeguard your personal information and respect your privacy.
        </p>
      </div>

      <div style={{ color: "var(--color-charcoal)", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            1. Overview
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            {BUSINESS_NAME} is committed to protecting your privacy. This policy explains what information we collect when you visit our website, place enquiries, or finalize orders, and how that information is handled with the strictest confidentiality.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            2. Information We Collect
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            We only collect information necessary to fulfill your enquiries and orders, including:
          </p>
          <ul style={{ color: "var(--color-muted)", paddingLeft: "var(--space-5)", marginTop: "var(--space-2)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <li>Your name, contact phone number, and delivery address provided in your order or cart.</li>
            <li>Enquiry details and customisation requests shared directly with our consultants.</li>
            <li>Browser cookies strictly necessary for maintaining your cart and wishlist state locally on your device.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            3. Payment Security & Zero Card Storage
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            We never store, capture, or log your credit card, debit card, or banking credentials on our web servers. All payment transactions are settled directly via verified UPI IDs, bank transfers (NEFT/RTGS), or authorized secure payment links.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            4. WhatsApp Communication Privacy
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            When you initiate conversation or send order requests via WhatsApp, messages are end-to-end encrypted in accordance with Meta’s WhatsApp security standards. We do not sell, rent, or trade your contact details with any marketing third-parties.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            5. Contacting Us About Your Data
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            If you wish to update your records, request data deletion, or have questions regarding our privacy practices, please contact us at{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: "var(--color-gold-text)", fontWeight: 500 }}>
              {BUSINESS_EMAIL}
            </a>.
          </p>
        </section>
      </div>

      <div style={{ marginTop: "var(--space-12)" }}>
        <Link href="/" className="btn-outline">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}
