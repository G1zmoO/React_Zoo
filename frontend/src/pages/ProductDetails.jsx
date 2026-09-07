import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();

  return <div className="product-details-page">Product {id}</div>;
};

export default ProductDetails;
