import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../components/Servicios/ApiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      const savedRole = localStorage.getItem('role');
      
      console.log('Verificando estado auth:', { savedToken: !!savedToken, savedUser: !!savedUser, savedRole });
      
      if (savedToken && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          console.log('Datos del usuario cargados:', userData);
          
          // Asegurar que el rol esté presente
          if (!userData.role && savedRole) {
            userData.role = savedRole;
          } else if (!userData.role) {
            userData.role = 'USER'; // Rol por defecto
          }
          
          setToken(savedToken);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (parseError) {
          console.error('Error parseando datos del usuario:', parseError);
          logout();
        }
      } else {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Función de registro usando ApiService
  const register = async (userData) => {
    try {
      setLoading(true);
      console.log('Registrando usuario con:', userData);
      
      const response = await ApiService.registerUser(userData);
      console.log('Respuesta del registro:', response);

      if (response && response.statusCode === 200) {
        return { 
          success: true, 
          message: response.message || 'Usuario registrado exitosamente' 
        };
      } else {
        throw new Error(response?.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      
      // Extraer mensaje de error más específico
      let errorMessage = 'Error al registrar usuario';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Función de login usando ApiService
  const login = async (loginData) => {
    try {
      setLoading(true);
      console.log('Intentando login con:', loginData);
      
      const response = await ApiService.loginUser(loginData);
      console.log('Respuesta completa del login:', response);

      // Verificar que la respuesta tenga la estructura correcta
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }

      if (response.statusCode === 200) {
        // Verificar que los campos esenciales estén presentes
        if (!response.token) {
          throw new Error('El servidor no devolvió un token de acceso');
        }
        
        if (!response.user) {
          throw new Error('El servidor no devolvió información del usuario');
        }

        // Crear objeto usuario con valores seguros
        const userData = {
          id: response.user.id,
          name: response.user.name || 'Usuario',
          email: response.user.email,
          phoneNumber: response.user.phoneNumber || '',
          role: response.user.role || 'USER' // Rol por defecto si no viene
        };

        console.log('Datos del usuario procesados:', userData);

        // Guardar en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role);
        
        // Actualizar estado
        setToken(response.token);
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('Login exitoso. Usuario:', userData);
        
        return { 
          success: true, 
          user: userData,
          token: response.token 
        };
      } else {
        // Manejar errores del servidor
        const errorMessage = response.message || 'Credenciales incorrectas';
        console.error('Error del servidor:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error completo en login:', error);
      
      // Extraer mensaje de error más específico
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage = 'Error en el servidor: ' + JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout usando ApiService
  const logout = () => {
    console.log('Cerrando sesión...');
    ApiService.logout();
    
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Hacer request autenticado
  const authenticatedRequest = async (endpoint, options = {}) => {
    try {
      const currentToken = localStorage.getItem('token');
      
      if (!currentToken) {
        throw new Error('No hay token de autenticación');
      }
      
      const url = `http://localhost:8080${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`,
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (response.status === 401 || response.status === 403) {
        console.warn('Token expirado, cerrando sesión');
        logout();
        throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en request autenticado:', error);
      throw error;
    }
  };

  // Verificaciones de rol con protección contra undefined
  const hasRole = (role) => {
    return user?.role === role;
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN' || ApiService.isAdmin();
  };

  const isUser = () => {
    return user?.role === 'USER' || ApiService.isUser();
  };

  const getCurrentUser = () => {
    return user;
  };

  // Métodos que delegan directamente a ApiService
  const apiMethods = {
    // Rooms
    getAllRooms: () => ApiService.getAllRooms(),
    getRoomById: (roomId) => ApiService.getRoomById(roomId),
    getAllAvailableRooms: () => ApiService.getAllAvailableRooms(),
    getAvailableRoomsByDateAndType: (checkInDate, checkOutDate, roomType) => 
      ApiService.getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType),
    getRoomTypes: () => ApiService.getRoomTypes(),
    
    // Bookings
    bookRoom: (roomId, userId, booking) => ApiService.bookRoom(roomId, userId, booking),
    getAllBookings: () => ApiService.getAllBookings(),
    getBookingByConfirmationCode: (bookingCode) => ApiService.getBookingByConfirmationCode(bookingCode),
    cancelBooking: (bookingId) => ApiService.cancelBooking(bookingId),
    
    // Users
    getAllUsers: () => ApiService.getAllUsers(),
    getUserProfile: () => ApiService.getUserProfile(),
    getUser: (userId) => ApiService.getUser(userId),
    getUserBookings: (userId) => ApiService.getUserBookings(userId),
  };

  const value = {
    // Estado de autenticación
    user,
    token,
    loading,
    isAuthenticated,
    
    // Funciones de auth
    login,
    register,
    logout,
    checkAuthStatus,
    
    // Utilidades de auth
    hasRole,
    isAdmin,
    isUser,
    getCurrentUser,
    authenticatedRequest,
    
    // Métodos de API
    ...apiMethods
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};