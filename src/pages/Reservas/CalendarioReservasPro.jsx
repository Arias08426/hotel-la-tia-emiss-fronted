import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  ArrowLeft, ArrowRight, CalendarDays, Loader, X, Filter, Search, Info, RefreshCcw
} from 'lucide-react';
import ApiService from '../../components/Servicios/ApiService';
import './CalendarioReservasPro.css';

/* ------------------ Utilidades de fecha ------------------ */
const today = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const addMonths = (d, m) => new Date(d.getFullYear(), d.getMonth() + m, 1);

const buildDaysArray = (baseDate) => {
  const first = startOfMonth(baseDate);
  const last = endOfMonth(baseDate);
  const arr = [];
  for (let dt = new Date(first); dt <= last; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

/*
  Regla de ocupación:
  Un booking ocupa la noche de cada día D mientras (checkIn <= D < checkOut).
  Día de check-out se considera ya libre para nueva entrada.
*/

const CalendarioReservasPro = () => {
  /* ------------ Estados ------------ */
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState('');

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailAnchor, setDetailAnchor] = useState(null); // coords para panel flotante

  /* ------------ Carga de datos ------------ */
  const loadRooms = async () => {
    try {
      setLoadingRooms(true);
      const resp = await ApiService.getAllRooms();
      const list = Array.isArray(resp) ? resp : (resp?.roomList || []);
      setRooms(list);
      // Tipos únicos
      const uniques = [...new Set(list.map(r => r.roomType).filter(Boolean))];
      setRoomTypes(uniques);
    } catch (err) {
      setError('Error cargando habitaciones: ' + err.message);
    } finally {
      setLoadingRooms(false);
    }
  };

  const loadBookings = async () => {
    try {
      setLoadingBookings(true);
      setError('');
      // Opción A (rápida): traer todas y filtrar por mes
      const resp = await ApiService.getAllBookings();
      const list = resp?.bookingList || [];
      // Filtrar solape con mes actual
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);

      const filtered = list.filter(b => {
        const ci = new Date(b.checkInDate);
        const co = new Date(b.checkOutDate);
        return ci <= monthEnd && co >= monthStart;
      });
      setBookings(filtered);
    } catch (err) {
      setError('Error cargando reservas: ' + err.message);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => { loadRooms(); }, []);
  useEffect(() => { loadBookings(); }, [currentMonth]);

  /* ------------ Días del mes ------------ */
  const days = useMemo(() => buildDaysArray(currentMonth), [currentMonth]);

  /* ------------ Mapa de ocupación ------------ */
  /*
     Estructura: occupancyMap[roomId][YYYY-MM-DD] = {
        status: 'occupied' | 'checkin' | 'checkout' | 'range',
        booking
     }
     - 'checkin' marcar el día de llegada (también es noche ocupada)
     - 'checkout' se muestra como libre (por regla D < checkOut) pero podemos marcar si quieres. Aquí lo dejo visible como “salida”.
  */
  const occupancyMap = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      const rId = b.room?.id || b.roomId;
      if (!rId) return;
      if (!map[rId]) map[rId] = {};
      const ci = new Date(b.checkInDate);
      const co = new Date(b.checkOutDate); // no se ocupa co
      for (let d = new Date(ci); d < co; d.setDate(d.getDate() + 1)) {
        const key = toISO(d);
        map[rId][key] = {
          status: 'occupied',
          booking: b
        };
      }
      // Marcar específicamente el día de check-in (para diferenciar color si deseas)
      const ciKey = toISO(ci);
      if (map[rId][ciKey]) {
        map[rId][ciKey].status = 'checkin';
      }
      // Día de checkout lo dejamos libre, pero si quieres mostrarlo:
      // const checkoutKey = toISO(co);
      // map[rId][checkoutKey] = { status: 'checkout', booking: b };
    });
    return map;
  }, [bookings]);

  /* ------------ Filtrado de habitaciones ------------ */
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(r => filterType === 'all' || (r.roomType || '').toLowerCase() === filterType.toLowerCase())
      .filter(r => {
        if (!searchTerm.trim()) return true;
        return (r.roomType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
               (r.roomDescription || '').toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => (a.roomType || '').localeCompare(b.roomType || ''));
  }, [rooms, filterType, searchTerm]);

  /* ------------ Colores por estado ------------ */
  const statusClass = (room, day) => {
    const rId = room.id || room.roomId;
    const key = toISO(day);
    const entry = occupancyMap[rId]?.[key];
    if (!entry) return 'free';
    if (entry.status === 'checkin') return 'checkin';
    if (entry.status === 'occupied') return 'occupied';
    if (entry.status === 'checkout') return 'checkout';
    return 'occupied';
  };

  const handleDayClick = (room, day) => {
    const rId = room.id || room.roomId;
    const key = toISO(day);
    const entry = occupancyMap[rId]?.[key];
    if (!entry) {
      setSelectedBooking(null);
      return;
    }
    setSelectedBooking({
      ...entry.booking,
      roomLabel: room.roomType,
      day: key
    });
    // Para posicionar un panel flotante (o simplemente usamos panel lateral)
    setDetailAnchor({ x: window.innerWidth - 380, y: 150 });
  };

  const closeDetail = () => {
    setSelectedBooking(null);
    setDetailAnchor(null);
  };

  /* ------------ Navegación de mes ------------ */
  const goPrev = () => setCurrentMonth(m => addMonths(m, -1));
  const goNext = () => setCurrentMonth(m => addMonths(m, 1));
  const goToday = () => setCurrentMonth(startOfMonth(new Date()));

  /* ------------ Render ------------ */
  return (
    <div className="calpro-page">
      <header className="calpro-hero">
        <div className="calpro-hero-inner">
          <div className="hero-left">
            <h1>
              Disponibilidad <span className="accent">
              {currentMonth.toLocaleDateString('es-ES', { month: 'long' })}</span> {currentMonth.getFullYear()}
            </h1>
            <p>Visualiza y gestiona las reservas por habitación. Colores indican ocupación nocturna.</p>

            <div className="month-controls">
              <button onClick={goPrev} aria-label="Mes anterior"><ArrowLeft size={18} /></button>
              <button onClick={goToday} className="today-btn">Hoy</button>
              <button onClick={goNext} aria-label="Mes siguiente"><ArrowRight size={18} /></button>
            </div>
          </div>
          <div className="hero-right">
            <div className="filters-row">
              <div className="select-wrapper">
                <Filter size={14} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Todos los tipos</option>
                  {roomTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="search-wrapper">
                <Search size={14} />
                <input
                  type="text"
                  placeholder="Buscar habitación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpiar"
                  >
                    <X size={14}/>
                  </button>
                )}
              </div>
              <button
                className="reload-btn"
                onClick={() => loadBookings()}
                disabled={loadingBookings}
              >
                <RefreshCcw size={14} />
                {loadingBookings ? 'Actualizando...' : 'Actualizar'}
              </button>
              <a className="back-reservas" href="/reservas">
                <CalendarDays size={14} /> Volver a Reservas
              </a>
            </div>
            <div className="legend-bar">
              <span><span className="legend-dot free"></span> Libre</span>
              <span><span className="legend-dot checkin"></span> Check-in</span>
              <span><span className="legend-dot occupied"></span> Ocupado</span>
              <span><span className="legend-dot checkout"></span> (Checkout) Libre</span>
            </div>
          </div>
        </div>
      </header>

      {error && <div className="calpro-error">{error}</div>}
      {(loadingRooms || loadingBookings) && (
        <div className="calpro-loading">
          <Loader className="spinner" /> Cargando datos...
        </div>
      )}

      <div className="calpro-scroll-wrapper">
        <table className="calpro-table">
          <thead>
            <tr>
              <th className="sticky-col room-col">Habitación</th>
              {days.map(d => (
                <th key={d.toISOString()}>
                  <div className="day-head">
                    <span className="day-num">{d.getDate()}</span>
                    <span className="day-short">
                      {d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRooms.length === 0 && (
              <tr>
                <td colSpan={days.length + 1} className="no-rooms">
                  No hay habitaciones que coincidan con el filtro.
                </td>
              </tr>
            )}
            {filteredRooms.map(room => (
              <tr key={room.id || room.roomId}>
                <td className="sticky-col room-cell">
                  <div className="room-info">
                    <div className="room-type">{room.roomType}</div>
                    <div className="room-sub">
                      {room.roomDescription?.slice(0, 40) || ''}{room.roomDescription?.length > 40 ? '…' : ''}
                    </div>
                  </div>
                </td>
                {days.map(d => {
                  const cls = statusClass(room, d);
                  const key = toISO(d);
                  const booking = (occupancyMap[room.id || room.roomId] || {})[key]?.booking;
                  return (
                    <td
                      key={key}
                      className={`day-cell status-${cls}`}
                      onClick={() => handleDayClick(room, d)}
                      title={
                        booking
                          ? `Ocupado (${booking.bookingConfirmationCode})\n${booking.user?.name || ''}`
                          : 'Disponible'
                      }
                    >
                      <div className="cell-indicator"/>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-hint">
        <Info size={16} />
        <p>
          Las noches marcadas coinciden con el intervalo de la reserva (check-in inclusive, check-out exclusivo). 
          No se permite superposición en backend (ver validación recomendada).
        </p>
      </div>

      {selectedBooking && (
        <div className="booking-detail-panel">
          <div className="detail-header">
            <h3>Detalle Reserva</h3>
            <button onClick={closeDetail}><X size={18} /></button>
          </div>
            <div className="detail-body">
              <p><strong>Código:</strong> {selectedBooking.bookingConfirmationCode}</p>
              <p><strong>Habitación:</strong> {selectedBooking.roomLabel}</p>
              <p>
                <strong>Check-in:</strong> {new Date(selectedBooking.checkInDate).toLocaleDateString('es-CO')}<br/>
                <strong>Check-out:</strong> {new Date(selectedBooking.checkOutDate).toLocaleDateString('es-CO')}
              </p>
              <p>
                <strong>Huésped:</strong> {selectedBooking.user?.name || '—'}<br/>
                <strong>Email:</strong> {selectedBooking.user?.email || '—'}
              </p>
              <p><strong>No. Huéspedes:</strong> {(selectedBooking.numOfAdults || 0) + (selectedBooking.numOfChildren || 0)}</p>
              <div className="detail-footer">
                <button onClick={closeDetail}>Cerrar</button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioReservasPro;