import { Coffee, CupSoda, IceCream, UtensilsCrossed, ShoppingBag, Leaf } from 'lucide-react';
import ProductCard from './ProductCard';
import './CategorySection.css';

const iconMap = {
  coffee: Coffee,
  'cup-soda': CupSoda,
  blender: IceCream,
  utensils: UtensilsCrossed,
  'shopping-bag': ShoppingBag,
};

function CategorySection({ category, products, isVisible }) {
  const IconComponent = iconMap[category.icon] || Leaf;
  const filteredProducts = products.filter(
    (p) => p.category_id === category.id && p.is_available
  );

  return (
    <section className="category-section" id={`category-${category.id}`}>
      <div className="section-header">
        <div className="section-icon">
          <IconComponent size={24} />
        </div>
        <h2 className="section-title">{category.name}</h2>
        <div className="section-line"></div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Coffee size={40} className="empty-state-icon" />
          <p>Próximamente nuevos productos en esta categoría</p>
        </div>
      )}
    </section>
  );
}

export default CategorySection;
