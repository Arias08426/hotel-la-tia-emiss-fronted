import React, { useState } from 'react';
import { Star, Users, Wifi, Coffee, Bath, Bed, ArrowRight, Eye, MapPin, Clock, Shield, Heart } from 'lucide-react';
import CardHabitacion from '../../components/CardHabitacion/CardHabitacion';
import './Habitaciones.css';

const Habitaciones = () => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const habitaciones = [
    {
      id: 1,
      titulo: 'Doble/Single',
      subtitulo: 'Suite Clásica',
      descripcion: 'Descanse en nuestra acogedora habitación con una cama doble, perfecta para viajeros solitarios o parejas que buscan un espacio íntimo y confortable. Decorada con elementos que evocan la rica historia de Salento y el legado de la Tía Emiss, esta habitación combina el encanto tradicional con las comodidades modernas que necesita para una estancia memorable en el corazón del eje cafetero. 1 cama doble.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b1fac1703.jpg',
      precio: '150,000',
      capacidad: 2,
      categoria: 'sencilla',
      amenidades: ['Wifi', 'Desayuno', 'Baño Privado', 'Aire Acondicionado'],
      rating: 4.8,
      metros: 25,
      popular: false
    },
    {
      id: 2,
      titulo: 'Doble twin',
      subtitulo: 'Suite Premium',
      descripcion: 'Disfrute de amplitud y comodidad en nuestra habitación Doble Twin, equipada con dos camas dobles ideales para familias pequeñas o amigos viajeros. Con un ambiente cálido que refleja la hospitalidad que caracterizó a la Tía Emiss, este espacio le brinda el descanso perfecto después de explorar las maravillas naturales y culturales de Salento. 2 camas dobles',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b32a1bf54.jpg',
      precio: '220,000',
      capacidad: 4,
      categoria: 'doble',
      amenidades: ['Wifi', 'Desayuno', 'Jacuzzi', 'Minibar', 'Terraza'],
      rating: 4.9,
      metros: 35,
      popular: true
    },
    {
      id: 3,
      titulo: 'Triple twin',
      subtitulo: 'Suite Familiar',
      descripcion: 'Nuestra espaciosa habitación Triple Twin ofrece tres camas dobles, proporcionando el equilibrio perfecto entre privacidad y convivencia para grupos de amigos o familias. El diseño cuidadosamente pensado y la decoración que honra las raíces quindianas de la Tía Emiss crean un ambiente acogedor donde podrá relajarse y compartir las experiencias vividas durante el día. 3 camas dobles.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b37a9a607.jpg',
      precio: '280,000',
      capacidad: 6,
      categoria: 'triple',
      amenidades: ['Wifi', 'Desayuno', 'Sala de Estar', 'Kitchenette'],
      rating: 4.7,
      metros: 45,
      popular: false
    },
    {
      id: 4,
      titulo: 'Habitación Cuádruple Twin',
      subtitulo: 'Experiencia Única',
      descripcion: 'Ideal para familias numerosas o grupos de amigos, la habitación Cuádruple Twin cuenta con cuatro camas dobles y todo el espacio necesario para una estancia cómoda y placentera. Inspirada en la generosidad y espíritu comunitario de la Tía Emiss, esta habitación es perfecta para quienes valoran tanto la privacidad como los momentos compartidos, ofreciendo un refugio acogedor en un edificio lleno de historia y tradición salentina. 4 camas dobles.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b2ad9e4bd.jpg',
      precio: '450,000',
      capacidad: 8,
      categoria: 'presidencial',
      amenidades: ['Wifi', 'Butler', 'Spa Privado', 'Chef Personal', 'Terraza Premium'],
      rating: 5.0,
      metros: 75,
      popular: true
    }
  ];

  const filtros = [
    { id: 'todas', label: 'Todas las Suites' },
    { id: 'sencilla', label: 'Sencillas' },
    { id: 'doble', label: 'Dobles' },
    { id: 'triple', label: 'Familiares' },
    { id: 'presidencial', label: 'Premium' }
  ];

  const habitacionesFiltradas = activeFilter === 'todas' 
    ? habitaciones 
    : habitaciones.filter(hab => hab.categoria === activeFilter);

  const handleContactarAsesor = () => {
    const telefono = "573233212051";
    const mensaje = encodeURIComponent("Hola, me interesa conocer más sobre las habitaciones del Hotel La Tía Emiss");
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="habitaciones-page">
      {/* Hero Section */}
      <section className="hero-habitaciones">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} />
            <span>Experiencias de Lujo</span>
          </div>
          <h1>Nuestras <span className="highlight">Suites</span></h1>
          <p>Cada habitación está cuidadosamente diseñada para ofrecerte el máximo confort y una experiencia única en el corazón del eje cafetero colombiano.</p>
        </div>
      </section>

      {/* Información adicional */}
      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <h3>Check-in / Check-out</h3>
              <p>Check-in: 3:00 PM<br />Check-out: 12:00 PM</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <h3>Ubicación Privilegiada</h3>
              <p>En el corazón de Salento, cerca de todas las atracciones principales</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Shield size={24} />
              </div>
              <h3>Cancelación Flexible</h3>
              <p>Cancelación gratuita hasta 24 horas antes de tu llegada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="filtros-section">
        <div className="container">
          <div className="filtros-container">
            {filtros.map(filtro => (
              <button
                key={filtro.id}
                className={`filtro-btn ${activeFilter === filtro.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filtro.id)}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de habitaciones - Contenido exacto de TiposHabitacion */}
      <section className="habitaciones-section">
        <div className="container">
          <div className="section-header">
            <h2>Explora Nuestras Suites</h2>
            <p>Cada habitación cuenta una historia única del legado de la Tía Emiss</p>
          </div>
          <div className="habitaciones-grid">
            {habitacionesFiltradas.map((habitacion) => (
              <div key={habitacion.id} style={{ position: 'relative' }}>
                <div style={{ 
                  position: 'relative',
                  // CSS para ocultar todos los botones que contengan "RESERVAR"
                }}>
                  <style>{`
                    .habitaciones-grid [class*="btn"]:not(.ver-detalles-btn-personalizado),
                    .habitaciones-grid button:not(.ver-detalles-btn-personalizado) {
                      display: none !important;
                    }
                    .habitaciones-grid .ver-detalles-btn-personalizado {
                      display: flex !important;
                    }
                  `}</style>
                  <CardHabitacion {...habitacion} />
                  {/* Botón Ver Detalles posicionado exactamente donde estaba RESERVAR */}
                  <button 
                    className="ver-detalles-btn-personalizado"
                    onClick={() => setSelectedRoom(habitacion)}
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #d4751a, #c06318)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 15px rgba(212, 117, 26, 0.3)',
                      zIndex: 1000
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(212, 117, 26, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(212, 117, 26, 0.3)';
                    }}
                  >
                    <Eye size={16} />
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección separada - Características especiales */}
      <section className="caracteristicas-especiales">
        <div className="container">
          <div className="caracteristicas-header">
            <h2>Lo que Hace Especial Cada Suite</h2>
            <p>Detalles únicos que reflejan la hospitalidad de la Tía Emiss</p>
          </div>
          <div className="caracteristicas-grid">
            <div className="caracteristica-especial">
              <div className="caracteristica-icon">
                <Bed size={32} />
              </div>
              <h3>Camas Premium</h3>
              <p>Colchones de alta gama y ropa de cama 100% algodón para un descanso reparador</p>
            </div>
            <div className="caracteristica-especial">
              <div className="caracteristica-icon">
                <Coffee size={32} />
              </div>
              <h3>Café de Salento</h3>
              <p>Cada habitación incluye una selección de los mejores cafés locales para disfrutar</p>
            </div>
            <div className="caracteristica-especial">
              <div className="caracteristica-icon">
                <Bath size={32} />
              </div>
              <h3>Baños de Lujo</h3>
              <p>Amenidades premium y diseño elegante inspirado en la arquitectura colonial</p>
            </div>
            <div className="caracteristica-especial">
              <div className="caracteristica-icon">
                <Wifi size={32} />
              </div>
              <h3>Conectividad Total</h3>
              <p>WiFi de alta velocidad y espacios de trabajo cómodos para huéspedes de negocios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Contenido exacto de TiposHabitacion */}
      <section className="section-cta">
        <div className="container">
          <div className="cta-content">
            <h3>¿Necesitas ayuda para elegir?</h3>
            <p>Nuestro equipo está disponible 24/7 para ayudarte a encontrar la suite perfecta</p>
            <div className="cta-buttons">
              <button 
                className="btn-primary"
                onClick={handleContactarAsesor}
              >
                <span>Contactar Asesor</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ÚNICO AGREGADO: Modal de detalles */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedRoom.titulo}</h3>
              <button onClick={() => setSelectedRoom(null)}>×</button>
            </div>
            <div className="modal-body">
              <img src={selectedRoom.imagen} alt={selectedRoom.titulo} />
              <div className="modal-info">
                <p>{selectedRoom.descripcion}</p>
                <div className="amenidades-completas">
                  <h4>Amenidades incluidas:</h4>
                  <div className="amenidades-grid">
                    {selectedRoom.amenidades.map((amenidad, index) => (
                      <span key={index} className="amenidad-full">{amenidad}</span>
                    ))}
                  </div>
                </div>
                <div className="modal-precio">
                  <span>Desde ${selectedRoom.precio} COP por noche</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habitaciones;