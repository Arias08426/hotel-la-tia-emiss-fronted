import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SobreNosotros from './pages/SobreNosotros/SobreNosotros';
import Reservas from './pages/Reservas/Reservaspage';
import Habitaciones from './pages/Habitaciones/Habitaciones';
import Contacto from './pages/Contacto/Contacto';
import NuestrosServicios from './pages/NuestrosServicios/NuestrosServicios';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ width: '100%', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/servicio" element={<NuestrosServicios />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/Contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;