import { useEffect, useState } from 'react';
import api from '../api/axios';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from './CategoryProducts.module.css';

const BREADCRUMB_ITEMS = [{ label: 'Main page', path: '/' }, { label: 'All sales' }];

const AllSales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/all').then(({ data }) => {
      const discounted = data.filter(
        (product) => product.discont_price && product.discont_price < product.price
      );
      setProducts(discounted);
    });
  }, []);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={BREADCRUMB_ITEMS} />

      <h1 className={styles.title}>Discounted items</h1>

      <ProductGrid products={products} showDiscountFilter={false} />
    </div>
  );
};

export default AllSales;
