import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Wifi, Coffee, Bath, Star, X, Calendar, Check, ArrowRight, Loader, LogIn, Search, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import ApiService from "../../components/Servicios/ApiService";
import './ReservasPage.css';

// Componente para buscar reservas por código
const BookingSearchModal = ({ isOpen, onClose }) => {
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    try {
      setLoading(true);
      setError('');
      const result = await ApiService.getBookingByConfirmation(searchCode.trim());
      
      if (result.statusCode === 200) {
        setSearchResult(result.booking);
      } else {
        setError(result.message || 'Reserva no encontrada');
        setSearchResult(null);
      }
    } catch (error) {
      setError('Error al buscar la reserva');
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSearchCode('');
    setSearchResult(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Buscar Reserva</h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <label>Código de Confirmación</label>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Ej: HTL-1234567890"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="search-btn">
            {loading ? <Loader size={20} className="spinner" /> : <Search size={20} />}
            {loading ? 'Buscando...' : 'Buscar Reserva'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {searchResult && (
          <div className="search-result">
            <h4>Reserva Encontrada</h4>
            <div className="booking-details">
              <p><strong>Código:</strong> {searchResult.bookingConfirmationCode}</p>
              <p><strong>Habitación:</strong> {searchResult.room?.roomType}</p>
              <p><strong>Check-in:</strong> {new Date(searchResult.checkInDate).toLocaleDateString('es-CO')}</p>
              <p><strong>Check-out:</strong> {new Date(searchResult.checkOutDate).toLocaleDateString('es-CO')}</p>
              <p><strong>Huéspedes:</strong> {searchResult.numOfAdults + searchResult.numOfChildren}</p>
              <p><strong>Cliente:</strong> {searchResult.user?.name}</p>
              <p><strong>Email:</strong> {searchResult.user?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para listar todas las reservas (solo admin)
const AllBookingsModal = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadAllBookings();
    }
  }, [isOpen]);

  const loadAllBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await ApiService.getAllBookings();
      
      if (result.statusCode === 200) {
        setBookings(result.bookingList || []);
      } else {
        setError(result.message || 'Error cargando reservas');
      }
    } catch (error) {
      setError('Error cargando reservas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('¿Estás seguro de cancelar esta reserva?')) return;

    try {
      const result = await ApiService.cancelBooking(bookingId);
      if (result.statusCode === 200) {
        alert('Reserva cancelada exitosamente');
        loadAllBookings(); // Recargar lista
      } else {
        alert(result.message || 'Error cancelando reserva');
      }
    } catch (error) {
      alert('Error cancelando reserva: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content bookings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Todas las Reservas</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {loading && <div className="loading-state"><Loader className="spinner" /> Cargando reservas...</div>}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadAllBookings}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <div className="bookings-list">
            {bookings.length === 0 ? (
              <p>No hay reservas registradas</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-info">
                    <h4>Reserva #{booking.bookingConfirmationCode}</h4>
                    <p><strong>Habitación:</strong> {booking.room?.roomType}</p>
                    <p><strong>Cliente:</strong> {booking.user?.name} ({booking.user?.email})</p>
                    <p><strong>Fechas:</strong> {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    <p><strong>Huéspedes:</strong> {booking.totalNumOfGuest}</p>
                  </div>
                  <div className="booking-actions">
                    <button 
                      className="cancel-btn"
                      onClick={() => handleCancelBooking(booking.id)}
                      title="Cancelar reserva"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente ModalReserva actualizado con autenticación
const ModalReserva = ({ isOpen, onClose, habitacion }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    nombre: '',
    email: '',
    telefono: '',
    comentarios: ''
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(1);
  
  const [loading, setLoading] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isRoomAvailable, setIsRoomAvailable] = useState(true);
  const [reservationResult, setReservationResult] = useState(null);

  // Imágenes para el carrusel
  const additionalImages = [
    habitacion?.roomPhotoUrl || habitacion?.imagen,
    habitacion?.roomPhotoUrl || habitacion?.imagen,
    habitacion?.roomPhotoUrl || habitacion?.imagen,
    habitacion?.roomPhotoUrl || habitacion?.imagen
  ].filter(Boolean);

  // Resetear cuando se abra el modal
  useEffect(() => {
    if (isOpen && habitacion) {
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: 1,
        nombre: user?.name || '',
        email: user?.email || '',
        telefono: user?.phoneNumber || '',
        comentarios: ''
      });
      setStep(1);
      setCurrentImageIndex(0);
      setAvailabilityChecked(false);
      setIsRoomAvailable(true);
      setReservationResult(null);
    }
  }, [isOpen, habitacion, user]);

  // Verificar disponibilidad con el backend
  const checkRoomAvailability = async () => {
    if (!formData.checkIn || !formData.checkOut || !habitacion) return;
    
    try {
      setLoading(true);
      const availabilityData = {
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        roomType: habitacion.roomType || habitacion.titulo
      };

      const response = await ApiService.checkRoomAvailability(availabilityData);
      
      if (response.statusCode === 200 && response.roomList && response.roomList.length > 0) {
        const isAvailable = response.roomList.some(room => room.id === habitacion.id);
        setIsRoomAvailable(isAvailable);
      } else {
        setIsRoomAvailable(false);
      }
      
      setAvailabilityChecked(true);
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      setIsRoomAvailable(true);
      setAvailabilityChecked(true);
    } finally {
      setLoading(false);
    }
  };

  // Calcular noches y precio
  useEffect(() => {
    if (formData.checkIn && formData.checkOut && habitacion) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = checkOut - checkIn;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setTotalNights(diffDays);
        const pricePerNight = parseFloat(habitacion?.roomPrice || habitacion?.precio?.replace(/[,\.]/g, '') || '0');
        setTotalPrice(diffDays * pricePerNight);
        checkRoomAvailability();
      }
    }
  }, [formData.checkIn, formData.checkOut, habitacion]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar reserva al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para hacer una reserva');
      navigate('/login');
      return;
    }

    if (!isRoomAvailable) {
      alert('Esta habitación no está disponible para las fechas seleccionadas');
      return;
    }
    
    try {
      setLoading(true);
      
      const bookingData = {
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        guests: formData.guests,
        numOfAdults: formData.guests,
        numOfChildren: 0,
        totalPrice: totalPrice
      };
      
      const response = await ApiService.createBooking(habitacion.id, user.id, bookingData);
      
      if (response.statusCode === 200) {
        setReservationResult({
          success: true,
          confirmationCode: response.bookingConfirmationCode,
          message: response.message || 'Reserva creada exitosamente'
        });
        setStep(3);
      } else {
        throw new Error(response.message || 'Error al procesar la reserva');
      }
    } catch (error) {
      console.error('Error creando reserva:', error);
      setReservationResult({
        success: false,
        message: error.message || 'Error al procesar la reserva'
      });
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen || !habitacion) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading && (
          <div className="loading-overlay">
            <Loader size={24} className="spinner" />
            <span>Procesando...</span>
          </div>
        )}

        <div className="modal-header">
          <h2>{habitacion.roomType || habitacion.titulo}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="image-gallery">
              <div className="main-image">
                <img src={additionalImages[currentImageIndex]} alt={habitacion.roomType || habitacion.titulo} />
                {additionalImages.length > 1 && (
                  <>
                    <button className="gallery-btn prev" onClick={() => setCurrentImageIndex((prev) => (prev - 1 + additionalImages.length) % additionalImages.length)}>‹</button>
                    <button className="gallery-btn next" onClick={() => setCurrentImageIndex((prev) => (prev + 1) % additionalImages.length)}>›</button>
                  </>
                )}
              </div>
            </div>

            <div className="room-info">
              <div className="room-details">
                <p className="room-description-modal">
                  {habitacion.roomDescription || habitacion.descripcionDetallada || habitacion.descripcion}
                </p>
              </div>

              <div className="booking-sidebar">
                <div className="price-info-modal">
                  <div className="price-main">
                    <span className="price-modal">
                      {formatPrice(habitacion.roomPrice || parseFloat(habitacion.precio?.replace(/[,\.]/g, '') || '0'))}
                    </span>
                    <span className="period-modal">COP por noche</span>
                  </div>
                </div>

                <div className="quick-booking">
                  <div className="date-inputs">
                    <div className="input-group">
                      <label>Check-in</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Check-out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Huéspedes</label>
                    <select name="guests" value={formData.guests} onChange={handleInputChange}>
                      {[...Array(4)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'persona' : 'personas'}</option>
                      ))}
                    </select>
                  </div>

                  {formData.checkIn && formData.checkOut && availabilityChecked && (
                    <div className={`availability-status ${isRoomAvailable ? 'available' : 'unavailable'}`}>
                      {isRoomAvailable ? (
                        <div className="availability-message success">
                          <Check size={16} />
                          <span>Habitación disponible</span>
                        </div>
                      ) : (
                        <div className="availability-message error">
                          <X size={16} />
                          <span>No disponible para estas fechas</span>
                        </div>
                      )}
                    </div>
                  )}

                  {totalNights > 0 && isRoomAvailable && (
                    <div className="price-summary">
                      <div className="summary-row">
                        <span>{totalNights} {totalNights === 1 ? 'noche' : 'noches'}</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="summary-total">
                        <strong>Total: {formatPrice(totalPrice)}</strong>
                      </div>
                    </div>
                  )}

                  <button 
                    className="continue-btn"
                    onClick={() => isAuthenticated ? setStep(2) : navigate('/login')}
                    disabled={!formData.checkIn || !formData.checkOut || !availabilityChecked || (!isAuthenticated && !isRoomAvailable)}
                  >
                    {!isAuthenticated ? 'Inicia sesión para reservar' : 'Continuar Reserva'}
                    {isAuthenticated ? <ArrowRight size={18} /> : <LogIn size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && isAuthenticated && (
          <div className="booking-form">
            <h3>Confirmar Reserva</h3>
            <form onSubmit={handleSubmit}>
              <div className="reservation-summary">
                <h4>Resumen de tu reserva:</h4>
                <div className="summary-details">
                  <p><strong>{habitacion.roomType || habitacion.titulo}</strong></p>
                  <p>Check-in: {new Date(formData.checkIn).toLocaleDateString('es-CO')}</p>
                  <p>Check-out: {new Date(formData.checkOut).toLocaleDateString('es-CO')}</p>
                  <p>Huéspedes: {formData.guests}</p>
                  <p>Total: <strong>{formatPrice(totalPrice)}</strong></p>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => setStep(1)}>
                  Volver
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Procesando...' : 'Confirmar Reserva'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && reservationResult && (
          <div className="confirmation-step">
            <div className={`result-icon ${reservationResult.success ? 'success' : 'error'}`}>
              {reservationResult.success ? '✅' : '❌'}
            </div>
            <h3>{reservationResult.success ? '¡Reserva Confirmada!' : 'Error en la Reserva'}</h3>
            <p>{reservationResult.message}</p>
            {reservationResult.success && reservationResult.confirmationCode && (
              <div className="confirmation-details">
                <p><strong>Código de confirmación:</strong> {reservationResult.confirmationCode}</p>
                <p className="confirmation-note">
                  Guarda este código para futuras consultas.
                </p>
              </div>
            )}
            <button className="close-success-btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Función auxiliar para obtener capacidad
const getCapacityFromRoomType = (roomType) => {
  const type = roomType?.toLowerCase() || '';
  if (type.includes('sencilla') || type.includes('single')) return 2;
  if (type.includes('doble') || type.includes('twin')) return 4;
  if (type.includes('triple')) return 6;
  if (type.includes('cuadruple')) return 8;
  return 2;
};

// Componente principal ReservasPage con autenticación completa
const ReservasPage = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [allBookingsModalOpen, setAllBookingsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const [filters, setFilters] = useState({
    guests: 'all',
    priceRange: 'all',
    amenities: 'all',
    checkIn: '',
    checkOut: ''
  });
  
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState(false);

  // Cargar habitaciones del backend
  const loadRoomsFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.getAllRooms();
      
      if (response.statusCode === 200 && response.roomList) {
        const roomsWithCompatibility = response.roomList.map(room => ({
          ...room,
          titulo: room.roomType,
          precio: room.roomPrice?.toString() || '0',
          imagen: room.roomPhotoUrl,
          capacidad: getCapacityFromRoomType(room.roomType),
          descripcion: room.roomDescription,
        }));

        setRooms(roomsWithCompatibility);
        setFilteredRooms(roomsWithCompatibility);
      } else {
        throw new Error('No se pudieron cargar las habitaciones');
      }
    } catch (error) {
      console.error('Error cargando habitaciones:', error);
      setError('Error cargando habitaciones: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar habitaciones con fechas
  const searchRoomsWithDates = async () => {
    if (!filters.checkIn || !filters.checkOut) {
      setFilteredRooms(rooms);
      setSearchMode(false);
      return;
    }

    try {
      setLoading(true);
      const searchParams = {
        checkInDate: filters.checkIn,
        checkOutDate: filters.checkOut,
        roomType: filters.roomType !== 'all' ? filters.roomType : null
      };

      const response = await ApiService.searchAvailableRooms(searchParams);
      
      if (response.statusCode === 200 && response.roomList) {
        const availableRooms = response.roomList.map(room => ({
          ...room,
          titulo: room.roomType,
          precio: room.roomPrice?.toString() || '0',
          imagen: room.roomPhotoUrl,
          capacidad: getCapacityFromRoomType(room.roomType),
          descripcion: room.roomDescription
        }));
        
        setFilteredRooms(availableRooms);
        setSearchMode(true);
      } else {
        setFilteredRooms([]);
        setSearchMode(true);
      }
    } catch (error) {
      console.error('Error buscando habitaciones:', error);
      setFilteredRooms(rooms);
      setSearchMode(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoomsFromBackend();
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      const timeoutId = setTimeout(() => {
        searchRoomsWithDates();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [filters.checkIn, filters.checkOut, rooms]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price || '0');
    return new Intl.NumberFormat('es-CO').format(numPrice);
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="loading-page">
        <Loader size={32} className="spinner" />
        <p>Cargando habitaciones...</p>
      </div>
    );
  }

  return (
    <>
      <div className="reservas-page">
        {/* Hero Section */}
        <section className="reservas-hero">
          <div className="hero-content">
            <a href="/" className="back-link">
              <ArrowLeft size={16} />
              Volver al inicio
            </a>
            <h1>Nuestras Habitaciones</h1>
            <p>Descubre el espacio perfecto para tu estadía en el Hotel La Tía Emiss, Salento.</p>
            
            {/* Panel de usuario y acciones */}
            <div className="user-actions">
              {isAuthenticated ? (
                <div className="user-info">
                  <span>Bienvenido, {user.name}</span>
                  {isAdmin() && (
                    <button 
                      className="admin-btn"
                      onClick={() => setAllBookingsModalOpen(true)}
                    >
                      <Eye size={16} />
                      Ver todas las reservas
                    </button>
                  )}
                </div>
              ) : (
                <div className="auth-prompt">
                  <p>Inicia sesión para hacer reservas</p>
                  <a href="/login" className="login-link">
                    <LogIn size={16} />
                    Iniciar Sesión
                  </a>
                </div>
              )}
              
              <button 
                className="search-booking-btn"
                onClick={() => setSearchModalOpen(true)}
              >
                <Search size={16} />
                Buscar Reserva
              </button>
            </div>
          </div>
        </section>

        {/* Mostrar errores */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadRoomsFromBackend}>Reintentar</button>
          </div>
        )}

        {/* Filtros con fechas */}
        <section className="filters-section">
          <div className="filters-container">
            <div className="date-filters">
              <div className="filter-group">
                <label>Check-in</label>
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="filter-group">
                <label>Check-out</label>
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                  min={filters.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="additional-filters">
              <div className="filter-group">
                <label>Huéspedes</label>
                <select 
                  value={filters.guests} 
                  onChange={(e) => handleFilterChange('guests', e.target.value)}
                >
                  <option value="all">Cualquier cantidad</option>
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4+ personas</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Rango de precio</label>
                <select 
                  value={filters.priceRange} 
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="all">Todos los precios</option>
                  <option value="low">Hasta $200.000</option>
                  <option value="medium">$200.000 - $300.000</option>
                  <option value="high">Más de $300.000</option>
                </select>
              </div>
            </div>

            <div className="results-count">
              {loading && <Loader size={16} className="spinner inline" />}
              {filteredRooms.length} habitación{filteredRooms.length !== 1 ? 'es' : ''} 
              {searchMode ? ' disponible' : ' encontrada'}{filteredRooms.length !== 1 ? 's' : ''}
              {filters.checkIn && filters.checkOut && (
                <span> para las fechas seleccionadas</span>
              )}
            </div>
          </div>
        </section>

        {/* Lista de Habitaciones */}
        <section className="rooms-list">
          {filteredRooms.length === 0 && !loading ? (
            <div className="no-results">
              <h3>No se encontraron habitaciones</h3>
              <p>
                {searchMode 
                  ? 'No hay habitaciones disponibles para las fechas y filtros seleccionados.'
                  : 'Intenta ajustar tus filtros para ver más opciones disponibles.'
                }
              </p>
              <button onClick={() => {
                setFilters({
                  guests: 'all',
                  priceRange: 'all',
                  amenities: 'all',
                  checkIn: '',
                  checkOut: ''
                });
              }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-image">
                  <img 
                    src={room.roomPhotoUrl || room.imagen || '/default-room.jpg'} 
                    alt={room.roomType || room.titulo}
                    onError={(e) => {
                      e.target.src = '/default-room.jpg';
                    }}
                  />
                </div>

                <div className="room-content">
                  <div className="room-header">
                    <div className="room-title">
                      <h3>{room.roomType || room.titulo}</h3>
                      <div className="room-subtitle">Hotel La Tía Emiss</div>
                    </div>
                  </div>

                  <p className="room-description">
                    {room.roomDescription || room.descripcion || 'Habitación cómoda y acogedora con todas las amenidades necesarias para una estadía perfecta.'}
                  </p>

                  <div className="room-features">
                    <div className="feature">
                      <Users size={16} />
                      <span>
                        {room.capacidad || getCapacityFromRoomType(room.roomType || room.titulo)} 
                        {' personas'}
                      </span>
                    </div>
                    <div className="feature">
                      <Wifi size={16} />
                      <span>WiFi Gratuito</span>
                    </div>
                    <div className="feature">
                      <Bath size={16} />
                      <span>Baño Privado</span>
                    </div>
                    <div className="feature">
                      <Coffee size={16} />
                      <span>Amenidades</span>
                    </div>
                  </div>

                  <div className="room-footer">
                    <div className="price-info">
                      <div className="price">
                        ${formatPrice(room.roomPrice || room.precio?.replace(/[,\.]/g, '') || '0')}
                      </div>
                      <div className="period">COP por noche</div>
                    </div>
                    <button 
                      className="reserve-btn"
                      onClick={() => {
                        setSelectedRoom(room);
                        setModalOpen(true);
                      }}
                    >
                      Ver Detalles y Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>

      {/* Modales */}
      <ModalReserva 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        habitacion={selectedRoom}
      />

      <BookingSearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {isAdmin() && (
        <AllBookingsModal 
          isOpen={allBookingsModalOpen}
          onClose={() => setAllBookingsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReservasPage;