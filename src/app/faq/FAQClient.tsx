"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./faq.module.css";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply browse our collection, add items to your cart, fill in your details on the cart page, and click 'Order on WhatsApp'. Your order will be sent to our team who will confirm availability and shipping details with you within 24 hours.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (PhonePe, GPay, Paytm), NEFT/RTGS bank transfer, and cash on delivery for eligible orders. Payment details are shared via WhatsApp after order confirmation.",
  },
  {
    q: "Is the gold hallmarked?",
    a: "Yes. All our gold jewellery is BIS hallmarked, ensuring certified purity of metal. The hallmark is stamped on each piece and guarantees the gold content as specified.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are typically shipped within 2–3 business days of payment confirmation. Standard delivery across India takes 5–7 business days. Expedited shipping options are available on request.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 14 days of delivery for items in their original condition and packaging. Custom or personalised orders are non-returnable. Please refer to our Returns page for full details.",
  },
  {
    q: "Can I get a piece customised?",
    a: "Absolutely. We offer bespoke customisation services — including resizing, engraving, and custom designs. Please contact us on WhatsApp with your requirements and we will provide a quote and timeline.",
  },
  {
    q: "How should I care for my jewellery?",
    a: "Store pieces individually in soft pouches or the original box. Avoid contact with perfume, lotions, and cleaning chemicals. Remove jewellery before bathing, swimming, or exercising. Clean gently with a soft cloth. Bring pieces in for professional cleaning once a year.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently, we ship Pan-India only. International shipping is in our roadmap. Please contact us if you are based outside India and we will explore options for you.",
  },
  {
    q: "How do I know my ring size?",
    a: "You can measure your ring size at home by using a strip of paper and measuring the circumference of your finger, or visit a local jeweller for a professional sizing. We follow the standard Indian ring sizing. Visit our Size Guide page for a detailed chart.",
  },
  {
    q: "Are gemstones certified?",
    a: "Significant gemstones (diamonds above 0.3 ct, rubies, emeralds, etc.) in our higher-end pieces come with GIA or IGI certification where specified in the product listing. Smaller accent stones do not carry individual certificates.",
  },
];

export default function FAQClient() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="page-header">
        <p className="section-eyebrow">Help Centre</p>
        <h1 className="page-title">Frequently Asked Questions</h1>
        <p className="page-subtitle">
          Everything you need to know about ordering and caring for your jewellery
        </p>
      </div>

      <div className="container">
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${open === i ? styles.open : ""}`}>
              <button
                type="button"
                className={styles.question}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <svg
                  aria-hidden="true"
                  className={styles.chevron}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.contactCta}>
          <p>Still have questions?</p>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>

        <div style={{ paddingBottom: "var(--space-20)" }} />
      </div>
    </>
  );
}
