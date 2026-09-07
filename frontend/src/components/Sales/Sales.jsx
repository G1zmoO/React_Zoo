import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import ProductCard from '../ProductCard/ProductCard';
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default Sales;
