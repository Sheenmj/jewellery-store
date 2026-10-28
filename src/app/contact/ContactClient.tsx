"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BUSINESS_NAME,
  BUSINESS_EMAIL,
  BUSINESS_INSTAGRAM,
  WHATSAPP_NUMBER,
} from "@/config/business";
import styles from "./contact.module.css";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("General Enquiry");
  const [message, setMessage] = useState("");

  const whatsappConfigured = WHATSAPP_NUMBER !== "PLACEHOLDER_DIGITS_ONLY";

  function handleSendWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const formattedText = `Hello ${BUSINESS_NAME},
My name is: ${name || "Customer"}
Phone: ${phone || "Not specified"}
Topic: ${interest}
Message: ${message || "I would like to inquire about your jewellery collection."}`;

    const url = whatsappConfigured
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedText)}`
      : `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(`Enquiry from ${name || "Customer"}`)}&body=${encodeURIComponent(formattedText)}`;

    window.open(url, "_blank");
  }

  return (
    <div className="container">
      <div className="page-header">
        <p className="section-eyebrow">Personal Concierge</p>
        <h1 className="page-title">Connect With Us</h1>
        <p className="page-subtitle">
          Whether you are looking for custom bridal jewellery, certified solitaires, or bespoke sizing, our jewellery consultants are here to help.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Left: Contact Info */}
        <div className={styles.infoCol}>
          <div className={styles.infoBlock}>
            <span className={styles.blockBadge}>Quick Chat</span>
            <h2 className={styles.infoTitle}>WhatsApp Concierge</h2>
            <p className={styles.infoDesc}>
              The fastest way to reach our design team — get real-time videos of jewellery pieces, instant price estimates, or reserve a piece.
            </p>
            {whatsappConfigured ? (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello ${BUSINESS_NAME}, I would like to speak with a jewellery consultant.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ marginTop: "var(--space-2)", width: "fit-content" }}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Chat Directly on WhatsApp
              </a>
            ) : (
              <p className={styles.infoNote}>WhatsApp line available for order confirmations.</p>
            )}
          </div>

          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Email Enquiries</h2>
            <p className={styles.infoDesc}>
              For partnership, bridal consultations, or corporate gifting:
            </p>
            <a href={`mailto:${BUSINESS_EMAIL}`} className={styles.infoLink}>
              {BUSINESS_EMAIL}
            </a>
          </div>

          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Studio Hours</h2>
            <div className={styles.hoursGrid}>
              <div>
                <p className={styles.day}>Monday – Saturday</p>
                <p className={styles.time}>10:00 AM – 7:30 PM IST</p>
              </div>
              <div>
                <p className={styles.day}>Sunday</p>
                <p className={styles.time}>By Prior Appointment Only</p>
              </div>
            </div>
          </div>

          {BUSINESS_INSTAGRAM && (
            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Social Media</h2>
              <p className={styles.infoDesc}>
                Follow our daily creations and styling inspirations on Instagram:
              </p>
              <a
                href={BUSINESS_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                @aurajewellery on Instagram
              </a>
            </div>
          )}
        </div>

        {/* Right: Interactive Message & Studio Card */}
        <div className={styles.rightCol}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send a Message</h2>
            <p className={styles.formSubtitle}>
              Fill in your details and send your inquiry directly to our WhatsApp or email.
            </p>

            <form onSubmit={handleSendWhatsApp} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name">Your Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-phone">WhatsApp / Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-topic">Interested In</label>
                <select
                  id="contact-topic"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={styles.select}
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Custom Bridal Jewellery">Custom Bridal Jewellery</option>
                  <option value="Product Availability & Sizing">Product Availability & Sizing</option>
                  <option value="Schedule Studio Appointment">Schedule Studio Appointment</option>
                  <option value="Gold Hallmarking Verification">Gold Hallmarking Verification</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-message">Message or Requirements</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about the design, occasion, or specifications you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Send via WhatsApp / Message
              </button>
            </form>
          </div>

          {/* Atelier Atmosphere card */}
          <div className={styles.studioCard}>
            <div className={styles.studioImgWrapper}>
              <Image
                src="/images/about-placeholder.jpg"
                alt="Our Jewellery Atelier"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={styles.studioImg}
              />
            </div>
            <div className={styles.studioContent}>
              <p className={styles.studioHeading}>The Master Atelier</p>
              <p className={styles.studioText}>
                Handcrafting timeless elegance. Each jewel is brought to life through rigorous artisanal patience, micro-prong settings, and traditional gold techniques.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "var(--space-20)" }} />
    </div>
  );
}
