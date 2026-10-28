import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: [{ url: product.image, alt: product.imageAlt }],
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ paddingTop: "var(--space-10)" }}>
      <ProductDetailClient product={product} />
    </div>
  );
}
