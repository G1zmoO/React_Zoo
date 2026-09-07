import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="main-layout__header">{/* шапка сайта */}</header>

      <main className="main-layout__content">
        <Outlet />
      </main>

      <footer className="main-layout__footer">{/* подвал сайта */}</footer>
    </div>
  );
};

export default MainLayout;
