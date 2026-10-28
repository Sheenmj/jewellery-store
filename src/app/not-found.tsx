import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className="section-eyebrow">Page Not Found</p>
        <h1 className={styles.code} aria-label="404">404</h1>
        <p className={styles.message}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/shop" className="btn-outline">Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
