import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Info, Navigation, Coffee } from 'lucide-react';
import './Contacto.css';

const Contacto = () => {
  const [activeTab, setActiveTab] = useState('contacto');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    motivo: 'informacion'
  });
  const [enviado, setEnviado] = useState(false);

  const contactInfo = {
    direccion: 'Carrera 4 # 5-38, Salento, Quindío',
    telefono: '+57 316 4162726',
    email: 'hotellatiaemiss@gmail.com',
    horarios: {
      recepcion: '24 horas',
      checkin: '3:00 PM - 11:00 PM',
      checkout: '6:00 AM - 12:00 PM'
    }
  };

  const tabs = [
    { id: 'contacto', label: 'Contacto', icon: Phone },
    { id: 'ubicacion', label: 'Ubicación', icon: MapPin },
    { id: 'informacion', label: 'Información', icon: Info }
  ];

  const metodosContacto = [
    {
      tipo: 'WhatsApp',
      icon: MessageSquare,
      titulo: 'Chatea con nosotros',
      descripcion: 'Respuesta inmediata',
      accion: () => {
        const telefono = "573164162726";
        const mensaje = encodeURIComponent("Hola, necesito información sobre el Hotel La Tía Emiss");
        window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
      },
      color: '#25D366'
    },
    {
      tipo: 'Teléfono',
      icon: Phone,
      titulo: 'Llámanos directamente',
      descripcion: contactInfo.telefono,
      accion: () => window.open('tel:+573164162726'),
      color: '#2196F3'
    },
    {
      tipo: 'Email',
      icon: Mail,
      titulo: 'Envíanos un correo',
      descripcion: contactInfo.email,
      accion: () => window.open('mailto:hotellatiaemiss@gmail.com'),
      color: '#FF5722'
    }
  ];

  const puntosInteres = [
    { lugar: 'Plaza Principal', distancia: '50 metros', tiempo: '1 min' },
    { lugar: 'Calle Real', distancia: '30 metros', tiempo: '30 seg' },
    { lugar: 'Mirador Alto', distancia: '800 metros', tiempo: '10 min' },
    { lugar: 'Terminal de Buses', distancia: '200 metros', tiempo: '3 min' },
    { lugar: 'Valle de Cocora', distancia: '11 km', tiempo: '15 min en carro' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nombre: '', email: '', mensaje: '', motivo: 'informacion' });
    }, 3000);
  };

  const handleComoLlegar = () => {
    const direccion = encodeURIComponent('Hotel La Tía Emiss, Carrera 4 # 5-38, Salento, Quindío, Colombia');
    window.open(`https://www.google.com/maps/search/?api=1&query=${direccion}`, '_blank');
  };

  return (
    <div className="contacto-page">
      {/* Header */}
      <div className="contacto-header">
        <div className="container">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para hacer tu estadía inolvidable</p>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="tabs-container">
        <div className="container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="contacto-content">
        <div className="container">
          {activeTab === 'contacto' && (
            <div className="contacto-tab">
              <div className="contacto-grid">
                {/* Métodos de contacto */}
                <div className="metodos-contacto">
                  <h2>Formas de contactarnos</h2>
                  <div className="metodos-grid">
                    {metodosContacto.map((metodo, index) => (
                      <div key={index} className="metodo-card">
                        <div className="metodo-icon" style={{ backgroundColor: metodo.color }}>
                          <metodo.icon size={24} />
                        </div>
                        <div className="metodo-info">
                          <h3>{metodo.titulo}</h3>
                          <p>{metodo.descripcion}</p>
                          <button 
                            className="metodo-btn"
                            onClick={metodo.accion}
                            style={{ borderColor: metodo.color, color: metodo.color }}
                          >
                            Contactar por {metodo.tipo}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formulario */}
                <div className="formulario-seccion">
                  <h2>Envíanos un mensaje</h2>
                  {enviado ? (
                    <div className="mensaje-enviado">
                      <CheckCircle size={48} />
                      <h3>¡Mensaje enviado!</h3>
                      <p>Te responderemos pronto</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contacto-form">
                      <div className="form-row">
                        <input
                          type="text"
                          name="nombre"
                          placeholder="Tu nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Tu email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <select
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleInputChange}
                      >
                        <option value="informacion">Información general</option>
                        <option value="reserva">Consulta de reserva</option>
                        <option value="servicios">Servicios adicionales</option>
                        <option value="eventos">Eventos especiales</option>
                        <option value="otro">Otro motivo</option>
                      </select>
                      <textarea
                        name="mensaje"
                        placeholder="¿En qué podemos ayudarte?"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        rows="4"
                        required
                      />
                      <button type="submit" className="enviar-btn">
                        <Send size={18} />
                        Enviar mensaje
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ubicacion' && (
            <div className="ubicacion-tab">
              <div className="ubicacion-grid">
                <div className="mapa-info">
                  <h2>Nuestra ubicación</h2>
                  <div className="direccion-card">
                    <MapPin size={24} />
                    <div>
                      <h3>Hotel La Tía Emiss</h3>
                      <p>{contactInfo.direccion}</p>
                      <span>Salento, Quindío, Colombia</span>
                    </div>
                  </div>
                  
                  <button className="direcciones-btn" onClick={handleComoLlegar}>
                    <Navigation size={18} />
                    Obtener direcciones
                  </button>

                  <div className="transporte-info">
                    <h3>Cómo llegar</h3>
                    <ul>
                      <li><strong>Desde Armenia:</strong> 30 minutos en carro</li>
                      <li><strong>Desde Pereira:</strong> 45 minutos en carro</li>
                      <li><strong>Bus desde Armenia:</strong> Terminal cada 20 minutos</li>
                      <li><strong>Jeep desde Filandia:</strong> 15 minutos</li>
                    </ul>
                  </div>
                </div>

                <div className="puntos-cercanos">
                  <h2>Lugares de interés cercanos</h2>
                  <div className="puntos-lista">
                    {puntosInteres.map((punto, index) => (
                      <div key={index} className="punto-item">
                        <div className="punto-info">
                          <h4>{punto.lugar}</h4>
                          <span>{punto.distancia} • {punto.tiempo}</span>
                        </div>
                        <Coffee size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'informacion' && (
            <div className="informacion-tab">
              <div className="info-grid">
                <div className="horarios-card">
                  <Clock size={32} />
                  <h2>Horarios de atención</h2>
                  <div className="horarios-lista">
                    <div className="horario-item">
                      <span>Recepción:</span>
                      <strong>{contactInfo.horarios.recepcion}</strong>
                    </div>
                    <div className="horario-item">
                      <span>Check-in:</span>
                      <strong>{contactInfo.horarios.checkin}</strong>
                    </div>
                    <div className="horario-item">
                      <span>Check-out:</span>
                      <strong>{contactInfo.horarios.checkout}</strong>
                    </div>
                  </div>
                </div>

                <div className="servicios-card">
                  <h2>Servicios disponibles</h2>
                  <div className="servicios-lista">
                    <div className="servicio-item">
                      <CheckCircle size={20} />
                      <span>WiFi gratuito en todo el hotel</span>
                    </div>
                    <div className="servicio-item">
                      <CheckCircle size={20} />
                      <span>Desayuno continental incluido</span>
                    </div>
                    <div className="servicio-item">
                      <CheckCircle size={20} />
                      <span>Servicio de lavandería</span>
                    </div>
                    <div className="servicio-item">
                      <CheckCircle size={20} />
                      <span>Tours y actividades organizadas</span>
                    </div>
                    <div className="servicio-item">
                      <CheckCircle size={20} />
                      <span>Transporte al aeropuerto</span>
                    </div>
                    <div className="servicio-item">
                      <CheckCircle size={20} />
                      <span>Información turística</span>
                    </div>
                  </div>
                </div>

                <div className="politicas-card">
                  <h2>Políticas importantes</h2>
                  <div className="politicas-lista">
                    <div className="politica-item">
                      <h4>Cancelación</h4>
                      <p>Gratuita hasta 24 horas antes de la llegada</p>
                    </div>
                    <div className="politica-item">
                      <h4>Mascotas</h4>
                      <p>Permitidas con cargo adicional (consultar disponibilidad)</p>
                    </div>
                    <div className="politica-item">
                      <h4>Niños</h4>
                      <p>Menores de 12 años se hospedan gratis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacto;