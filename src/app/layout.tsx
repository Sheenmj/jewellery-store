import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { BUSINESS_NAME } from "@/config/business";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurajewellery.in"),
  title: {
    default: `${BUSINESS_NAME} – Fine Jewellery`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    `${BUSINESS_NAME} – Handcrafted fine jewellery. Browse necklaces, earrings, rings and bracelets. Order on WhatsApp.`,
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* Skip to main content for keyboard/screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <CartProvider>
          <WishlistProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header />
              <main id="main-content" tabIndex={-1} style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
