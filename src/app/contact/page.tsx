import type { Metadata } from "next";
import { BUSINESS_NAME } from "@/config/business";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Concierge",
  description: `Get in touch with ${BUSINESS_NAME} for bespoke jewellery orders, sizing, and direct WhatsApp consultations.`,
  openGraph: {
    title: "Contact Concierge",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
