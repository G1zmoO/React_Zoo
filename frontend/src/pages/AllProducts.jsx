import { useEffect, useState } from 'react';
import api from '../api/axios';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from './CategoryProducts.module.css';

const BREADCRUMB_ITEMS = [{ label: 'Main page', path: '/' }, { label: 'All products' }];

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/all').then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={BREADCRUMB_ITEMS} />

      <h1 className={styles.title}>All products</h1>

      <ProductGrid
        products={products}
        breadcrumbTrail={[{ label: 'All products', path: '/products' }]}
      />
    </div>
  );
};

export default AllProducts;
