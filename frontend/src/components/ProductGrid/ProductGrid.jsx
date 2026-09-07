import { useMemo, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

const getDisplayPrice = (product) =>
  product.discont_price && product.discont_price < product.price
    ? product.discont_price
    : product.price;

const ProductGrid = ({ products, showDiscountFilter = true }) => {
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const visibleProducts = useMemo(() => {
    let result = products;

    if (priceFrom !== '') {
      result = result.filter((product) => getDisplayPrice(product) >= Number(priceFrom));
    }

    if (priceTo !== '') {
      result = result.filter((product) => getDisplayPrice(product) <= Number(priceTo));
    }

    if (onlyDiscounted) {
      result = result.filter(
        (product) => product.discont_price && product.discont_price < product.price
      );
    }

    if (sortBy !== 'default') {
      result = [...result].sort((a, b) => {
        if (sortBy === 'price-asc') return getDisplayPrice(a) - getDisplayPrice(b);
        if (sortBy === 'price-desc') return getDisplayPrice(b) - getDisplayPrice(a);
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
    }

    return result;
  }, [products, priceFrom, priceTo, onlyDiscounted, sortBy]);

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Price</span>
          <input
            type="number"
            min="0"
            placeholder="from"
            value={priceFrom}
            onChange={(event) => setPriceFrom(event.target.value)}
            className={styles.priceInput}
          />
          <span className={styles.filterLabel}>to</span>
          <input
            type="number"
            min="0"
            placeholder="to"
            value={priceTo}
            onChange={(event) => setPriceTo(event.target.value)}
            className={styles.priceInput}
          />
        </div>

        {showDiscountFilter && (
          <label className={styles.checkboxGroup}>
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={(event) => setOnlyDiscounted(event.target.checked)}
            />
            Discounted items
          </label>
        )}

        <label className={styles.checkboxGroup}>
          Sorted by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className={styles.sortSelect}
          >
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      <ul className={styles.list}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default ProductGrid;
