import React from 'react';
import { Heart, Users, Award, Coffee, Mountain, Star, Calendar, MapPin, Wifi, Tv, Utensils, Car, Camera, TreePine, Gamepad2 } from 'lucide-react';
import './SobreNosotros.css';

const SobreNosotros = () => {
  const valores = [
    {
      icono: <Heart size={32} />,
      titulo: 'Servicio Excepcional',
      descripcion: 'Nos distinguimos por nuestro servicio amable y personalizado. Nuestros huéspedes destacan la calidez humana y la atención que hace que se sientan como en casa.'
    },
    {
      icono: <Award size={32} />,
      titulo: 'Limpieza Impecable',
      descripcion: 'Mantenemos los más altos estándares de limpieza y aseo en todas nuestras instalaciones, garantizando un ambiente siempre impecable para nuestros huéspedes.'
    },
    {
      icono: <Coffee size={32} />,
      titulo: 'Experiencia Cafetera',
      descripcion: 'Ofrecemos tours del café auténticos y conectamos a nuestros huéspedes con la rica tradición cafetera de la región del Quindío.'
    },
    {
      icono: <Mountain size={32} />,
      titulo: 'Aventura y Naturaleza',
      descripcion: 'Organizamos experiencias únicas como tours al Valle del Cocora, caminatas, parapente a motor y cabalgatas para explorar la belleza natural.'
    }
  ];

  const servicios = [
    {
      icono: <TreePine size={24} />,
      titulo: 'Tour Valle del Cocora',
      descripcion: 'Explora el famoso valle de las palmas de cera, el árbol nacional de Colombia.'
    },
    {
      icono: <Coffee size={24} />,
      titulo: 'Tour del Café',
      descripcion: 'Descubre el proceso completo del café desde la semilla hasta la taza.'
    },
    {
      icono: <Camera size={24} />,
      titulo: 'Parapente a Motor',
      descripcion: 'Vive la aventura de volar sobre los paisajes cafeteros más hermosos.'
    },
    {
      icono: <Mountain size={24} />,
      titulo: 'Cabalgatas',
      descripcion: 'Recorre senderos naturales a caballo y conecta con la naturaleza.'
    },
    {
      icono: <Users size={24} />,
      titulo: 'Caminatas Guiadas',
      descripcion: 'Explora reservas naturales y miradores con guías expertos locales.'
    },
    {
      icono: <Gamepad2 size={24} />,
      titulo: 'Mini Golf',
      descripcion: 'Disfruta de momentos de diversión familiar en nuestro mini golf.'
    }
  ];

  const facilidades = [
    {
      icono: <Wifi size={24} />,
      titulo: 'Wi-Fi Gratuito',
      descripcion: 'Conexión a internet gratuita en todas las habitaciones.'
    },
    {
      icono: <Tv size={24} />,
      titulo: 'TV Satelital',
      descripcion: 'Televisión de pantalla plana con canales vía satélite.'
    },
    {
      icono: <Utensils size={24} />,
      titulo: 'Desayuno Americano',
      descripcion: 'Desayuno completo servido cada mañana.'
    },
    {
      icono: <Car size={24} />,
      titulo: 'Traslado al Aeropuerto',
      descripcion: 'Servicio de transporte desde y hacia el aeropuerto.'
    }
  ];

  const timeline = [
    {
      año: '2015',
      evento: 'Fundación del Hotel',
      descripcion: 'Inicio del sueño familiar de crear un refugio acogedor en Salento.'
    },
    {
      año: '2017',
      evento: 'Primera Expansión',
      descripcion: 'Ampliación con nuevas suites y zona de spa para mejorar la experiencia.'
    },
    {
      año: '2019',
      evento: 'Certificación Sostenible',
      descripcion: 'Obtención de certificaciones ambientales y de turismo sostenible.'
    },
    {
      año: '2021',
      evento: 'Reconocimiento Nacional',
      descripcion: 'Premio al mejor hotel boutique del eje cafetero colombiano.'
    },
    {
      año: '2024',
      evento: 'Renovación Premium',
      descripcion: 'Modernización completa manteniendo la esencia y calidez original.'
    }
  ];

  return (
    <div className="sobre-nosotros">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://www.elranchosalento.com/_next/image?url=https%3A%2F%2Fus-east-1-shared-usea1-02.graphassets.com%2FAOvSBUTjQle5HZUNCXgSbz%2Fcmabtboht74cw07k3l1zq3qzg&w=3840&q=75" 
            alt="Hotel La tía Emiss Salento"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <h1>Nuestra Historia</h1>
            <p>Una familia, una pasión, un sueño hecho realidad en el corazón del eje cafetero</p>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="historia-section">
        <div className="container">
          <div className="historia-content">
            <div className="historia-text">
              <div className="section-badge">
                <Heart size={16} />
                <span>Nuestra Esencia</span>
              </div>
              
              <h2>Una Historia de <span className="highlight">Excelencia</span></h2>
              
              <p>
                El Hotel Emiss Salento se encuentra estratégicamente ubicado a solo 400 metros 
                de la Iglesia Nuestra Señora del Carmen y a 5 minutos a pie del centro de Salento. 
                Estamos cerca de atractivos naturales como el Recuerdo Finca Cafetera Tradicional 
                (4 km), la finca de café Las Acacias (10 minutos en coche) y la Reserva Natural 
                Kasaguadua.
              </p>
              
              <p>
                Lo que realmente nos distingue es nuestro servicio excepcional y la limpieza 
                impecable que mantenemos en todas nuestras instalaciones. Nuestros huéspedes 
                constantemente destacan la amabilidad de nuestro equipo y cómo este trato cálido 
                hace que su estadía sea verdaderamente especial.
              </p>
              
              <p>
                Ofrecemos experiencias únicas que van desde tours al famoso Valle del Cocora y 
                recorridos por fincas cafeteras, hasta actividades de aventura como parapente a 
                motor, cabalgatas, caminatas guiadas y mini golf para toda la familia.
              </p>
            </div>
            
            <div className="historia-stats">
              <div className="stat-item">
                <div className="stat-number">400m</div>
                <div className="stat-label">de la Iglesia Principal</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5min</div>
                <div className="stat-label">caminando al centro</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4km</div>
                <div className="stat-label">Finca Cafetera Tradicional</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios y Experiencias Section */}
      <section className="servicios-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Mountain size={16} />
              <span>Experiencias Únicas</span>
            </div>
            <h2>Aventuras <span className="highlight">Inolvidables</span></h2>
            <p>Descubre las experiencias que hacen de tu estadía algo especial</p>
          </div>
          
          <div className="servicios-grid">
            {servicios.map((servicio, index) => (
              <div key={index} className="servicio-card">
                <div className="servicio-icono">{servicio.icono}</div>
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilidades Section */}
      <section className="facilidades-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Award size={16} />
              <span>Comodidades</span>
            </div>
            <h2>Todo para tu <span className="highlight">Confort</span></h2>
            <p>Facilidades modernas para una estadía perfecta</p>
          </div>
          
          <div className="facilidades-grid">
            {facilidades.map((facilidad, index) => (
              <div key={index} className="facilidad-card">
                <div className="facilidad-icono">{facilidad.icono}</div>
                <h3>{facilidad.titulo}</h3>
                <p>{facilidad.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Calendar size={16} />
              <span>Nuestro Camino</span>
            </div>
            <h2>Momentos que Nos <span className="highlight">Definen</span></h2>
          </div>
          
          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{item.año}</div>
                  <h3>{item.evento}</h3>
                  <p>{item.descripcion}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="valores-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Star size={16} />
              <span>Nuestros Pilares</span>
            </div>
            <h2>Los <span className="highlight">Valores</span> que nos Guían</h2>
            <p>Principios que definen cada experiencia en nuestro hotel</p>
          </div>
          
          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div key={index} className="valor-card">
                <div className="valor-icono">{valor.icono}</div>
                <h3>{valor.titulo}</h3>
                <p>{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      
    </div>
  );
};

export default SobreNosotros;