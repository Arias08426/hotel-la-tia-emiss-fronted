import React, { useState } from 'react';
import { Wifi, Users, Star, ArrowRight, Heart, Maximize2, MapPin } from 'lucide-react';
import './CardHabitacion.css';

const CardHabitacion = ({ 
  imagen, 
  titulo, 
  subtitulo,
  descripcion, 
  precio, 
  capacidad,
  amenidades = [],
  rating,
  metros,
  popular = false,
  id 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleReservar = () => {
    console.log(`Reservar habitación: ${titulo}`);
    // Aquí iría la lógica de reserva
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`card-habitacion ${popular ? 'popular' : ''}`}>
      {popular && (
        <div className="popular-badge">
          <Star size={12} />
          <span>Más Popular</span>
        </div>
      )}
      
      <div className="card-image-container">
        <img 
          src={imagen} 
          alt={titulo}
          className={`card-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="image-overlay">
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavorite}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <div className="image-actions">
            <button className="action-btn">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        <div className="capacity-badge">
          <Users size={14} />
          <span>{capacidad} {capacidad === 1 ? 'Persona' : 'Personas'}</span>
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <div className="rating">
            <Star size={14} fill="currentColor" />
            <span>{rating}</span>
          </div>
          <div className="room-size">
            <Maximize2 size={14} />
            <span>{metros}m²</span>
          </div>
        </div>

        <div className="card-titles">
          <h3 className="card-titulo">{titulo}</h3>
          <span className="card-subtitulo">{subtitulo}</span>
        </div>
        
        {descripcion && (
          <p className="card-descripcion">{descripcion}</p>
        )}

        <div className="amenidades">
          {amenidades.slice(0, 3).map((amenidad, index) => (
            <span key={index} className="amenidad-tag">
              {amenidad}
            </span>
          ))}
          {amenidades.length > 3 && (
            <span className="amenidad-tag more">
              +{amenidades.length - 3} más
            </span>
          )}
        </div>
        
        <div className="card-footer">
          <div className="precio-container">
            <span className="precio-desde">Desde</span>
            <div className="precio-main">
              <span className="precio-valor">${precio}</span>
              <span className="precio-periodo">COP/noche</span>
            </div>
          </div>
          
          <button className="btn-reservar" onClick={handleReservar}>
            <span>Reservar</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHabitacion;