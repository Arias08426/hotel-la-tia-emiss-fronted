import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, ArrowRight, Phone, Mail, Calendar, MapPin, X, Check } from 'lucide-react';
import './NUestrosServicios.css';

const Servicios = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [filterCategory, setFilterCategory] = useState('todos');

  const servicios = [
    {
      id: 1,
      titulo: 'Cabalgata',
      subtitulo: 'Aventura Cafetera',
      descripcion: 'Recorre los senderos ancestrales del eje cafetero montado a caballo.',
      icono: '🐴',
      duracion: '2-4 horas',
      personas: 'Hasta 8 personas',
      precio: '85,000',
      categoria: 'aventura',
      popular: true,
      incluye: [
        'Caballo y equipo completo',
        'Guía especializado',
        'Seguro de accidentes',
        'Refrigerio tradicional',
        'Fotografías del recorrido'
      ],
      detalles: 'Explora los caminos tradicionales cafeteros en una experiencia única. Visitarás miradores naturales con vistas espectaculares del Valle de Cocora y fincas tradicionales donde conocerás el proceso del café.',
      horarios: ['8:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      disponibilidad: 'Todos los días (sujeto a clima)'
    },
    {
      id: 2,
      titulo: 'Mini Golf',
      subtitulo: 'Diversión Familiar',
      descripcion: 'Diviértete en nuestra cancha de mini golf temática cafetera.',
      icono: '⛳',
      duracion: '1-2 horas',
      personas: 'Hasta 12 personas',
      precio: '25,000',
      categoria: 'familia',
      popular: false,
      incluye: [
        'Acceso a cancha completa',
        'Palos y pelotas',
        'Tarjeta de puntuación',
        'Bebida de bienvenida',
        'Certificado al ganador'
      ],
      detalles: 'Cancha de mini golf diseñada con temática del eje cafetero. Cada hoyo representa diferentes aspectos de la cultura cafetera. Perfecta para disfrutar en familia.',
      horarios: ['9:00 AM - 6:00 PM'],
      disponibilidad: 'Todos los días'
    },
    {
      id: 3,
      titulo: 'Zona de Spa',
      subtitulo: 'Relajación Premium',
      descripcion: 'Relájate con tratamientos naturales inspirados en ingredientes locales.',
      icono: '🧘‍♀️',
      duracion: '1-3 horas',
      personas: 'Hasta 6 personas',
      precio: '120,000',
      categoria: 'bienestar',
      popular: true,
      incluye: [
        'Masaje relajante (60 min)',
        'Tratamiento facial con café',
        'Acceso a sauna',
        'Bebidas aromáticas',
        'Productos naturales de regalo'
      ],
      detalles: 'Spa con tratamientos únicos usando ingredientes locales como café, arcillas y plantas aromáticas de la región. Ambiente tranquilo rodeado de naturaleza.',
      horarios: ['10:00 AM - 7:00 PM'],
      disponibilidad: 'Martes a domingo (previa reserva)'
    },
    {
      id: 4,
      titulo: 'Tour del Café',
      subtitulo: 'Experiencia Cafetera',
      descripcion: 'Conoce todo el proceso del café desde la semilla hasta la taza.',
      icono: '☕',
      duracion: '3 horas',
      personas: 'Hasta 15 personas',
      precio: '65,000',
      categoria: 'cultural',
      popular: true,
      incluye: [
        'Recorrido por plantación',
        'Degustación de café especial',
        'Almuerzo tradicional',
        'Taller de preparación',
        'Bolsa de café de regalo'
      ],
      detalles: 'Sumérgete en la cultura cafetera con nuestro tour completo. Aprenderás sobre el cultivo, recolección, tostado y preparación del mejor café de Colombia.',
      horarios: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'],
      disponibilidad: 'Todos los días'
    }
  ];

  const categorias = [
    { id: 'todos', nombre: 'Todos', icono: '🌟' },
    { id: 'aventura', nombre: 'Aventura', icono: '🏔️' },
    { id: 'familia', nombre: 'Familia', icono: '👨‍👩‍👧‍👦' },
    { id: 'bienestar', nombre: 'Bienestar', icono: '🧘‍♀️' },
    { id: 'cultural', nombre: 'Cultural', icono: '🏛️' }
  ];

  const beneficiosAdicionales = [
    {
      icono: <Calendar size={24} />,
      titulo: 'Reservas Flexibles',
      descripcion: 'Modifica tus planes hasta 2 horas antes del servicio'
    },
    {
      icono: <MapPin size={24} />,
      titulo: 'Transporte Incluido',
      descripcion: 'Recogida y regreso al hotel sin costo adicional'
    },
    {
      icono: <Phone size={24} />,
      titulo: 'Atención 24/7',
      descripcion: 'Equipo disponible las 24 horas para consultas'
    },
    {
      icono: <Check size={24} />,
      titulo: 'Garantía de Calidad',
      descripcion: 'Satisfacción garantizada o devolvemos tu dinero'
    }
  ];

  const testimonios = [
    {
      nombre: 'María González',
      servicio: 'Cabalgata',
      comentario: 'Una experiencia increíble. Los paisajes son espectaculares y el guía muy conocedor.',
      rating: 5,
      imagen: '👩‍🦱'
    },
    {
      nombre: 'Carlos Ramírez',
      servicio: 'Mini Golf',
      comentario: 'Perfecto para ir en familia. Los niños se divirtieron muchísimo.',
      rating: 5,
      imagen: '👨‍🦲'
    },
    {
      nombre: 'Ana Torres',
      servicio: 'Zona de Spa',
      comentario: 'El masaje con café fue relajante y único. Muy profesional.',
      rating: 5,
      imagen: '👩‍🦳'
    },
    {
      nombre: 'Diego Morales',
      servicio: 'Tour del Café',
      comentario: 'Aprendí muchísimo sobre el café. Una experiencia auténtica.',
      rating: 5,
      imagen: '👨‍🦱'
    }
  ];

  // Filtrar servicios por categoría
  const serviciosFiltrados = filterCategory === 'todos' 
    ? servicios 
    : servicios.filter(servicio => servicio.categoria === filterCategory);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setSelectedService(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedService]);

  const handleReservarServicio = (servicio) => {
    const telefono = "573233212051";
    const mensaje = encodeURIComponent(
      `¡Hola! Me interesa reservar el servicio de *${servicio.titulo}*.\n\n` +
      `💰 Precio: $${formatPrice(servicio.precio)} por persona\n` +
      `⏰ Duración: ${servicio.duracion}\n` +
      `👥 Capacidad: ${servicio.personas}\n\n` +
      `¿Podrían darme más información sobre disponibilidad y horarios?`
    );
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleMasInformacion = (servicio) => {
    setSelectedService(servicio);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(parseInt(price.replace(/[,\.]/g, '')));
  };

  const handleFilterChange = (categoria) => {
    setFilterCategory(categoria);
  };

  return (
    <div className="servicios-page">
      {/* Hero Section */}
      <section className="hero-servicios">
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} />
            <span>Experiencias Únicas</span>
          </div>
          <h1>Nuestros <span className="highlight">Servicios</span></h1>
          <p>Descubre experiencias diseñadas para conectarte con la auténtica cultura cafetera de Salento.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Huéspedes felices</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Rating promedio</span>
            </div>
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Servicios únicos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros de Categorías */}
      <section className="filtros-section">
        <div className="container">
          <div className="filtros-container">
            <h2>Explora nuestros servicios</h2>
            <div className="filtros-categorias">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  className={`filtro-btn ${filterCategory === categoria.id ? 'active' : ''}`}
                  onClick={() => handleFilterChange(categoria.id)}
                >
                  <span className="filtro-icono">{categoria.icono}</span>
                  {categoria.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="servicios-principales">
        <div className="container">
          <div className="servicios-grid">
            {serviciosFiltrados.map((servicio) => (
              <div key={servicio.id} className="servicio-card">
                {servicio.popular && (
                  <div className="popular-badge">
                    <Star size={12} fill="currentColor" />
                    Popular
                  </div>
                )}
                
                <div className="servicio-icon">
                  <span>{servicio.icono}</span>
                </div>

                <div className="servicio-content">
                  <h3>{servicio.titulo}</h3>
                  <p className="servicio-subtitulo">{servicio.subtitulo}</p>
                  <p className="servicio-descripcion">{servicio.descripcion}</p>

                  <div className="servicio-detalles">
                    <div className="detalle-item">
                      <Clock size={16} />
                      <span>{servicio.duracion}</span>
                    </div>
                    <div className="detalle-item">
                      <Users size={16} />
                      <span>{servicio.personas}</span>
                    </div>
                  </div>

                  <div className="servicio-precio">
                    <span className="precio">Desde ${formatPrice(servicio.precio)}</span>
                    <span className="por-persona">por persona</span>
                  </div>

                  <div className="servicio-acciones">
                    <button 
                      className="mas-informacion-btn"
                      onClick={() => handleMasInformacion(servicio)}
                    >
                      Más información
                      <ArrowRight size={16} />
                    </button>
                    <button 
                      className="reservar-quick-btn"
                      onClick={() => handleReservarServicio(servicio)}
                    >
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {serviciosFiltrados.length === 0 && (
            <div className="no-servicios">
              <p>No hay servicios disponibles en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      {/* Beneficios Adicionales */}
      <section className="beneficios-section">
        <div className="container">
          <div className="section-header">
            <h2>¿Por qué elegirnos?</h2>
            <p>Comprometidos con brindarte la mejor experiencia en el eje cafetero</p>
          </div>
          <div className="beneficios-grid">
            {beneficiosAdicionales.map((beneficio, index) => (
              <div key={index} className="beneficio-card">
                <div className="beneficio-icono">
                  {beneficio.icono}
                </div>
                <h3>{beneficio.titulo}</h3>
                <p>{beneficio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de detalles */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <span className="modal-icon">{selectedService.icono}</span>
                <div>
                  <h3>{selectedService.titulo}</h3>
                  <p>{selectedService.subtitulo}</p>
                </div>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedService(null)}
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="servicio-info-completa">
                <p className="descripcion-completa">{selectedService.detalles}</p>

                <div className="servicio-detalles-modal">
                  <div className="detalle-row">
                    <strong>⏰ Duración:</strong> {selectedService.duracion}
                  </div>
                  <div className="detalle-row">
                    <strong>👥 Capacidad:</strong> {selectedService.personas}
                  </div>
                  <div className="detalle-row">
                    <strong>📅 Disponibilidad:</strong> {selectedService.disponibilidad}
                  </div>
                  <div className="detalle-row">
                    <strong>🕐 Horarios:</strong> {selectedService.horarios.join(', ')}
                  </div>
                </div>

                <div className="servicio-incluye">
                  <h4>✅ ¿Qué incluye?</h4>
                  <ul>
                    {selectedService.incluye.map((item, index) => (
                      <li key={index}>
                        <Check size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-precio-section">
                  <div className="precio-info">
                    <span className="precio-label">Precio por persona:</span>
                    <span className="precio-grande">
                      ${formatPrice(selectedService.precio)} COP
                    </span>
                  </div>
                </div>

                <div className="modal-actions">

                  <button 
                    className="reservar-btn secondary"
                    onClick={() => setSelectedService(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicios;