import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from '../../api/axios';
import styles from './Categories.module.css';

const CATEGORIES_TO_SHOW = 4;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories/all').then(({ data }) => {
      setCategories(data.slice(0, CATEGORIES_TO_SHOW));
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>

        <div className={styles.divider}>
          <span className={styles.line} />
          <Link to="/categories" className={styles.allLink}>
            All categories
          </Link>
        </div>
      </div>

      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.card}>
            <Link to={`/categories/${category.id}`} className={styles.cardLink}>
              <img
                src={`${API_BASE_URL}${category.image}`}
                alt={category.title}
                className={styles.image}
              />
              <p className={styles.caption}>{category.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
