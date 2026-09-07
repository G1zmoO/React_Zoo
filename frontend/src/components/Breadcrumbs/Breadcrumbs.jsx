import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label} className={styles.item}>
          {index > 0 && <span className={styles.divider} />}
          {item.path ? (
            <Link to={item.path} className={styles.crumb}>
              {item.label}
            </Link>
          ) : (
            <span className={`${styles.crumb} ${styles.active}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
