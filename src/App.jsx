import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SobreNosotros from './pages/SobreNosotros/SobreNosotros';
import ReservasPage from './pages/Reservas/ReservasPage';
import Habitaciones from './pages/Habitaciones/Habitaciones';
import Contacto from './pages/Contacto/Contacto';
import NuestrosServicios from './pages/NuestrosServicios/NuestrosServicios';
import Register from './components/auth/RegisterForm.jsx';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ width: '100%', minHeight: '100vh' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas agrupadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Redirección simple */}
          <Route path="*" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/servicio" element={<NuestrosServicios />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/Contacto" element={<Contacto />} />
            {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Ruta para manejar páginas no encontradas */}
              <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;