import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api, { API_BASE_URL } from '../api/axios';
import { addItem } from '../store/cartSlice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './ProductDetails.module.css';

const DESCRIPTION_PREVIEW_LENGTH = 260;

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setProduct(null);
    setCategoryTitle(null);
    setQuantity(1);
    setDescriptionExpanded(false);
    setJustAdded(false);

    api.get(`/products/${id}`).then(({ data }) => {
      if (data.status === 'ERR') return;
      const [foundProduct] = data;
      setProduct(foundProduct);

      api.get(`/categories/${foundProduct.categoryId}`).then(({ data: categoryData }) => {
        if (categoryData.status === 'ERR') return;
        setCategoryTitle(categoryData.category.title);
      });
    });
  }, [id]);

  if (!product) {
    return (
      <div className={styles.page}>
        <p>Loading...</p>
      </div>
    );
  }

  const hasDiscount = Boolean(product.discont_price && product.discont_price < product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - product.discont_price / product.price) * 100)
    : 0;
  const imageUrl = `${API_BASE_URL}${product.image}`;

  const breadcrumbItems = [
    { label: 'Main page', path: '/' },
    { label: 'Categories', path: '/categories' },
    ...(categoryTitle
      ? [{ label: categoryTitle, path: `/categories/${product.categoryId}` }]
      : []),
    { label: product.title },
  ];

  const showReadMoreToggle = product.description.length > DESCRIPTION_PREVIEW_LENGTH;
  const descriptionText =
    isDescriptionExpanded || !showReadMoreToggle
      ? product.description
      : `${product.description.slice(0, DESCRIPTION_PREVIEW_LENGTH)}...`;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        discont_price: product.discont_price,
        image: product.image,
        quantity,
      })
    );
    setJustAdded(true);
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbItems} />

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            <img src={imageUrl} alt="" aria-hidden="true" className={styles.thumbnail} />
            <img src={imageUrl} alt="" aria-hidden="true" className={styles.thumbnail} />
            <img src={imageUrl} alt="" aria-hidden="true" className={styles.thumbnail} />
          </div>
          <img src={imageUrl} alt={product.title} className={styles.mainPhoto} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            {hasDiscount ? (
              <>
                <span className={styles.newPrice}>${product.discont_price}</span>
                <span className={styles.oldPrice}>${product.price}</span>
                <span className={styles.badge}>-{discountPercent}%</span>
              </>
            ) : (
              <span className={styles.newPrice}>${product.price}</span>
            )}
          </div>

          <div className={styles.actions}>
            <div className={styles.stepper}>
              <button
                type="button"
                className={styles.stepperButton}
                onClick={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="#282828" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <span className={styles.quantity}>{quantity}</span>

              <button
                type="button"
                className={styles.stepperButton}
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="#282828"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <button type="button" className={styles.addToCart} onClick={handleAddToCart}>
              {justAdded ? 'Added!' : 'Add to cart'}
            </button>
          </div>

          <div className={styles.description}>
            <h2 className={styles.descriptionTitle}>Description</h2>
            <p className={styles.descriptionText}>{descriptionText}</p>
            {showReadMoreToggle && (
              <button
                type="button"
                className={styles.readMore}
                onClick={() => setDescriptionExpanded((prev) => !prev)}
              >
                {isDescriptionExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
