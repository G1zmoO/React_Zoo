import { Link } from 'react-router-dom';
import owlImage from '../assets/images/owl-404.svg';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.errorCode}>
        <span className={styles.digit}>4</span>
        <img src={owlImage} alt="" aria-hidden="true" className={styles.image} />
        <span className={styles.digit}>4</span>
      </div>

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
