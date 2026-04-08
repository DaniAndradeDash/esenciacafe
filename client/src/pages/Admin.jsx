import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, BookOpen, QrCode, ArrowLeft, Plus, Pencil, Trash2, Loader } from 'lucide-react';
import api from '../context/api';
import './Admin.css';
import './AdminProducts.css';

function Admin() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_available: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [catsData, prodsData] = await Promise.all([
        api.categories.getAll(),
        api.products.getAll(),
      ]);
      setCategories(catsData);
      setProducts(prodsData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
    setLoading(false);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        category_id: product.category_id,
        is_available: product.is_available,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: categories[0]?.id || '',
        is_available: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
      };
      if (editingProduct) {
        await api.products.update(editingProduct.id, data);
      } else {
        await api.products.create(data);
      }
      await loadData();
      handleCloseModal();
    } catch (error) {
      console.error('Error guardando:', error);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await api.products.delete(id);
        await loadData();
      } catch (error) {
        console.error('Error eliminando:', error);
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || '';
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
          <div className="admin-nav-item active">
            <Coffee size={20} />
            <span>Productos</span>
          </div>
          <Link to="/admin/recetas" className="admin-nav-item">
            <BookOpen size={20} />
            <span>Recetas</span>
          </Link>
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
          <h1 className="admin-title">Gestionar Productos</h1>
          <div className="admin-actions">
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              <Plus size={18} />
              Nuevo Producto
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-screen">
            <Loader size={40} className="loading-spinner" style={{ color: 'var(--esencia-caramel)' }} />
          </div>
        ) : (
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        <span className="product-cell-name">{product.name}</span>
                        {product.description && (
                          <span className="product-cell-desc">{product.description}</span>
                        )}
                      </div>
                    </td>
                    <td>{getCategoryName(product.category_id)}</td>
                    <td className="price-cell">${Number(product.price).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${product.is_available ? 'available' : 'unavailable'}`}>
                        {product.is_available ? 'Disponible' : 'No disponible'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => handleOpenModal(product)}
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(product.id)}
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="empty-table">
                <Coffee size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                <p>No hay productos registrados</p>
              </div>
            )}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button className="modal-close" onClick={handleCloseModal}>×</button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre *</label>
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Precio *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="input"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_id">Categoría *</label>
                    <select
                      id="category_id"
                      name="category_id"
                      className="input"
                      value={formData.category_id}
                      onChange={handleChange}
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="is_available"
                      checked={formData.is_available}
                      onChange={handleChange}
                    />
                    <span>Producto disponible</span>
                  </label>
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

export default Admin;
