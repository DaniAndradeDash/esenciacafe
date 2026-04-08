const API_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || 'Error en la solicitud');
  }

  return response.json();
}

export const api = {
  categories: {
    getAll: () => fetchAPI('/categories'),
    getById: (id) => fetchAPI(`/categories/${id}`),
    create: (data) => fetchAPI('/categories', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchAPI(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchAPI(`/categories/${id}`, { method: 'DELETE' }),
  },
  
  products: {
    getAll: () => fetchAPI('/products'),
    getById: (id) => fetchAPI(`/products/${id}`),
    getByCategory: (category) => fetchAPI(`/products/category/${category}`),
    create: (data) => fetchAPI('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchAPI(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
  },
  
  recipes: {
    getAll: () => fetchAPI('/recipes'),
    getById: (id) => fetchAPI(`/recipes/${id}`),
    create: (data) => fetchAPI('/recipes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchAPI(`/recipes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchAPI(`/recipes/${id}`, { method: 'DELETE' }),
  },
  
  qr: {
    generate: (url) => fetchAPI(`/qr?url=${encodeURIComponent(url)}`),
  },
};

export default api;
