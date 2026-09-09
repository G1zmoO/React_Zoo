import { Link } from 'react-router-dom';
import heroBg from '../../assets/images/hero-bg.jpg';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <img src={heroBg} alt="" aria-hidden="true" className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>
        <Link to="/sales" className={styles.ctaButton}>
          Check out
        </Link>
      </div>
    </section>
  );
};

export default Hero;
