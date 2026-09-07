import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from '../api/axios';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './Categories.module.css';

const BREADCRUMB_ITEMS = [{ label: 'Main page', path: '/' }, { label: 'Categories' }];

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories/all').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={BREADCRUMB_ITEMS} />

      <section className={styles.section}>
        <h1 className={styles.title}>Categories</h1>

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
    </div>
  );
};

export default Categories;
