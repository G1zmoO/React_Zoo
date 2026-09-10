import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../../api/axios';
import { addItem } from '../../store/cartSlice';
import styles from './ProductCard.module.css';

const ADDED_RESET_DELAY = 2000;

const ProductCard = ({ product, breadcrumbTrail = [] }) => {
  const dispatch = useDispatch();
  const [justAdded, setJustAdded] = useState(false);
  const resetTimeoutRef = useRef(null);
  const hasDiscount = Boolean(product.discont_price && product.discont_price < product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - product.discont_price / product.price) * 100)
    : 0;

  useEffect(() => () => clearTimeout(resetTimeoutRef.current), []);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        discont_price: product.discont_price,
        image: product.image,
      })
    );
    setJustAdded(true);
    clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => setJustAdded(false), ADDED_RESET_DELAY);
  };

  return (
    <li className={styles.card}>
      <Link
        to={`/products/${product.id}`}
        state={{ breadcrumbTrail }}
        className={styles.cardLink}
      >
        <div className={styles.imageWrapper}>
          <img
            src={`${API_BASE_URL}${product.image}`}
            alt={product.title}
            className={styles.image}
          />
          {hasDiscount && <span className={styles.badge}>-{discountPercent}%</span>}
          <button
            type="button"
            className={justAdded ? `${styles.addToCart} ${styles.added}` : styles.addToCart}
            onClick={handleAddToCart}
          >
            {justAdded ? 'Added' : 'Add to cart'}
          </button>
        </div>

        <div className={styles.info}>
          <p className={styles.name}>{product.title}</p>
          <p className={styles.price}>
            {hasDiscount ? (
              <>
                <span className={styles.newPrice}>${product.discont_price}</span>
                <span className={styles.oldPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.newPrice}>${product.price}</span>
            )}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
