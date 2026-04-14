import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, BookOpen, QrCode, ArrowLeft, Plus, Pencil, Trash2, Loader, User, Calendar, BookOpenIcon } from 'lucide-react';
import api from '../context/api';
import './Admin.css';
import './AdminRecipes.css';

function AdminRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    preparation: '',
    author: '',
    ingredients: [{ ingredient_name: '', quantity: '' }],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await api.recipes.getAll();
      setRecipes(data);
    } catch (error) {
      console.error('Error cargando recetas:', error);
    }
    setLoading(false);
  };

  const handleOpenModal = (recipe = null) => {
    if (recipe) {
      setEditingRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || '',
        preparation: recipe.preparation || '',
        author: recipe.author || '',
        ingredients: recipe.ingredients?.length > 0 
          ? recipe.ingredients.map(i => ({ ingredient_name: i.ingredient_name, quantity: i.quantity }))
          : [{ ingredient_name: '', quantity: '' }],
      });
    } else {
      setEditingRecipe(null);
      setFormData({
        name: '',
        description: '',
        preparation: '',
        author: '',
        ingredients: [{ ingredient_name: '', quantity: '' }],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecipe(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = { ...newIngredients[index], [field]: value };
      return { ...prev, ingredients: newIngredients };
    });
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient_name: '', quantity: '' }],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.ingredient_name.trim() !== ''),
      };
      if (editingRecipe) {
        await api.recipes.update(editingRecipe.id, data);
      } else {
        await api.recipes.create(data);
      }
      await loadRecipes();
      handleCloseModal();
    } catch (error) {
      console.error('Error guardando:', error);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta receta?')) {
      try {
        await api.recipes.delete(id);
        await loadRecipes();
      } catch (error) {
        console.error('Error eliminando:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <path d="M32 12c-6 10-18 14-18 24 0 10 8 18 18 18s18-8 18-18c0-10-12-14-18-24z" fill="#9CAF88" opacity="0.5"/>
          </svg>
          <span>Esencia Café</span>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item">
            <Coffee size={20} />
            <span>Productos</span>
          </Link>
          <div className="admin-nav-item active">
            <BookOpen size={20} />
            <span>Recetas</span>
          </div>
          <Link to="/admin/qr" className="admin-nav-item">
            <QrCode size={20} />
            <span>QR</span>
          </Link>
        </nav>

        <Link to="/" className="admin-back-link">
          <ArrowLeft size={16} />
          Ver Menú
        </Link>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Gestionar Recetas</h1>
          <div className="admin-actions">
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              <Plus size={18} />
              Nueva Receta
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-screen">
            <Loader size={40} className="loading-spinner" style={{ color: 'var(--esencia-caramel)' }} />
          </div>
        ) : recipes.length > 0 ? (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-card-header">
                  <h3 className="recipe-card-title">{recipe.name}</h3>
                  <div className="recipe-card-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => handleOpenModal(recipe)}
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(recipe.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {recipe.description && (
                  <p className="recipe-card-desc">{recipe.description}</p>
                )}

                {recipe.ingredients?.length > 0 && (
                  <div className="recipe-ingredients-list">
                    <h4>Ingredientes</h4>
                    <ul>
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                          {ing.quantity} {ing.ingredient_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {recipe.preparation && (
                  <div className="recipe-preparation">
                    <h4>Preparación</h4>
                    <p>{recipe.preparation}</p>
                  </div>
                )}

                <div className="recipe-card-meta">
                  {recipe.author && (
                    <span>
                      <User size={14} />
                      {recipe.author}
                    </span>
                  )}
                  <span>
                    <Calendar size={14} />
                    {formatDate(recipe.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-table">
            <BookOpenIcon size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
            <p>No hay recetas registradas</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Comienza agregando tu primera receta</p>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingRecipe ? 'Editar Receta' : 'Nueva Receta'}
                </h2>
                <button className="modal-close" onClick={handleCloseModal}>×</button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre de la receta *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    className="input"
                    rows={2}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="recipe-form-step">
                  <h4>Ingredientes</h4>
                  {formData.ingredients.map((ing, index) => (
                    <div key={index} className="ingredient-row">
                      <input
                        type="text"
                        className="input"
                        placeholder="Ingrediente"
                        value={ing.ingredient_name}
                        onChange={(e) => handleIngredientChange(index, 'ingredient_name', e.target.value)}
                      />
                      <input
                        type="text"
                        className="input"
                        placeholder="Cantidad"
                        value={ing.quantity}
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      />
                      <button
                        type="button"
                        className="action-btn delete"
                        onClick={() => removeIngredient(index)}
                        style={{ width: 36, height: 36 }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-ingredient-btn"
                    onClick={addIngredient}
                  >
                    <Plus size={16} style={{ display: 'inline', marginRight: 8 }} />
                    Agregar ingrediente
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="preparation">Preparación</label>
                  <textarea
                    id="preparation"
                    name="preparation"
                    className="input"
                    rows={4}
                    value={formData.preparation}
                    onChange={handleChange}
                    placeholder="Pasos de preparación..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="author">Quién agregó</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="input"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Nombre de quien registra la receta"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminRecipes;
