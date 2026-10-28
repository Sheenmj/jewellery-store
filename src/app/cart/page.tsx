import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected jewellery pieces and place your order via WhatsApp.",
  openGraph: {
    title: "Cart",
    url: "/cart",
  },
  robots: { index: false, follow: false },
};

export default function CartRoute() {
  return <CartPage />;
}
