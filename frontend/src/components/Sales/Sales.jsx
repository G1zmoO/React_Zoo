import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from '../../api/axios';
import styles from './Sales.module.css';

const PRODUCTS_TO_SHOW = 4;

const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Sales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/all').then(({ data }) => {
      const discounted = data.filter(
        (product) => product.discont_price && product.discont_price < product.price
      );
      setProducts(getRandomItems(discounted, PRODUCTS_TO_SHOW));
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sale</h2>

        <div className={styles.divider}>
          <span className={styles.line} />
          <Link to="/sales" className={styles.allLink}>
            All sales
          </Link>
        </div>
      </div>

      <ul className={styles.list}>
        {products.map((product) => {
          const discountPercent = Math.round(
            (1 - product.discont_price / product.price) * 100
          );

          return (
            <li key={product.id} className={styles.card}>
              <Link to={`/products/${product.id}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                  <img
                    src={`${API_BASE_URL}${product.image}`}
                    alt={product.title}
                    className={styles.image}
                  />
                  <span className={styles.badge}>-{discountPercent}%</span>
                </div>

                <div className={styles.info}>
                  <p className={styles.name}>{product.title}</p>
                  <p className={styles.price}>
                    <span className={styles.newPrice}>${product.discont_price}</span>
                    <span className={styles.oldPrice}>${product.price}</span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sales;
