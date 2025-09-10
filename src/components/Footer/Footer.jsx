import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Columna de Contacto */}
          <div className="footer-section">
            <h3 className="footer-title">DETALLES DEL CONTACTO</h3>
            
            <div className="contact-item">
              <Phone size={18} />
              <div>
                <p>TEL: +573 121 122 3043</p>
                <p>+573 015 000 3043</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Mail size={18} />
              <p>hotellatiaemiss@gmail.com</p>
            </div>
            
            <div className="contact-item">
              <MapPin size={18} />
              <p>Salento, Quindío, Colombia</p>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Columna de Menú */}
          <div className="footer-section">
            <h3 className="footer-title">MENÚ</h3>
            
            <ul className="footer-menu">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
              <li><a href="#habitaciones">Habitaciones</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#reservas">Reservas</a></li>
            </ul>
          </div>

          {/* Columna de Otros Hoteles */}
          <div className="footer-section">
            <h3 className="footer-title">OTROS HOTELES</h3>
            
            <ul className="footer-menu">
              <li><a href="#">Rancho de Salento</a></li>
              <li><a href="#">Hostal Ciudad de Geborge</a></li>
            </ul>
          </div>

          {/* Columna de Información Legal */}
          <div className="footer-section footer-legal">
            <div className="legal-text">
              <p>
                El Hotel Emiss Salento es responsable del tratamiento de sus datos personales. De conformidad con lo dispuesto en la Ley 1581 de 2012 "Ley de Protección de Datos Personales" y el Decreto reglamentario 1377 de 2013, el Hotel Emiss informa que los datos personales de registro y contacto que se recopilan, tienen como finalidad establecer un canal de comunicación con los usuarios para el envío de información de nuestros servicios, respuesta a sus consultas o sugerencias. Los datos personales suministrados se conservarán de forma indefinida hasta que el usuario solicite la supresión de los mismos. El Hotel Emiss Salento garantiza la confidencialidad de la información suministrada por el usuario y se compromete a no divulgar ni permitir el acceso a los datos personales a terceros no autorizados. Conozca la política completa en este portal.
              </p>
              
              <p className="website-credit">
                <strong>www.laemiss.com</strong>
              </p>
              
              <p className="address">
                <strong>Salento, Quindío</strong>
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="copyright">
            © 2024 Hotel La tía Emiss Salento. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;