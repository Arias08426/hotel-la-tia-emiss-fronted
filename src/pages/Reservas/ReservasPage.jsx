import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft, Users, Wifi, Coffee, Bath, X, Check,
  Loader, LogIn, Search, Trash2, Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import ApiService from "../../components/Servicios/ApiService";
import './ReservasPage.css';

/* ======================= MODAL: BUSCAR RESERVA ======================= */
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
      if (result?.statusCode === 200 && result.booking) {
        setSearchResult(result.booking);
      } else {
        setError(result?.message || 'Reserva no encontrada');
        setSearchResult(null);
      }
    } catch (err) {
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

        {error && <div className="error-message"><p>{error}</p></div>}

        {searchResult && (
          <div className="search-result">
            <h4>Reserva Encontrada</h4>
            <div className="booking-details">
              <p><strong>Código:</strong> {searchResult.bookingConfirmationCode}</p>
              <p><strong>Habitación:</strong> {searchResult.room?.roomType}</p>
              <p><strong>Check-in:</strong> {new Date(searchResult.checkInDate).toLocaleDateString('es-CO')}</p>
              <p><strong>Check-out:</strong> {new Date(searchResult.checkOutDate).toLocaleDateString('es-CO')}</p>
              <p><strong>Huéspedes:</strong> {(searchResult.numOfAdults || 0) + (searchResult.numOfChildren || 0)}</p>
              <p><strong>Cliente:</strong> {searchResult.user?.name}</p>
              <p><strong>Email:</strong> {searchResult.user?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ======================= MODAL: TODAS LAS RESERVAS (ADMIN) ======================= */
const AllBookingsModal = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (isOpen) loadAllBookings(); }, [isOpen]);

  const loadAllBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await ApiService.getAllBookings();
      if (result?.statusCode === 200) {
        setBookings(result.bookingList || []);
      } else {
        setError(result?.message || 'Error cargando reservas');
      }
    } catch (err) {
      setError('Error cargando reservas: ' + (err.message || 'Desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('¿Seguro de cancelar esta reserva?')) return;
    try {
      const result = await ApiService.cancelBooking(bookingId);
      if (result?.statusCode === 200) {
        alert('Reserva cancelada');
        loadAllBookings();
      } else {
        alert(result?.message || 'Error cancelando reserva');
      }
    } catch (err) {
      alert('Error cancelando reserva: ' + err.message);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content bookings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Todas las Reservas</h3>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
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
              {bookings.length === 0
                ? <p>No hay reservas registradas</p>
                : bookings.map(b => (
                  <div key={b.id} className="booking-card">
                    <div className="booking-info">
                      <h4>#{b.bookingConfirmationCode}</h4>
                      <p><strong>Habitación:</strong> {b.room?.roomType}</p>
                      <p><strong>Cliente:</strong> {b.user?.name} ({b.user?.email})</p>
                      <p><strong>Fechas:</strong> {new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}</p>
                      <p><strong>Huéspedes:</strong> {b.totalNumOfGuest || (b.numOfAdults || 0) + (b.numOfChildren || 0)}</p>
                    </div>
                    <div className="booking-actions">
                      <button className="cancel-btn" title="Cancelar" onClick={() => handleCancelBooking(b.id)}>
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
        )}
      </div>
    </div>
  );
};

/* ======================= MODAL: RESERVA (Formulario Único) ======================= */
const ModalReserva = ({ isOpen, onClose, habitacion }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    comentarios: ''
  });

  const [availabilityStatus, setAvailabilityStatus] = useState('idle'); // idle | checking | ok | not | error
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reservationResult, setReservationResult] = useState(null);

  const allowProceedOnAvailabilityError = true; // si el endpoint falla, permitir reservar

  useEffect(() => {
    if (isOpen && habitacion) {
      const splitName = isAuthenticated ? (user?.name || '').trim().split(' ') : [];
      setFormData({
        nombre: splitName[0] || '',
        apellido: splitName.slice(1).join(' ') || '',
        email: isAuthenticated ? (user?.email || '') : '',
        telefono: isAuthenticated ? (user?.phoneNumber || '') : '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        comentarios: ''
      });
      setAvailabilityStatus('idle');
      setTotalNights(0);
      setTotalPrice(0);
      setReservationResult(null);
    }
  }, [isOpen, habitacion, isAuthenticated, user]);

  const formatCOP = (val) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const diffDays = (ci, co) => {
    const a = new Date(ci);
    const b = new Date(co);
    return Math.round((b - a) / 86400000);
  };

  const checkAvailability = useCallback(async (ci, co) => {
    if (!ci || !co || !habitacion) { setAvailabilityStatus('idle'); return; }
    const d = diffDays(ci, co);
    if (d <= 0) { setAvailabilityStatus('idle'); setTotalNights(0); setTotalPrice(0); return; }

    setTotalNights(d);
    const nightly = parseFloat(
      habitacion.roomPrice ||
      habitacion.precio?.replace(/[,\.]/g, '') ||
      '0'
    );
    setTotalPrice(d * nightly);

    try {
      setAvailabilityStatus('checking');
      const resp = await ApiService.checkRoomAvailability({
        checkInDate: ci,
        checkOutDate: co,
        roomType: habitacion.roomType || habitacion.titulo
      });

      if (resp?.statusCode === 200 && Array.isArray(resp.roomList)) {
        const found = resp.roomList.some(r =>
          (r.id || r.roomId) === (habitacion.id || habitacion.roomId)
        );
        setAvailabilityStatus(found ? 'ok' : 'not');
      } else {
        setAvailabilityStatus('error');
      }
    } catch {
      setAvailabilityStatus('error');
    }
  }, [habitacion]);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      checkAvailability(formData.checkIn, formData.checkOut);
    }
  }, [formData.checkIn, formData.checkOut, checkAvailability]);

  const canSubmit =
    formData.nombre.trim() &&
    formData.apellido.trim() &&
    formData.email.trim() &&
    formData.telefono.trim() &&
    formData.checkIn &&
    formData.checkOut &&
    totalNights > 0 &&
    (
      availabilityStatus === 'ok' ||
      (availabilityStatus === 'error' && allowProceedOnAvailabilityError)
    ) &&
    availabilityStatus !== 'not';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (!isAuthenticated) {
      alert("Debes iniciar sesión para reservar (tu backend actual requiere userId).");
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      const bookingPayload = {
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        guests: formData.guests,
        numOfAdults: formData.guests,
        numOfChildren: 0,
        totalPrice: totalPrice
        // Si amplías backend, aquí podrías incluir nombre/apellido/telefono
      };

      const res = await ApiService.createBooking(
        (habitacion.id || habitacion.roomId),
        user.id,
        bookingPayload
      );

      if (res?.statusCode === 200) {
        setReservationResult({
          success: true,
          code: res.bookingConfirmationCode || res.booking?.bookingConfirmationCode,
          message: res.message || 'Reserva creada exitosamente'
        });
      } else {
        throw new Error(res?.message || 'Error creando reserva');
      }
    } catch (err) {
      setReservationResult({
        success: false,
        message: err.message || 'No se pudo crear la reserva'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !habitacion) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content full-form" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{habitacion.roomType || habitacion.titulo}</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {reservationResult ? (
          <div className="confirmation-step">
            <h3>{reservationResult.success ? '¡Reserva Confirmada!' : 'Error en la Reserva'}</h3>
            <p>{reservationResult.message}</p>
            {reservationResult.success && reservationResult.code && (
              <div className="confirmation-details">
                <p><strong>Código de confirmación:</strong> {reservationResult.code}</p>
                <p className="confirmation-note">Guarda este código para buscar tu reserva.</p>
              </div>
            )}
            <button className="close-success-btn" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form className="booking-full-form" onSubmit={handleSubmit}>
            <div className="two-columns">
              <div className="left-side">
                <div className="form-section">
                  <h4>Datos del Huésped</h4>
                  <div className="grid-2">
                    <div className="input-group">
                      <label>Nombre</label>
                      <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Apellido</label>
                      <input
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Teléfono</label>
                      <input
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        pattern="^[0-9+()\\s-]{6,}$"
                        title="Formato inválido"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Comentarios (opcional)</label>
                    <textarea
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Ej: Llegaré tarde..."
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4>Fechas y Huéspedes</h4>
                  <div className="grid-2">
                    <div className="input-group">
                      <label>Check-in</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(f => {
                            let co = f.checkOut;
                            if (co && diffDays(val, co) <= 0) {
                              const d = new Date(val);
                              d.setDate(d.getDate() + 1);
                              co = d.toISOString().split('T')[0];
                            }
                            return { ...f, checkIn: val, checkOut: co };
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Check-out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        min={
                          formData.checkIn
                            ? (() => {
                                const d = new Date(formData.checkIn);
                                d.setDate(d.getDate() + 1);
                                return d.toISOString().split('T')[0];
                              })()
                            : new Date().toISOString().split('T')[0]
                        }
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Huéspedes</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                    >
                      {[...Array(6)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'persona' : 'personas'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="availability-wrapper">
                    {availabilityStatus === 'checking' && <p className="warn">Verificando disponibilidad...</p>}
                    {availabilityStatus === 'ok' && <p className="ok">✔ Habitación disponible</p>}
                    {availabilityStatus === 'not' && <p className="bad">✖ No disponible</p>}
                    {availabilityStatus === 'error' && allowProceedOnAvailabilityError && (
                      <p className="warn">No se pudo verificar, puedes continuar.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="right-side">
                <div className="summary-box">
                  <h4>Resumen</h4>
                  <p><strong>Habitación:</strong> {habitacion.roomType || habitacion.titulo}</p>
                  <p><strong>Precio noche:</strong> {formatCOP(parseFloat(
                    habitacion.roomPrice ||
                    habitacion.precio?.replace(/[,\.]/g, '') ||
                    '0'
                  ))}</p>
                  <p><strong>Noches:</strong> {totalNights > 0 ? totalNights : '-'}</p>
                  <p><strong>Total:</strong> {totalNights > 0 ? formatCOP(totalPrice) : '-'}</p>

                  {!isAuthenticated && (
                    <div className="guest-hint">
                      Debes iniciar sesión para confirmar (tu backend requiere userId).
                    </div>
                  )}

                  <button
                    type="submit"
                    className="submit-btn full"
                    disabled={!canSubmit || submitting}
                  >
                    {submitting ? 'Procesando...' : 'Confirmar Reserva'}
                  </button>
                  <button
                    type="button"
                    className="secondary-btn full"
                    onClick={onClose}
                    disabled={submitting}
                    style={{ marginTop: '.6rem' }}
                  >
                    Cancelar
                  </button>

                  {!canSubmit && (
                    <div className="small-note">
                      Completa todos los datos y selecciona fechas válidas.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

/* ======================= UTIL CAPACIDAD ======================= */
const getCapacityFromRoomType = (roomType) => {
  const t = (roomType || '').toLowerCase();
  if (t.includes('cuadruple')) return 8;
  if (t.includes('triple')) return 6;
  if (t.includes('doble') || t.includes('twin')) return 4;
  if (t.includes('sencilla') || t.includes('single')) return 2;
  return 2;
};

/* ======================= PAGE PRINCIPAL ======================= */
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
    checkOut: '',
    roomType: 'all'
  });

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRoomTypes, setLoadingRoomTypes] = useState(false);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState(false);

  const loadRoomTypes = async () => {
    try {
      setLoadingRoomTypes(true);
      const types = await ApiService.getRoomTypes();
      if (Array.isArray(types)) setRoomTypes(types);
    } catch (err) {
      console.warn('No se pudieron cargar tipos de habitación:', err.message);
    } finally {
      setLoadingRoomTypes(false);
    }
  };

  const loadRoomsFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getAllRooms();
      const list = Array.isArray(response)
        ? response
        : (Array.isArray(response?.roomList) ? response.roomList : []);
      if (!Array.isArray(list)) throw new Error('Formato de respuesta inesperado');

      const mapped = list.map(room => ({
        ...room,
        titulo: room.roomType,
        precio: room.roomPrice?.toString() || '0',
        imagen: room.roomPhotoUrl,
        capacidad: getCapacityFromRoomType(room.roomType),
        descripcion: room.roomDescription,
      }));
      setRooms(mapped);
      setFilteredRooms(mapped);
    } catch (err) {
      let msg = 'Error cargando habitaciones';
      if (err.message === 'Network Error') msg += ': no se pudo contactar el servidor.';
      else msg += ': ' + err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const applyLocalFilters = (baseRooms) => {
    let result = [...baseRooms];
    if (filters.guests !== 'all') {
      const g = parseInt(filters.guests, 10);
      if (!isNaN(g)) {
        result = result.filter(r => (r.capacidad || getCapacityFromRoomType(r.roomType)) >= g);
      }
    }
    result = result.filter(r => {
      const raw = parseFloat(r.roomPrice || r.precio?.replace(/[,\.]/g, '') || '0');
      if (filters.priceRange === 'low') return raw <= 200000;
      if (filters.priceRange === 'medium') return raw >= 200000 && raw <= 300000;
      if (filters.priceRange === 'high') return raw > 300000;
      return true;
    });
    if (filters.roomType !== 'all' && (!filters.checkIn || !filters.checkOut)) {
      result = result.filter(r => (r.roomType || '').toLowerCase() === filters.roomType.toLowerCase());
    }
    setFilteredRooms(result);
  };

  const searchRoomsWithDates = async () => {
    if (!filters.checkIn || !filters.checkOut) {
      applyLocalFilters(rooms);
      setSearchMode(false);
      return;
    }
    if (filters.roomType === 'all') {
      applyLocalFilters(rooms);
      setSearchMode(false);
      return;
    }
    try {
      setLoading(true);
      const res = await ApiService.searchAvailableRooms({
        checkInDate: filters.checkIn,
        checkOutDate: filters.checkOut,
        roomType: filters.roomType
      });
      const list = Array.isArray(res)
        ? res
        : (Array.isArray(res?.roomList) ? res.roomList : []);
      const mapped = list.map(room => ({
        ...room,
        titulo: room.roomType,
        precio: room.roomPrice?.toString() || '0',
        imagen: room.roomPhotoUrl,
        capacidad: getCapacityFromRoomType(room.roomType),
        descripcion: room.roomDescription
      }));
      applyLocalFilters(mapped);
      setSearchMode(true);
    } catch {
      applyLocalFilters(rooms);
      setSearchMode(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoomsFromBackend();
    loadRoomTypes();
  }, []);

  useEffect(() => {
    if (rooms.length === 0) return;
    if (filters.checkIn || filters.checkOut) {
      const t = setTimeout(() => searchRoomsWithDates(), 300);
      return () => clearTimeout(t);
    } else {
      applyLocalFilters(rooms);
    }
  }, [filters, rooms]); // eslint-disable-line

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const formatPriceNumber = (price) =>
    new Intl.NumberFormat('es-CO').format(parseFloat(price || '0'));

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
        <section className="reservas-hero">
          <div className="hero-content">
            <a href="/" className="back-link">
              <ArrowLeft size={16} /> Volver al inicio
            </a>
            <h1>Nuestras Habitaciones</h1>
            <p>Descubre el espacio perfecto para tu estadía en el Hotel La Tía Emiss, Salento.</p>

            <div className="user-actions">
              {isAuthenticated ? (
                <div className="user-info">
                  <span>Bienvenido, {user.name}</span>
                  {isAdmin && typeof isAdmin === 'function' && isAdmin() && (
                    <button
                      className="admin-btn"
                      onClick={() => setAllBookingsModalOpen(true)}
                    >
                      <Eye size={16} /> Ver todas las reservas
                    </button>
                  )}
                </div>
              ) : (
                <div className="auth-prompt">
                  <p>Inicia sesión para hacer reservas</p>
                  <a href="/login" className="login-link">
                    <LogIn size={16} /> Iniciar Sesión
                  </a>
                </div>
              )}

              <button
                className="search-booking-btn"
                onClick={() => setSearchModalOpen(true)}
              >
                <Search size={16} /> Buscar Reserva
              </button>
            </div>
          </div>
        </section>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadRoomsFromBackend}>Reintentar</button>
          </div>
        )}

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

              <div className="filter-group">
                <label>Tipo Habitación</label>
                <select
                  value={filters.roomType}
                  onChange={(e) => handleFilterChange('roomType', e.target.value)}
                  disabled={loadingRoomTypes}
                >
                  <option value="all">Todas</option>
                  {roomTypes.map(rt => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="results-count">
              {loading && <Loader size={16} className="spinner inline" />}
              {filteredRooms.length} habitación{filteredRooms.length !== 1 ? 'es' : ''} {searchMode ? 'disponible' : 'encontrada'}{filteredRooms.length !== 1 ? 's' : ''}
              {filters.checkIn && filters.checkOut && <span> para las fechas seleccionadas</span>}
            </div>
          </div>
        </section>

        <section className="rooms-list">
          {filteredRooms.length === 0 && !loading ? (
            <div className="no-results">
              <h3>No se encontraron habitaciones</h3>
              <p>
                {searchMode
                  ? 'No hay habitaciones disponibles para las fechas / filtros.'
                  : 'Ajusta los filtros para ver más opciones.'}
              </p>
              <button onClick={() => {
                setFilters({
                  guests: 'all',
                  priceRange: 'all',
                  amenities: 'all',
                  checkIn: '',
                  checkOut: '',
                  roomType: 'all'
                });
              }}>Limpiar filtros</button>
            </div>
          ) : (
            filteredRooms.map(room => (
              <div key={room.id || room.roomId} className="room-card">
                <div className="room-image">
                  <img
                    src={room.roomPhotoUrl || room.imagen || '/default-room.jpg'}
                    alt={room.roomType || room.titulo}
                    onError={(e) => { e.target.src = '/default-room.jpg'; }}
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
                      <span>{room.capacidad || getCapacityFromRoomType(room.roomType || room.titulo)} personas</span>
                    </div>
                    <div className="feature"><Wifi size={16} /><span>WiFi Gratuito</span></div>
                    <div className="feature"><Bath size={16} /><span>Baño Privado</span></div>
                    <div className="feature"><Coffee size={16} /><span>Amenidades</span></div>
                  </div>

                  <div className="room-footer">
                    <div className="price-info">
                      <div className="price">
                        ${formatPriceNumber(room.roomPrice || room.precio?.replace(/[,\.]/g, '') || '0')}
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

      <ModalReserva
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        habitacion={selectedRoom}
      />
      <BookingSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      {isAdmin && typeof isAdmin === 'function' && isAdmin() && (
        <AllBookingsModal
          isOpen={allBookingsModalOpen}
          onClose={() => setAllBookingsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReservasPage;