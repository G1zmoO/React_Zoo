import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import styles from './Header.module.css';

const NAV_LINKS = [
  { path: '/', label: 'Main Page' },
  { path: '/categories', label: 'Categories' },
  { path: '/products', label: 'All products' },
  { path: '/sales', label: 'All sales' },
];

const Header = () => {
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label="Pet Shop">
        <Logo className={styles.logoIcon} />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={styles.navLink}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link to="/cart" className={styles.cart} aria-label="Cart">
        <CartIcon className={styles.cartIcon} />
        {cartItemsCount > 0 && <span className={styles.badge}>{cartItemsCount}</span>}
      </Link>
    </header>
  );
};

export default Header;
