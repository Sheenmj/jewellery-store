import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about orders, hallmark certification, shipping, customisation, and care.",
};

export default function FAQPage() {
  return <FAQClient />;
}
