import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import DiscountBanner from '../components/DiscountBanner/DiscountBanner';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
      <DiscountBanner />
    </div>
  );
};

export default Home;
