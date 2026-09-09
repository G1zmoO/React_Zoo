import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import AllProducts from './pages/AllProducts';
import AllSales from './pages/AllSales';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<CategoryProducts />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="sales" element={<AllSales />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
