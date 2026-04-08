const { initDatabase, Category, Product, Recipe, RecipeIngredient } = require('./models');

const seedData = async () => {
  try {
    await initDatabase();
    
    const categoriesData = [
      { name: 'Bebidas Calientes', icon: 'coffee', order: 1 },
      { name: 'Bebidas Frías', icon: 'cup-soda', order: 2 },
      { name: 'Frapes', icon: 'blender', order: 3 },
      { name: 'Alimentos', icon: 'utensils', order: 4 },
      { name: 'Otros', icon: 'shopping-bag', order: 5 }
    ];

    const categories = {};
    for (const cat of categoriesData) {
      const [category, created] = await Category.findOrCreate({
        where: { name: cat.name },
        defaults: cat
      });
      categories[cat.name] = category.id;
      if (created) {
        console.log(`✓ Categoría "${cat.name}" creada`);
      } else {
        console.log(`○ Categoría "${cat.name}" ya existe`);
      }
    }

    const productsData = [
      { category_id: categories['Bebidas Calientes'], name: 'Espresso', price: 35.00, order: 1 },
      { category_id: categories['Bebidas Calientes'], name: 'Espresso Americano', price: 40.00, order: 2 },
      { category_id: categories['Bebidas Calientes'], name: 'Café del Día', price: 40.00, order: 3 },
      { category_id: categories['Bebidas Calientes'], name: 'Cappuccino', price: 55.00, order: 4 },
      { category_id: categories['Bebidas Calientes'], name: 'Latte', price: 60.00, order: 5 },
      { category_id: categories['Bebidas Calientes'], name: 'Latte Saborizado', price: 70.00, order: 6 },
      { category_id: categories['Bebidas Calientes'], name: 'Matcha', price: 65.00, order: 7 },
      { category_id: categories['Bebidas Calientes'], name: 'Chai', price: 65.00, order: 8 },
      { category_id: categories['Bebidas Calientes'], name: 'Chocolate', price: 60.00, order: 9 },
      { category_id: categories['Bebidas Calientes'], name: 'Tisana', price: 65.00, order: 10 },
      { category_id: categories['Bebidas Frías'], name: 'Iced Latte', price: 65.00, order: 1 },
      { category_id: categories['Bebidas Frías'], name: 'Iced Americano', price: 45.00, order: 2 },
      { category_id: categories['Bebidas Frías'], name: 'Cold Brew', price: 55.00, order: 3 },
      { category_id: categories['Bebidas Frías'], name: 'Iced Matcha', price: 70.00, order: 4 },
      { category_id: categories['Bebidas Frías'], name: 'Limonada', price: 45.00, order: 5 },
      { category_id: categories['Frapes'], name: 'Frappe de Café', price: 75.00, order: 1 },
      { category_id: categories['Frapes'], name: 'Frappe de Caramelo', price: 80.00, order: 2 },
      { category_id: categories['Frapes'], name: 'Frappe de Chocolate', price: 80.00, order: 3 },
      { category_id: categories['Frapes'], name: 'Frappe de Vainilla', price: 80.00, order: 4 },
      { category_id: categories['Frapes'], name: 'Frappe de Matcha', price: 85.00, order: 5 },
      { category_id: categories['Alimentos'], name: 'Croissant', price: 45.00, order: 1 },
      { category_id: categories['Alimentos'], name: 'Pan de Chocolate', price: 50.00, order: 2 },
      { category_id: categories['Alimentos'], name: 'Bagel con Queso crema', price: 55.00, order: 3 },
      { category_id: categories['Alimentos'], name: 'Ensalada César', price: 95.00, order: 4 },
      { category_id: categories['Alimentos'], name: 'Wrap de Pollo', price: 85.00, order: 5 },
      { category_id: categories['Alimentos'], name: 'Toast de Aguacate', price: 75.00, order: 6 },
      { category_id: categories['Otros'], name: 'Agua Embotellada', price: 25.00, order: 1 },
      { category_id: categories['Otros'], name: 'Jugo Natural', price: 40.00, order: 2 },
      { category_id: categories['Otros'], name: 'Soda', price: 30.00, order: 3 },
      { category_id: categories['Otros'], name: 'Caramelos', price: 15.00, order: 4 }
    ];

    for (const prod of productsData) {
      const [product, created] = await Product.findOrCreate({
        where: { name: prod.name, category_id: prod.category_id },
        defaults: prod
      });
      if (created) {
        console.log(`✓ Producto "${prod.name}" creado`);
      }
    }

    console.log('\n✓ Seed completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
};

seedData();
