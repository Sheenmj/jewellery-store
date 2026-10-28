import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME } from "@/config/business";

export const metadata: Metadata = {
  title: "Returns & Exchange Policy",
  description: `Understand the 14-day return, exchange, and lifetime buyback policy at ${BUSINESS_NAME}.`,
};

export default function ReturnsPage() {
  return (
    <div className="container" style={{ maxWidth: "800px", paddingBlock: "var(--space-16)" }}>
      <div className="page-header" style={{ textAlign: "left", marginBottom: "var(--space-10)" }}>
        <p className="section-eyebrow">Assurance & Trust</p>
        <h1 className="page-title" style={{ textAlign: "left" }}>Returns & Exchange Policy</h1>
        <p className="page-subtitle" style={{ textAlign: "left" }}>
          Your complete peace of mind is our utmost commitment.
        </p>
      </div>

      <div style={{ color: "var(--color-charcoal)", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            1. 14-Day Hassle-Free Returns
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            We want you to love your jewellery. If for any reason you are not completely satisfied with your standard ready-to-wear purchase, you may initiate a return or exchange request within 14 days from the date of confirmed delivery.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            2. Return Eligibility Criteria
          </h2>
          <ul style={{ color: "var(--color-muted)", paddingLeft: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <li>The piece must be unworn, undamaged, and free from scratches or alterations.</li>
            <li>The original BIS Hallmark certification tag and security seal must remain intact and untampered.</li>
            <li>All original packaging, velvet cases, and authenticity documentation must be returned together with the item.</li>
            <li>Customized, engraved, or bespoke commission pieces are handcrafted exclusively for you and are eligible for exchange/resizing only, not direct return.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            3. How to Initiate a Return
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Contact our dedicated concierge team via WhatsApp or email with your order details and photos of the piece with the security tag attached. Once approved, we will arrange a secure, insured courier pickup directly from your address at no additional cost to you.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            4. Quality Inspection & Refund Process
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Upon receipt at our gemological atelier, our quality evaluation team verifies the weight, hallmark purity, and stone integrity within 48 hours. Following verification, refunds are credited back to your original source of payment (bank account or UPI) within 3–5 working days.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            5. Lifetime Exchange & Buyback
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            We stand behind every piece for a lifetime. Any piece purchased from {BUSINESS_NAME} can be upgraded or exchanged in the future against prevailing gold and diamond market rates.
          </p>
        </section>
      </div>

      <div style={{ marginTop: "var(--space-12)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <Link href="/contact" className="btn-primary">
          Contact Concierge
        </Link>
        <Link href="/faq" className="btn-outline">
          View FAQs
        </Link>
      </div>
    </div>
  );
}
