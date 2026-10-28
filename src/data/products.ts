/**
 * Single source of truth for all product data.
 *
 * Validation runs at module load time and throws if ids/slugs are duplicated
 * or prices are not positive integers.
 */

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // INR, integer rupees
  description: string;
  category: "necklaces" | "earrings" | "rings" | "bracelets";
  image: string; // "/images/<file>"
  imageAlt: string;
  badge?: "new" | "bestseller" | "limited";
  specifications?: Record<string, string>; // only include client-approved data
};

export const categories = [
  "necklaces",
  "earrings",
  "rings",
  "bracelets",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  // ── NECKLACES ─────────────────────────────────────────────────────────────
  {
    id: "prod-001",
    slug: "royal-heritage-necklace",
    name: "Royal Heritage Necklace",
    price: 48500,
    description:
      "A masterpiece of traditional Indian craftsmanship, this grand polki-style necklace features hand-set uncut diamonds and vivid gemstone accents on 22kt gold. Inspired by the royal jewellery of the Mughal era, each element is meticulously hand-crafted by our master artisans.",
    category: "necklaces",
    image: "/images/sample-necklace-1.jpg",
    imageAlt: "Royal Heritage Necklace – 22kt gold with uncut diamonds and gemstones",
    badge: "bestseller",
    specifications: {
      "Gold Purity": "22kt (916)",
      "Weight (approx.)": "42 g",
      "Length": "16 inches",
      "Stones": "Uncut diamonds, rubies, emeralds, pearls",
      "Hallmark": "BIS Certified",
    },
  },
  {
    id: "prod-002",
    slug: "ruby-pendant-necklace",
    name: "Ruby Pendant Necklace",
    price: 18900,
    description:
      "A graceful everyday necklace featuring a natural Burmese ruby teardrop in an intricate gold filigree setting. The delicate 18kt yellow gold chain drapes beautifully and is perfect for both casual and formal occasions.",
    category: "necklaces",
    image: "/images/sample-necklace-1.jpg",
    imageAlt: "Ruby Pendant Necklace – 18kt gold with natural ruby",
    badge: "new",
    specifications: {
      "Gold Purity": "18kt (750)",
      "Weight (approx.)": "6.5 g",
      "Chain Length": "18 inches (adjustable to 20)",
      "Stone": "Natural Burmese Ruby, ~0.8 ct",
      "Hallmark": "BIS Certified",
    },
  },

  // ── EARRINGS ──────────────────────────────────────────────────────────────
  {
    id: "prod-003",
    slug: "emerald-drop-earrings",
    name: "Emerald Drop Earrings",
    price: 22000,
    description:
      "Elegant drop earrings featuring marquise-cut natural emeralds with a halo of VS diamonds, set in 18kt yellow gold. The balanced, symmetrical design catches the light beautifully and adds a sophisticated pop of colour to any look.",
    category: "earrings",
    image: "/images/sample-earrings-1.jpg",
    imageAlt: "Emerald Drop Earrings – 18kt gold with marquise-cut emeralds and diamond halo",
    badge: "bestseller",
    specifications: {
      "Gold Purity": "18kt (750)",
      "Weight (approx.)": "5.8 g (pair)",
      "Length": "3.5 cm",
      "Stones": "Natural Emeralds ~1.2 ct total, Diamonds ~0.4 ct total",
      "Closure": "Push back with safety lock",
    },
  },
  {
    id: "prod-004",
    slug: "gold-jhumka-earrings",
    name: "Classic Gold Jhumka",
    price: 12400,
    description:
      "Traditional Indian jhumka earrings crafted in 22kt gold with intricate filigree work and delicate pearl drops. These timeless pieces are perfect for festive occasions, weddings, and celebrations. Each jhumka is hand-finished and individually inspected.",
    category: "earrings",
    image: "/images/sample-earrings-1.jpg",
    imageAlt: "Classic Gold Jhumka – 22kt gold with pearl drops and filigree detailing",
    badge: "new",
    specifications: {
      "Gold Purity": "22kt (916)",
      "Weight (approx.)": "9.2 g (pair)",
      "Diameter": "2.8 cm",
      "Drops": "South Sea pearls",
      "Closure": "Hook",
    },
  },

  // ── RINGS ─────────────────────────────────────────────────────────────────
  {
    id: "prod-005",
    slug: "diamond-solitaire-ring",
    name: "Diamond Solitaire Ring",
    price: 65000,
    description:
      "A timeless solitaire ring featuring a round brilliant-cut diamond in a classic six-prong setting on an 18kt yellow gold band. The clean, elegant design lets the diamond speak for itself. Available in sizes 5–12.",
    category: "rings",
    image: "/images/sample-ring-1.jpg",
    imageAlt: "Diamond Solitaire Ring – 18kt gold with brilliant-cut diamond",
    badge: "bestseller",
    specifications: {
      "Gold Purity": "18kt (750)",
      "Band Weight": "3.2 g",
      "Diamond": "0.5 ct, VVS2 clarity, F colour",
      "Setting": "6-prong solitaire",
      "Available Sizes": "5–12 (Indian sizing 10–17)",
    },
  },
  {
    id: "prod-006",
    slug: "diamond-eternity-band",
    name: "Diamond Eternity Band",
    price: 38500,
    description:
      "A stunning full eternity band with channel-set round brilliant diamonds running all the way around the 18kt white gold band. Symbolic of everlasting love, this ring is the perfect anniversary or commitment piece.",
    category: "rings",
    image: "/images/sample-ring-1.jpg",
    imageAlt: "Diamond Eternity Band – 18kt white gold with channel-set diamonds",
    badge: "new",
    specifications: {
      "Gold Purity": "18kt White Gold",
      "Band Weight": "4.1 g",
      "Diamonds": "~1.0 ct total (28 stones)",
      "Setting": "Channel set",
      "Available Sizes": "5–11",
    },
  },

  // ── BRACELETS ─────────────────────────────────────────────────────────────
  {
    id: "prod-007",
    slug: "gold-chain-bracelet",
    name: "Delicate Gold Chain Bracelet",
    price: 8200,
    description:
      "A minimalist cable-chain bracelet in 18kt gold, perfect for everyday stacking or wearing alone. The adjustable lobster-clasp design fits most wrists and the slim profile makes it a versatile addition to any jewellery collection.",
    category: "bracelets",
    image: "/images/sample-bracelet-1.jpg",
    imageAlt: "Delicate Gold Chain Bracelet – 18kt gold cable chain",
    badge: "bestseller",
    specifications: {
      "Gold Purity": "18kt (750)",
      "Weight (approx.)": "3.1 g",
      "Length": "17–19 cm (adjustable)",
      "Width": "1.2 mm",
      "Clasp": "Lobster clasp",
    },
  },
  {
    id: "prod-008",
    slug: "tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    price: 42000,
    description:
      "A classic diamond tennis bracelet featuring a continuous line of round brilliant-cut diamonds in a four-prong setting. Crafted in 18kt white gold, this is the quintessential luxury bracelet for special occasions and milestone moments.",
    category: "bracelets",
    image: "/images/sample-bracelet-1.jpg",
    imageAlt: "Diamond Tennis Bracelet – 18kt white gold with brilliant-cut diamonds",
    badge: "limited",
    specifications: {
      "Gold Purity": "18kt White Gold",
      "Weight (approx.)": "8.5 g",
      "Length": "18 cm",
      "Diamonds": "~2.0 ct total (28 stones), VS clarity",
      "Clasp": "Box clasp with safety lock",
    },
  },
];

// ─── Build-time validation ──────────────────────────────────────────────────

function validateProducts(ps: Product[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const p of ps) {
    if (ids.has(p.id)) {
      throw new Error(`[products.ts] Duplicate product id: "${p.id}"`);
    }
    if (slugs.has(p.slug)) {
      throw new Error(`[products.ts] Duplicate product slug: "${p.slug}"`);
    }
    if (!Number.isInteger(p.price) || p.price <= 0) {
      throw new Error(
        `[products.ts] Product "${p.id}" has invalid price: ${p.price}. Must be a positive integer.`
      );
    }
    if (!/^[a-z0-9-]+$/.test(p.slug)) {
      throw new Error(
        `[products.ts] Product slug "${p.slug}" must be lowercase letters, digits, and hyphens only.`
      );
    }
    ids.add(p.id);
    slugs.add(p.slug);
  }
}

validateProducts(products);

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
