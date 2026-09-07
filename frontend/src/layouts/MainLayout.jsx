import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className="main-layout__content">
        <Outlet />
      </main>

      <footer className="main-layout__footer">{/* подвал сайта */}</footer>
    </div>
  );
};

export default MainLayout;
