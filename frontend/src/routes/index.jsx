import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

/**
 * Semua route halaman didaftarin di sini. App.jsx cuma manggil
 * <AppRoutes /> ini, gak perlu tau detail path apa aja yang ada -
 * kalo nambah halaman baru, cukup import + tambah <Route> di sini.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;