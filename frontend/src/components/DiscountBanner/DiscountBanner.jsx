import { useState } from 'react';
import api from '../../api/axios';
import discountImage from '../../assets/images/discount-banner.svg';
import styles from './DiscountBanner.module.css';

const INITIAL_FORM = { name: '', phone: '', email: '' };

const DiscountBanner = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      await api.post('/sale/send', form);
      setStatus('success');
      setForm(INITIAL_FORM);
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
    </section>
  );
};

export default DiscountBanner;
