import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../components/Servicios/ApiService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  // Verificación inicial (por si se limpió algo)
  useEffect(() => {
    // No hay token que validar, solo consistencia del objeto
    if (user && !user.email) {
      logout();
    }
  }, []);

  /* ============ AUTH ============ */

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await ApiService.registerUser(userData);
      if (response?.statusCode === 200) {
        return {
          success: true,
          message: response.message || 'Registro exitoso'
        };
      }
      return {
        success: false,
        error: response?.message || 'Error registrando usuario'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Error en registro'
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    setLoading(true);
    try {
      // 1. Login (recibe role y mensaje, tal vez no devuelve user completo)
      const response = await ApiService.loginUser(loginData);

      if (response?.statusCode !== 200) {
        return {
          success: false,
            error: response?.message || 'Credenciales inválidas'
        };
      }

      const role = response.role || 'USER';

      // 2. Obtener datos completos del usuario por email
      let fullUser = {
        email: loginData.email,
        role
      };

      try {
        const profileResp = await ApiService.getUserProfileByEmail(loginData.email);
        if (profileResp?.statusCode === 200 && profileResp.user) {
          const u = profileResp.user;
          fullUser = {
            id: u.id,
            name: u.name,
            email: u.email,
            phoneNumber: u.phoneNumber || '',
            role: u.role || role
          };
        }
      } catch (e) {
        console.warn('No se pudo obtener el perfil completo, usando datos básicos', e);
      }

      // 3. Guardar en storage
      localStorage.setItem('user', JSON.stringify(fullUser));
      localStorage.setItem('role', fullUser.role);

      setUser(fullUser);

      return {
        success: true,
        user: fullUser
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Error en login'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    ApiService.logout();
    setUser(null);
  };

  /* ============ HELPERS ============ */

  const hasRole = (r) => user?.role === r;
  const isAdmin = () => user?.role === 'ADMIN';
  const isUser = () => user?.role === 'USER';
  const getCurrentUser = () => user;

  /* ============ API WRAPPERS (opcionales) ============ */

  const api = {
    getAllRooms: () => ApiService.getAllRooms(),
    getRoomById: (id) => ApiService.getRoomById(id),
    getAllAvailableRooms: () => ApiService.getAllAvailableRooms(),
    getAvailableRoomsByDateAndType: (ci, co, type) =>
      ApiService.getAvailableRoomsByDateAndType(ci, co, type),
    getRoomTypes: () => ApiService.getRoomTypes(),

    // Bookings
    bookRoom: (roomId, userId, booking) => ApiService.bookRoom(roomId, userId, booking),
    createBooking: (roomId, userId, booking) => ApiService.createBooking(roomId, userId, booking),
    getAllBookings: () => ApiService.getAllBookings(),
    getBookingByConfirmationCode: (code) => ApiService.getBookingByConfirmationCode(code),
    getBookingByConfirmation: (code) => ApiService.getBookingByConfirmation(code),
    cancelBooking: (bookingId) => ApiService.cancelBooking(bookingId),

    // Users
    getAllUsers: () => ApiService.getAllUsers(),
    getUser: (id) => ApiService.getUser(id),
    getUserBookings: (id) => ApiService.getUserBookings(id),
    getUserProfileByEmail: (email) => ApiService.getUserProfileByEmail(email)
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    hasRole,
    isAdmin,
    isUser,
    getCurrentUser,
    ...api
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};