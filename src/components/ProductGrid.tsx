import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

type Props = {
  products: Product[];
  columns?: 2 | 3 | 4;
};

export default function ProductGrid({ products, columns = 4 }: Props) {
  return (
    <ul
      className={styles.grid}
      data-columns={columns}
      aria-label="Products"
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
