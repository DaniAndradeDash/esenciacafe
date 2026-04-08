import { useState, useEffect } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import MilkNote from '../components/MilkNote';
import CategoryNav from '../components/CategoryNav';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import QRButton from '../components/QRButton';
import api from '../context/api';
import './Menu.css';

function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [catsData, prodsData] = await Promise.all([
        api.categories.getAll(),
        api.products.getAll(),
      ]);
      setCategories(catsData);
      setProducts(prodsData);
      if (catsData.length > 0) {
        setActiveCategory(catsData[0].id);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="menu-page">
        <Header />
        <div className="loading-screen">
          <Loader size={40} className="loading-spinner" />
          <p className="loading-text">Cargando el menú...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <Header />
        <div className="error-screen">
          <AlertCircle size={48} className="error-icon" />
          <p className="error-message">No se pudo cargar el menú</p>
          <p style={{ fontSize: '14px', color: 'var(--esencia-taupe)' }}>{error}</p>
          <button className="btn btn-primary error-retry" onClick={loadData}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <Header />
      <MilkNote />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main className="menu-content container">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            products={products}
          />
        ))}
      </main>
      <Footer />
      <QRButton />
    </div>
  );
}

export default Menu;
