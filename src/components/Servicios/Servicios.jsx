import React, { useState } from "react";
import "./Servicios.css";

const Servicios = () => {
  const [activeService, setActiveService] = useState(null);

  const servicios = [
    {
      id: 1,
      nombre: "Cabalgata",
      subtitulo: "Aventura Cafetera",
      descripcion: "Recorre los senderos ancestrales del eje cafetero montado a caballo.",
      descripcionDetallada: "Disfruta de una experiencia única cabalgando por las montañas cafeteras...",
      icono: "🐴",
      duracion: "2-4 horas",
      capacidad: "Hasta 8 personas",
      precio: "Desde $85,000",
      popular: true,
    },
    {
      id: 2,
      nombre: "Mini Golf",
      subtitulo: "Diversión Familiar",
      descripcion: "Diviértete en nuestra cancha de mini golf temática cafetera.",
      descripcionDetallada: "Cancha de 18 hoyos con obstáculos inspirados en la cultura cafetera...",
      icono: "⛳",
      duracion: "1-2 horas",
      capacidad: "Hasta 12 personas",
      precio: "Desde $25,000",
      popular: false,
    },
    {
      id: 3,
      nombre: "Zona de Spa",
      subtitulo: "Relajación Premium",
      descripcion: "Relájate con tratamientos naturales inspirados en ingredientes locales.",
      descripcionDetallada: "Tratamientos exclusivos con café orgánico y aceites esenciales...",
      icono: "💆",
      duracion: "1-3 horas",
      capacidad: "Hasta 6 personas",
      precio: "Desde $120,000",
      popular: true,
    },
  ];

  return (
    <section className="servicios" id="servicios">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">✨ Experiencias Únicas</span>
          <h2 className="section-title">
            Nuestros <span className="highlight">Servicios</span>
          </h2>
          <p className="section-subtitle">
            Descubre experiencias diseñadas para conectarte con la auténtica cultura cafetera.
          </p>
        </div>

        <div className="servicios-grid">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className={`servicio-card ${servicio.popular ? "popular" : ""} ${
                activeService === servicio.id ? "active" : ""
              }`}
              onMouseEnter={() => setActiveService(servicio.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              {servicio.popular && <div className="popular-badge">🌟 Popular</div>}

              <div className="servicio-icono">{servicio.icono}</div>

              <div className="servicio-contenido">
                <div className="servicio-header">
                  <h3 className="servicio-titulo">{servicio.nombre}</h3>
                  <span className="servicio-subtitulo">{servicio.subtitulo}</span>
                </div>

                <p className="servicio-descripcion">
                  {activeService === servicio.id
                    ? servicio.descripcionDetallada
                    : servicio.descripcion}
                </p>

                <div className="servicio-detalles">
                  <span>⏱ {servicio.duracion}</span>
                  <span>👥 {servicio.capacidad}</span>
                </div>

                <div className="servicio-precio">
                  <span className="precio-valor">{servicio.precio}</span>
                  <span className="precio-persona">por persona</span>
                </div>

                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;
