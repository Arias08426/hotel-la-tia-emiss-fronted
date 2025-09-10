import React from 'react';
import { MapPin, Phone, Mail, Clock, Star, Navigation, Globe } from 'lucide-react';
import './Ubicacion.css';

const Ubicacion = () => {
  const handleDirections = () => {
    window.open('https://www.google.com/maps/dir//Hotel+La+tia+Emiss+Salento,+Carrera+4+%23+5-38,+631020+Salento,+Quind%C3%ADo,+Colombia/@4.6311,-75.5716,15z', '_blank');
  };

  const handleBooking = () => {
    // Aquí iría la lógica de reservas
    console.log('Verificar disponibilidad');
  };

  return (
    <section className="ubicacion" id="ubicacion">
      <div className="container">
        {/* Header de la sección */}
        <div className="section-header">
          <div className="section-badge">
            <MapPin size={16} />
            <span>Nuestra Ubicación</span>
          </div>
          
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <h2 className="section-title" style={{ whiteSpace: 'nowrap' }}>
    Encuéntranos en <span className="highlight">Salento, Quindío.</span>
  </h2>
</div>


          
          <p className="section-subtitle">
            En el corazón del pueblo más pintoresco del eje cafetero colombiano, 
            rodeado de la auténtica cultura cafetera y paisajes únicos.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="ubicacion-main">
          {/* Mapa */}
          <div className="mapa-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7482837755906!2d-75.57323862519569!3d4.638932995335845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388db58537df61%3A0x8e823a963a26acd4!2sHOTEL%20LA%20TIA%20EMISS!5e0!3m2!1ses!2sco!4v1756396718784!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Hotel La tía Emiss Salento"
            ></iframe>
          </div>

          {/* Información del hotel */}
          <div className="hotel-info">
            <div className="hotel-card">
              <div className="hotel-header">
                <h3>HOTEL LA TIA EMISS SAS</h3>
                <div className="hotel-website">
                  latiaemisshotelsalento.com-hotel.com
                </div>
              </div>

              <div className="hotel-rating">
                <div className="stars">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} size={16} fill="#f59e0b" />
                  ))}
                  <Star size={16} />
                </div>
                <span className="rating-text">11 reseñas de Hoteles · Hotel de 4 estrellas</span>
              </div>

              <div className="hotel-address">
                <MapPin size={16} />
                <span>Carrera 4 # 5-38, 631020 Salento, Colombia, Salento, Quindío 631020</span>
              </div>

              <div className="hotel-phone">
                <Phone size={16} />
                <span>+57 316 4162726</span>
              </div>

              <div className="hotel-actions">
                <button className="btn-directions" onClick={handleDirections}>
                  <Navigation size={16} />
                  <span>Cómo llegar</span>
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="info-adicional">
              <div className="info-card">
                <Clock size={20} />
                <div>
                  <h4>Horario de Check-in/Check-out</h4>
                  <p>Check-in: 3:00 PM - 11:00 PM</p>
                  <p>Check-out: 6:00 AM - 12:00 PM</p>
                </div>
              </div>

              <div className="info-card">
                <Phone size={20} />
                <div>
                  <h4>Contacto Directo</h4>
                  <p>+57 321 122 3043</p>
                  <p>hotellatiaemiss@gmail.com</p>
                </div>
              </div>

              <div className="info-card">
                <MapPin size={20} />
                <div>
                  <h4>Lugares de Interés Cercanos</h4>
                  <p>Plaza Principal - 2 min caminando</p>
                  <p>Valle del Cocora - 15 min en carro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;