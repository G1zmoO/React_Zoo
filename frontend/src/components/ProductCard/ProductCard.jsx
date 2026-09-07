import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../api/axios';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const hasDiscount = Boolean(product.discont_price && product.discont_price < product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - product.discont_price / product.price) * 100)
    : 0;

  const handleAddToCart = (event) => {
    event.preventDefault();
    // TODO: wire up once the cart is implemented
  };

  return (
    <li className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img
            src={`${API_BASE_URL}${product.image}`}
            alt={product.title}
            className={styles.image}
          />
          {hasDiscount && <span className={styles.badge}>-{discountPercent}%</span>}
          <button type="button" className={styles.addToCart} onClick={handleAddToCart}>
            Add to cart
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
