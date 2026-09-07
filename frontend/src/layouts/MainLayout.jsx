import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className="main-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
