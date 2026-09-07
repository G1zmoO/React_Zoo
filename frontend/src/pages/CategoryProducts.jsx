import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from './CategoryProducts.module.css';

const CategoryProducts = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCategory(null);
    setProducts([]);

    api.get(`/categories/${id}`).then(({ data }) => {
      if (data.status === 'ERR') return;
      setCategory(data.category);
      setProducts(data.data);
    });
  }, [id]);

  const breadcrumbItems = [
    { label: 'Main page', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: category?.title ?? '...' },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className={styles.title}>{category?.title ?? 'Loading...'}</h1>

      <ProductGrid key={id} products={products} />
    </div>
  );
};

export default CategoryProducts;
