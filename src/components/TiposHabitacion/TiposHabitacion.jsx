import React, { useState } from 'react';
import { Wifi, Coffee, Bath, Bed, Users, Star, ArrowRight, Eye } from 'lucide-react';
import CardHabitacion from '../CardHabitacion/CardHabitacion';
import './TiposHabitacion.css';

const TiposHabitacion = () => {
  const [activeFilter, setActiveFilter] = useState('todas');

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

  return (
    <section className="tipos-habitacion" id="habitaciones">
      <div className="container">
        {/* Header de la sección */}
        <div className="section-header">
          <div className="section-badge">
            <Star size={16} />
            <span>Experiencias de Lujo</span>
          </div>
          
          <h2 className="section-title">
            Nuestras <span className="highlight">Suites</span>
          </h2>
          
          <p className="section-subtitle">
            Cada habitación está cuidadosamente diseñada para ofrecerte el máximo confort 
            y una experiencia única en el corazón del eje cafetero colombiano.
          </p>
        </div>

        {/* Filtros */}
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

        {/* Grid de habitaciones */}
        <div className="habitaciones-grid">
          {habitacionesFiltradas.map((habitacion) => (
            <CardHabitacion
              key={habitacion.id}
              {...habitacion}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="section-cta">
          <div className="cta-content">
            <h3>¿Necesitas ayuda para elegir?</h3>
            <p>Nuestro equipo está disponible 24/7 para ayudarte a encontrar la suite perfecta</p>
            <div className="cta-buttons">
              <button 
  className="btn-primary"
  onClick={() => {
    const telefono = "573233212051";
    const mensaje = encodeURIComponent("Hola, necesito ayuda para elegir una suite perfecta");
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }}
>
  <span>Contactar Asesor</span>
  <ArrowRight size={18} />
</button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiposHabitacion;