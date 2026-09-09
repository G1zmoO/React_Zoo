import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.page}>
      <svg
        className={styles.image}
        width="420"
        height="200"
        viewBox="0 0 420 200"
        fill="none"
        aria-hidden="true"
      >
        <text x="0" y="150" className={styles.digit} fontSize="160">
          4
        </text>
        <circle cx="210" cy="100" r="70" fill="var(--color-blue)" />
        <path
          d="M180 95c-4-14 6-24 16-20 4-10 20-10 24 0 10-4 20 6 16 20 8 6 8 20-4 24-2 10-14 16-24 10-10 6-22 0-24-10-12-4-12-18-4-24z"
          fill="var(--color-white)"
        />
        <circle cx="196" cy="94" r="5" fill="var(--color-black)" />
        <circle cx="224" cy="94" r="5" fill="var(--color-black)" />
        <path d="M204 112c2 6 10 6 12 0" stroke="var(--color-black)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="248" y="150" className={styles.digit} fontSize="160">
          4
        </text>
      </svg>

      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.subtitle}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      <Link to="/" className={styles.homeButton}>
        Go to homepage
      </Link>
    </div>
  );
};

export default NotFound;
