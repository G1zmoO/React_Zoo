import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem/CartItem';
import styles from './CartPage.module.css';

const getUnitPrice = (item) =>
  item.discont_price && item.discont_price < item.price ? item.discont_price : item.price;

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const total = items.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await api.post('/order/send', {
        ...formData,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: getUnitPrice(item),
        })),
        total,
      });
      dispatch(clearCart());
      reset();
      setOrderPlaced(true);
    } catch (error) {
      // request failed; the user can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Shopping cart</h1>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Looks like you have no items in your basket currently.</p>
          <Link to="/" className={styles.continueButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Shopping cart</h1>

      <div className={styles.content}>
        <ul className={styles.list}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        <div className={styles.orderForm}>
          <h2 className={styles.orderTitle}>Order details</h2>

          <div className={styles.summaryRow}>
            <span className={styles.itemsCount}>{items.length} items</span>
            <div className={styles.totalGroup}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>${total}</span>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.inputs}>
              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="Name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name is too short' },
                  })}
                />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
              </div>

              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="Phone number"
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[+\d][\d\s-]{6,}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                />
                {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
              </div>

              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="Email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Order'}
            </button>
          </form>
        </div>
      </div>

      {orderPlaced && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button
              type="button"
              className={styles.popupClose}
              aria-label="Close"
              onClick={() => setOrderPlaced(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <h2 className={styles.popupTitle}>Congratulations!</h2>
            <p className={styles.popupText}>
              Your order has been successfully placed on the website. A manager will contact
              you shortly to confirm your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
