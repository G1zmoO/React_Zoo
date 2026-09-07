import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { id } = useParams();

  return <div className="category-products-page">Category {id}</div>;
};

export default CategoryProducts;
