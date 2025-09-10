import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SobreNosotros from './pages/SobreNosotros/SobreNosotros';
import ReservasPage from './pages/Reservas/ReservasPage';
import Habitaciones from './pages/Habitaciones/Habitaciones';
import Contacto from './pages/Contacto/Contacto';
import NuestrosServicios from './pages/NuestrosServicios/NuestrosServicios';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import CalendarioReservas from './pages/Reservas/CalendarioReservas.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ width: '100%', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/habitaciones" element={<Habitaciones />} />
              <Route path="/servicio" element={<NuestrosServicios />} />
              <Route path="/reservas" element={<ReservasPage />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              // import CalendarioReservas ...
<Route path="/calendario-reservas" element={<CalendarioReservas />} />
              {/* Opcional: Ruta 404
              <Route path="*" element={<div style={{padding: '4rem', textAlign:'center'}}>Página no encontrada</div>} />
              */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;