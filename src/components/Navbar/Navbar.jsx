import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Phone, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ES');
  const [activeLink, setActiveLink] = useState('inicio');
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Actualizar activeLink basado en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveLink('inicio');
    } else if (path === '/sobre-nosotros') {
      setActiveLink('sobre-nosotros');
    } else if (path === '/habitaciones') {
      setActiveLink('habitaciones');
    } else if (path === '/servicio') {
      setActiveLink('servicio');
    } else if (path === '/contacto') {
      setActiveLink('contacto');
    } else if (path === '/reservas') {
      setActiveLink('reservas');
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    console.log('Idioma cambiado a:', lang);
  };

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    setIsMenuOpen(false);
  };

  // Función para manejar navegación a secciones
  const handleSectionNavigation = (sectionId) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // Si no estamos en home, navegar a home y luego hacer scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Si estamos en home, hacer scroll directo
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveLink(sectionId);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Top bar con información de contacto */}
        <div className="navbar-top">
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={14} />
              <span>+57 321 122 3043</span>
            </div>
            <div className="contact-item">
              <Mail size={14} />
              <span>hotellatiaemiss@gmail.com</span>
            </div>
          </div>
          
          <div className="top-actions">
            <div className="language-selector-top">
              <Globe size={14} />
              <select 
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="language-select"
              >
                <option value="ES">Español</option>
                <option value="EN">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo-container" onClick={() => setActiveLink('inicio')}>
              <div className="logo-icon">
                <span>H</span>
              </div>
              <div className="logo-text">
                <h2>Hotel La tía Emiss</h2>
                <span className="logo-subtitle">Salento</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <Link 
              to="/" 
              className={`navbar-link ${activeLink === 'inicio' ? 'active' : ''}`}
              onClick={() => handleLinkClick('inicio')}
            >
              <span>Inicio</span>
            </Link>
            <Link 
              to="/sobre-nosotros" 
              className={`navbar-link ${activeLink === 'sobre-nosotros' ? 'active' : ''}`}
              onClick={() => handleLinkClick('sobre-nosotros')}
            >
              <span>Sobre Nosotros</span>
            </Link>
            <Link 
              to='/habitaciones'
              className={`navbar-link ${activeLink === 'habitaciones' ? 'active' : ''}`}
              onClick={() => handleLinkClick('habitaciones')}
            >
              <span>Habitaciones</span>
            </Link>
            <Link 
              to="/servicio"
              className={`navbar-link ${activeLink === 'servicio' ? 'active' : ''}`}
              onClick={() => handleLinkClick('servicio')}
            >
              <span>Servicios</span>
            </Link>
            <Link 
              to="/contacto"
              className={`navbar-link ${activeLink === 'contacto' ? 'active' : ''}`}
              onClick={() => handleLinkClick('contacto')}
            >
              <span>Contacto</span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="navbar-cta">
            <Link 
              to="/reservas"
              className="reserve-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar Ahora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <div className="mobile-contact">
              <div className="contact-item">
                <Phone size={16} />
                <span>+57 321 122 3043</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>hotellatiaemiss@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="mobile-menu-links">
            <Link 
              to="/" 
              className="mobile-link" 
              onClick={() => handleLinkClick('inicio')}
            >
              <span>Inicio</span>
            </Link>
            <Link 
              to="/sobre-nosotros" 
              className="mobile-link" 
              onClick={() => handleLinkClick('sobre-nosotros')}
            >
              <span>Sobre Nosotros</span>
            </Link>
            <Link 
              to="/habitaciones"
              className="mobile-link"
              onClick={() => handleLinkClick('habitaciones')}
            >
              <span>Habitaciones</span>
            </Link>
            <Link 
              to="/servicio"
              className="mobile-link"
              onClick={() => handleLinkClick('servicio')}
            >
              <span>Servicios</span>
            </Link>
            <Link 
              to="/contacto"
              className="mobile-link"
              onClick={() => handleLinkClick('contacto')}
            >
              <span>Contacto</span>
            </Link>
          </div>

          <div className="mobile-menu-footer">
            {/* Mobile CTA Button */}
            <Link 
              to="/reservas"
              className="reserve-btn mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar Ahora
            </Link>
            
            <div className="mobile-language">
              <select 
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="language-select mobile"
              >
                <option value="ES">🇪🇸 Español</option>
                <option value="EN">🇺🇸 English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overlay para mobile menu */}
        {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}
      </div>
    </nav>
  );
};

export default Navbar;