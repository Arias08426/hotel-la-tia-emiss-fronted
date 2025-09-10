import React, { useState } from 'react';
import { Star, Users, Wifi, Coffee, Bath, Bed, ArrowRight, Eye, MapPin, Clock, Shield, Heart } from 'lucide-react';
import './Habitaciones.css';

const Habitaciones = () => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const habitaciones = [
    {
      id: 1,
      titulo: 'Habitación Sencilla - Doble',
      subtitulo: 'Suite Clásica',
      descripcion: 'Descanse en nuestra acogedora habitación con una cama doble, perfecta para viajeros solitarios o parejas que buscan un espacio íntimo y confortable. Decorada con elementos que evocan la rica historia de Salento y el legado de la Tía Emiss, esta habitación combina el encanto tradicional con las comodidades modernas que necesita para una estancia memorable en el corazón del eje cafetero.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b1fac1703.jpg',
      precio: '150,000',
      capacidad: 2,
      categoria: 'sencilla',
      amenidades: ['Wifi Gratuito', 'Desayuno', 'Baño Privado', 'Aire Acondicionado', 'TV Cable', 'Agua Caliente'],
      rating: 4.8,
      metros: 25,
      popular: false,
      caracteristicas: [
        { icono: Bed, texto: '1 Cama Doble' },
        { icono: Users, texto: 'Hasta 2 personas' },
        { icono: Bath, texto: 'Baño privado' },
        { icono: Wifi, texto: 'WiFi gratuito' }
      ]
    },
    {
      id: 2,
      titulo: 'Doble Twin',
      subtitulo: 'Suite Premium',
      descripcion: 'Disfrute de amplitud y comodidad en nuestra habitación Doble Twin, equipada con dos camas dobles ideales para familias pequeñas o amigos viajeros.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b33aab7f2.jpg',
      precio: '220,000',
      capacidad: 4,
      categoria: 'doble',
      amenidades: ['Wifi Gratuito', 'Desayuno', 'Jacuzzi', 'Minibar', 'Terraza', 'Room Service'],
      rating: 4.9,
      metros: 35,
      popular: true,
      caracteristicas: [
        { icono: Bed, texto: '2 Camas Dobles' },
        { icono: Users, texto: 'Hasta 4 personas' },
        { icono: Bath, texto: 'Baño con jacuzzi' },
        { icono: Coffee, texto: 'Minibar incluido' }
      ]
    },
    {
      id: 3,
      titulo: 'Triple Twin',
      subtitulo: 'Suite Familiar',
      descripcion: 'Nuestra espaciosa habitación Triple Twin ofrece tres camas dobles, proporcionando el equilibrio perfecto entre privacidad y convivencia.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b385c781b.jpg',
      precio: '280,000',
      capacidad: 6,
      categoria: 'triple',
      amenidades: ['Wifi Gratuito', 'Desayuno', 'Sala de Estar', 'Kitchenette', 'Área de Juegos', 'Terraza'],
      rating: 4.7,
      metros: 45,
      popular: false,
      caracteristicas: [
        { icono: Bed, texto: '3 Camas Dobles' },
        { icono: Users, texto: 'Hasta 6 personas' },
        { icono: Coffee, texto: 'Kitchenette' },
        { icono: Heart, texto: 'Sala de estar' }
      ]
    },
    {
      id: 4,
      titulo: 'Habitación Cuádruple Twin',
      subtitulo: 'Experiencia Premium',
      descripcion: 'Ideal para familias numerosas o grupos de amigos, la habitación Cuádruple Twin cuenta con cuatro camas dobles y todo el espacio necesario.',
      imagen: 'https://app.lobbypms.com/permanent/uploads/161506806b2ad9e4bd.jpg',
      precio: '450,000',
      capacidad: 8,
      categoria: 'presidencial',
      amenidades: ['Wifi Gratuito', 'Butler', 'Spa Privado', 'Chef Personal', 'Terraza Premium', 'Concierge'],
      rating: 5.0,
      metros: 75,
      popular: true,
      caracteristicas: [
        { icono: Bed, texto: '4 Camas Dobles' },
        { icono: Users, texto: 'Hasta 8 personas' },
        { icono: Shield, texto: 'Servicio premium' },
        { icono: Heart, texto: 'Spa privado' }
      ]
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

      {/* Grid de habitaciones */}
      <section className="habitaciones-section">
        <div className="container">
          <div className="section-header">
            <h2>Explora Nuestras Suites</h2>
            <p>Cada habitación cuenta una historia única del legado de la Tía Emiss</p>
          </div>
          <div className="habitaciones-grid">
            {habitacionesFiltradas.map((habitacion) => (
              <div key={habitacion.id} className="habitacion-card">
                <div className="card-image">
                  <img src={habitacion.imagen} alt={habitacion.titulo} />
                  {habitacion.popular && (
                    <div className="popular-badge">
                      <Star size={12} fill="currentColor" />
                      Más Popular
                    </div>
                  )}
                  <div className="capacity-badge">
                    <Users size={14} />
                    {habitacion.capacidad} Personas
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="card-header">
                    <div>
                      <h3>{habitacion.titulo}</h3>
                      <p className="subtitulo">{habitacion.subtitulo}</p>
                    </div>
                    <div className="rating">
                      <Star size={14} fill="#f4a261" />
                      <span>{habitacion.rating}</span>
                    </div>
                  </div>

                  <p className="descripcion">{habitacion.descripcion}</p>

                  <div className="caracteristicas">
                    {habitacion.caracteristicas.map((car, index) => (
                      <div key={index} className="caracteristica">
                        <car.icono size={16} />
                        <span>{car.texto}</span>
                      </div>
                    ))}
                  </div>

                  <div className="amenidades">
                    {habitacion.amenidades.slice(0, 3).map((amenidad, index) => (
                      <span key={index} className="amenidad-tag">{amenidad}</span>
                    ))}
                    {habitacion.amenidades.length > 3 && (
                      <span className="amenidad-tag more">
                        +{habitacion.amenidades.length - 3} más
                      </span>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="precio-info">
                      <span className="precio">Desde ${habitacion.precio}</span>
                      <span className="periodo">COP por noche</span>
                    </div>
                    <button 
                      className="ver-detalles-btn"
                      onClick={() => setSelectedRoom(habitacion)}
                    >
                      <Eye size={16} />
                      Ver Detalles
                    </button>
                  </div>
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

      {/* Modal de detalles */}
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