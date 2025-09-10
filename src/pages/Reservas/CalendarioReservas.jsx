import React, { useEffect, useState, useMemo } from 'react';
import ApiService from '../../components/Servicios/ApiService';
import { ArrowLeft, ArrowRight, Loader, Info } from 'lucide-react';
import './CalendarioReservas.css';

const TODAY = new Date();

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const formatISO = (d) => d.toISOString().split('T')[0];

const eachDayArray = (year, month) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const arr = [];
  for (let day = first.getDate(); day <= last.getDate(); day++) {
    arr.push(new Date(year, month, day));
  }
  return arr;
};

// Determina si un día está dentro de una reserva (checkIn <= day < checkOut)
const isDayOccupied = (day, booking) => {
  const dayTime = day.getTime();
  const inTime = new Date(booking.checkInDate).getTime();
  const outTime = new Date(booking.checkOutDate).getTime();
  return dayTime >= inTime && dayTime < outTime;
};

const CalendarioReservas = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState('');

  const daysInMonth = useMemo(() => {
    return eachDayArray(currentMonth.getFullYear(), currentMonth.getMonth());
  }, [currentMonth]);

  // Si quieres limitar rango a mes actual + maybe un buffer
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.getAllRooms();
      const list = Array.isArray(resp) ? resp : (resp?.roomList || []);
      setRooms(list);
    } catch (err) {
      setError('Error cargando habitaciones: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      setError('');
      // Rango del mes
      const start = formatISO(startOfMonth(currentMonth));
      const end = formatISO(endOfMonth(currentMonth));
      // Si tienes endpoint por rango, úsalo aquí:
      // const resp = await ApiService.getBookingsByRange(start, end);
      // const list = resp?.bookingList || [];
      // Temporal: traer todas y filtrar
      const respAll = await ApiService.getAllBookings();
      const listAll = respAll?.bookingList || [];
      const list = listAll.filter(b => {
        const bStart = new Date(b.checkInDate);
        const bEnd = new Date(b.checkOutDate);
        // Solape con el mes actual
        return bStart <= endOfMonth(currentMonth) && bEnd >= startOfMonth(currentMonth);
      });
      setBookings(list);
    } catch (err) {
      setError('Error cargando reservas: ' + err.message);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [currentMonth]);

  const nextMonth = () => {
    setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  };

  const getRoomDayStatus = (room, day) => {
    // Busca reservas de esa habitación
    const roomBookings = bookings.filter(b => (b.room?.id || b.roomId) === (room.id || room.roomId));
    for (const bk of roomBookings) {
      if (isDayOccupied(day, bk)) {
        return { status: 'ocupado', booking: bk };
      }
    }
    return { status: 'libre', booking: null };
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header-bar">
        <h1>Calendario de Reservas</h1>
        <div className="month-nav">
          <button onClick={prevMonth}><ArrowLeft size={16} /></button>
          <span className="month-label">
            {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth}><ArrowRight size={16} /></button>
        </div>
        <div className="legend">
          <span><span className="box libre"></span> Disponible</span>
          <span><span className="box ocupado"></span> Ocupado</span>
        </div>
      </div>

      {loading && <div className="loading-block"><Loader className="spinner" /> Cargando habitaciones...</div>}
      {error && <div className="error-block">{error}</div>}

      {!loading && rooms.length === 0 && (
        <p>No hay habitaciones registradas.</p>
      )}

      {!loading && rooms.length > 0 && (
        <div className="calendar-wrapper">
          <table className="availability-table">
            <thead>
              <tr>
                <th className="col-room">Habitación</th>
                {daysInMonth.map(d => (
                  <th key={d.toISOString()} className="col-day">
                    {d.getDate()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id || room.roomId}>
                  <td className="room-cell">
                    <div className="room-name">
                      {room.roomType}
                    </div>
                  </td>
                  {daysInMonth.map(d => {
                    const { status, booking } = getRoomDayStatus(room, d);
                    const classes = 'day-cell ' + (status === 'ocupado' ? 'busy' : 'free');
                    return (
                      <td
                        key={room.id + '-' + d.getDate()}
                        className={classes}
                        title={
                          status === 'ocupado'
                            ? `Ocupado: ${booking?.bookingConfirmationCode}\n${booking?.user?.name || ''}`
                            : 'Disponible'
                        }
                      >
                        {status === 'ocupado' && <span className="dot red"></span>}
                        {status === 'libre' && <span className="dot green"></span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {loadingBookings && (
            <div className="loading-overlay-small">
              <Loader size={22} className="spinner" />
              <span>Actualizando reservas...</span>
            </div>
          )}
        </div>
      )}

      <div className="info-panel">
        <Info size={16} />
        <p>
          El color rojo indica que la habitación ya está reservada para esa noche (el día de check-out no se marca
          ocupado para permitir nuevas entradas ese mismo día).
        </p>
      </div>
    </div>
  );
};

export default CalendarioReservas;