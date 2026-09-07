import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<CategoryProducts />} />
      </Route>
    </Routes>
  );
}

export default App;
