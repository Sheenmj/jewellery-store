import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME } from "@/config/business";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `Learn about insured shipping, dispatch timelines, and tamper-proof delivery at ${BUSINESS_NAME}.`,
};

export default function ShippingPage() {
  return (
    <div className="container" style={{ maxWidth: "800px", paddingBlock: "var(--space-16)" }}>
      <div className="page-header" style={{ textAlign: "left", marginBottom: "var(--space-10)" }}>
        <p className="section-eyebrow">Customer Care</p>
        <h1 className="page-title" style={{ textAlign: "left" }}>Shipping & Delivery Policy</h1>
        <p className="page-subtitle" style={{ textAlign: "left" }}>
          Every piece is fully insured, securely packaged, and delivered directly to your doorstep.
        </p>
      </div>

      <div style={{ color: "var(--color-charcoal)", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            1. 100% Insured Pan-India Shipping
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            At {BUSINESS_NAME}, every order is dispatched via reputable courier partners (such as Sequel Logistics, Blue Dart Apex, and BVC Logistics) specializing in high-value fine jewellery transit. All parcels are 100% insured until they reach your hands.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            2. Processing & Dispatch Timelines
          </h2>
          <ul style={{ color: "var(--color-muted)", paddingLeft: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <li><strong>Ready-to-Ship Inventory:</strong> Dispatched within 24 to 48 hours of order confirmation.</li>
            <li><strong>Bespoke / Sized Jewellery:</strong> Handcrafted to your measurements and dispatched within 7 to 10 business days.</li>
            <li><strong>Estimated Transit Time:</strong> Metro cities typically receive delivery within 3–5 business days post-dispatch; regional locations within 5–7 business days.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            3. Tamper-Proof Packaging
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Your jewellery is encased in a premium velvet-lined presentation box, accompanied by its BIS hallmark certificate and valuation slip. The box is sealed within a tamper-evident, water-resistant outer sleeve. We strictly advise customers not to accept parcels that show signs of damage, cutting, or external tampering.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            4. Delivery Verification & Signature
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Due to the valuable nature of precious metal and diamond jewellery, delivery requires OTP verification and physical signature at the recipient address. Couriers will not leave parcels unattended or with non-authorized third parties.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)", color: "var(--color-charcoal)" }}>
            5. Tracking Your Consignment
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Once your order is picked up by our logistics team, a unique tracking airway bill (AWB) number and direct tracking link are shared with you on WhatsApp and email for real-time status updates.
          </p>
        </section>
      </div>

      <div style={{ marginTop: "var(--space-12)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <Link href="/shop" className="btn-primary">
          Explore Jewellery
        </Link>
        <Link href="/faq" className="btn-outline">
          Read FAQs
        </Link>
      </div>
    </div>
  );
}
