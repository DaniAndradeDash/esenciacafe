import { Coffee, CupSoda, IceCream, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import './CategoryNav.css';

const iconMap = {
  coffee: Coffee,
  'cup-soda': CupSoda,
  blender: IceCream,
  utensils: UtensilsCrossed,
  'shopping-bag': ShoppingBag,
};

function CategoryNav({ categories, activeCategory, onCategoryChange }) {
  return (
    <nav className="category-nav">
      <div className="category-nav-inner container">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || Coffee;
          return (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <IconComponent size={16} className="category-tab-icon" />
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default CategoryNav;
