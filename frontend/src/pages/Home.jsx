import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import DiscountBanner from '../components/DiscountBanner/DiscountBanner';
import Sales from '../components/Sales/Sales';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
      <DiscountBanner />
      <Sales />
    </div>
  );
};

export default Home;
