import { useState } from 'react';
import api from '../../api/axios';
import discountImage from '../../assets/images/discount-banner.svg';
import styles from './DiscountBanner.module.css';

const INITIAL_FORM = { name: '', phone: '', email: '' };
const DISCOUNT_FORM_STORAGE_KEY = 'discountForm';

const loadStoredForm = () => {
  try {
    const stored = localStorage.getItem(DISCOUNT_FORM_STORAGE_KEY);
    return stored ? { ...INITIAL_FORM, ...JSON.parse(stored) } : INITIAL_FORM;
  } catch (error) {
    return INITIAL_FORM;
  }
};

const DiscountBanner = () => {
  const [form, setForm] = useState(loadStoredForm);
  const [status, setStatus] = useState('idle');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    localStorage.setItem(DISCOUNT_FORM_STORAGE_KEY, JSON.stringify(nextForm));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      await api.post('/sale/send', form);
      setStatus('success');
      setShowPopup(true);
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

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
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
