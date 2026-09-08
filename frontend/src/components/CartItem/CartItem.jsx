import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../../api/axios';
import { removeItem, updateQuantity } from '../../store/cartSlice';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const hasDiscount = Boolean(item.discont_price && item.discont_price < item.price);
  const unitPrice = hasDiscount ? item.discont_price : item.price;
  const lineTotal = unitPrice * item.quantity;
  const originalLineTotal = item.price * item.quantity;

  return (
    <li className={styles.item}>
      <img
        src={`${API_BASE_URL}${item.image}`}
        alt={item.title}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <p className={styles.title}>{item.title}</p>
          <button
            type="button"
            className={styles.removeButton}
            aria-label="Remove item"
            onClick={() => dispatch(removeItem(item.id))}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#8B8B8B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Decrease quantity"
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <span className={styles.quantity}>{item.quantity}</span>

            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Increase quantity"
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="#8B8B8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <span className={styles.newPrice}>${lineTotal}</span>
          {hasDiscount && <span className={styles.oldPrice}>${originalLineTotal}</span>}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
