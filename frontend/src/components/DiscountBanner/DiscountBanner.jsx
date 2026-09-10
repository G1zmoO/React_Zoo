import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import discountImage from '../../assets/images/discount-banner.svg';
import styles from './DiscountBanner.module.css';

const DISCOUNT_FORM_STORAGE_KEY = 'discountForm';
const SUBMITTED_RESET_DELAY = 2000;

const loadStoredForm = () => {
  try {
    const stored = localStorage.getItem(DISCOUNT_FORM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
};

const DiscountBanner = () => {
  const [status, setStatus] = useState('idle');
  const [showPopup, setShowPopup] = useState(false);
  const resetTimeoutRef = useRef(null);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: loadStoredForm(),
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(DISCOUNT_FORM_STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => () => clearTimeout(resetTimeoutRef.current), []);

  const onSubmit = async (formData) => {
    setStatus('sending');

    try {
      await api.post('/sale/send', formData);
      setStatus('success');
      setShowPopup(true);
      reset();
      localStorage.removeItem(DISCOUNT_FORM_STORAGE_KEY);
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => setStatus('idle'), SUBMITTED_RESET_DELAY);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>5% off on the first order</h2>

        <div className={styles.content}>
          <img src={discountImage} alt="" aria-hidden="true" className={styles.image} />

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <input
                className={styles.input}
                placeholder="Name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name is too short' },
                })}
              />

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
            </div>

            <button
              type="submit"
              className={status === 'success' ? `${styles.submit} ${styles.submitted}` : styles.submit}
              disabled={status === 'sending' || status === 'success'}
            >
              {status === 'sending' && 'Sending...'}
              {status === 'success' && 'Request submitted'}
              {status !== 'sending' && status !== 'success' && 'Get a discount'}
            </button>

            {status === 'error' && (
              <p className={styles.message}>Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button
              type="button"
              className={styles.popupClose}
              aria-label="Close"
              onClick={() => setShowPopup(false)}
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
              Your discount request has been received. We will contact you shortly with your 5%
              discount code.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DiscountBanner;
