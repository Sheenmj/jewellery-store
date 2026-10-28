import type { Metadata } from "next";
import WishlistPage from "./WishlistPage";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved jewellery pieces.",
};

export default function Page() {
  return <WishlistPage />;
}
