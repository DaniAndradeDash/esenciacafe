import { Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import Admin from './pages/Admin'
import AdminRecipes from './pages/AdminRecipes'
import QRGenerator from './pages/QRGenerator'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/recetas" element={<AdminRecipes />} />
      <Route path="/admin/qr" element={<QRGenerator />} />
    </Routes>
  )
}

export default App
