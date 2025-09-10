import axios from "axios";

export default class ApiService {
    // URL base corregida para tu backend
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    // Helper method para manejar errores de autenticación
    static handleAuthError(error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn('Token expirado, cerrando sesión automáticamente');
            this.logout();
            window.location.href = '/login';
        }
        throw error;
    }

    /**AUTH */

    /* This register a new user */
    static async registerUser(registration) {
        try {
            console.log('Registrando usuario:', registration);
            const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
            console.log('Respuesta registro:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en registro:', error.response?.data || error.message);
            throw error;
        }
    }

    /* This login a registered user */
    static async loginUser(loginDetails) {
        try {
            console.log('Intentando login:', loginDetails);
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            console.log('Respuesta login:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en login:', error.response?.data || error.message);
            throw error;
        }
    }

    /***USERS */

    /* This is to get all users */
    static async getAllUsers() {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/all`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This is to get the logged user profile */
    static async getUserProfile() {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This is to get a single user */
    static async getUser(userId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This is to get user bookings by the user id */
    static async getUserBookings(userId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This is to delete a user */
    static async deleteUser(userId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /**ROOM */
    /* This adds a new room to the database */
    static async addRoom(formData) {
        try {
            const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
                headers: {
                    ...this.getHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This gets all available rooms */
    static async getAllAvailableRooms() {
        try {
            console.log('Obteniendo habitaciones disponibles...');
            const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
            console.log('Habitaciones disponibles:', result.data);
            return result.data;
        } catch (error) {
            console.error('Error obteniendo habitaciones disponibles:', error);
            throw error;
        }
    }

    /* This gets all available rooms by dates and type */
    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        try {
            console.log('Buscando habitaciones:', { checkInDate, checkOutDate, roomType });
            const result = await axios.get(
                `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
            );
            console.log('Habitaciones encontradas:', result.data);
            return result.data;
        } catch (error) {
            console.error('Error obteniendo habitaciones por fecha y tipo:', error);
            throw error;
        }
    }

    /* This gets all room types from the database */
    static async getRoomTypes() {
        try {
            console.log('Obteniendo tipos de habitación...');
            const response = await axios.get(`${this.BASE_URL}/rooms/types`);
            console.log('Tipos de habitación:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo tipos de habitación:', error);
            throw error;
        }
    }

    /* This gets all rooms from the database */
    static async getAllRooms() {
        try {
            console.log('Obteniendo todas las habitaciones...');
            const result = await axios.get(`${this.BASE_URL}/rooms/all`);
            console.log('Todas las habitaciones:', result.data);
            return result.data;
        } catch (error) {
            console.error('Error obteniendo todas las habitaciones:', error);
            throw error;
        }
    }

    /* This function gets a room by the id */
    static async getRoomById(roomId) {
        try {
            console.log(`Obteniendo habitación con ID: ${roomId}`);
            const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
            console.log('Habitación encontrada:', result.data);
            return result.data;
        } catch (error) {
            console.error(`Error obteniendo habitación ${roomId}:`, error);
            throw error;
        }
    }

    /* This deletes a room by the Id */
    static async deleteRoom(roomId) {
        try {
            const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
                headers: this.getHeader()
            });
            return result.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This updates a room */
    static async updateRoom(roomId, formData) {
        try {
            const result = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
                headers: {
                    ...this.getHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /**BOOKING */
    /* This saves a new booking to the database */
    static async bookRoom(roomId, userId, booking) {
        try {
            console.log("Creando reserva:", { roomId, userId, booking });
            const response = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
                headers: this.getHeader()
            });
            console.log("Respuesta reserva:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error creando reserva:', error.response?.data || error.message);
            return this.handleAuthError(error);
        }
    }

    /* This gets all bookings from the database */
    static async getAllBookings() {
        try {
            console.log('Obteniendo todas las reservas...');
            const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
                headers: this.getHeader()
            });
            console.log('Todas las reservas:', result.data);
            return result.data;
        } catch (error) {
            return this.handleAuthError(error);
        }
    }

    /* This gets booking by the confirmation code */
    static async getBookingByConfirmationCode(bookingCode) {
        try {
            console.log(`Buscando reserva con código: ${bookingCode}`);
            const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`);
            console.log('Reserva encontrada:', result.data);
            return result.data;
        } catch (error) {
            console.error('Error obteniendo reserva por código:', error);
            throw error;
        }
    }

    /* This is to cancel user booking */
    static async cancelBooking(bookingId) {
        try {
            console.log(`Cancelando reserva: ${bookingId}`);
            const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
                headers: this.getHeader()
            });
            console.log('Reserva cancelada:', result.data);
            return result.data;
        } catch (error) {
            console.error('Error cancelando reserva:', error.response?.data || error.message);
            return this.handleAuthError(error);
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout() {
        console.log('Cerrando sesión y limpiando localStorage...');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        const isAuth = !!token;
        console.log('Usuario autenticado:', isAuth);
        return isAuth;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        const adminStatus = role === 'ADMIN';
        console.log('Es admin:', adminStatus);
        return adminStatus;
    }

    static isUser() {
        const role = localStorage.getItem('role');
        const userStatus = role === 'USER';
        console.log('Es usuario regular:', userStatus);
        return userStatus;
    }

    // Método adicional para testear la conexión
    static async testConnection() {
        try {
            console.log('Testeando conexión con el backend...');
            const response = await axios.get(`${this.BASE_URL}/rooms/all`);
            console.log('Conexión exitosa con el backend:', response.status);
            return true;
        } catch (error) {
            console.error('Error de conexión con el backend:', error.message);
            return false;
        }
    }

    // Método helper para verificar disponibilidad de habitaciones
    static async checkRoomAvailability(checkInDate, checkOutDate, roomType = '') {
        try {
            console.log('Verificando disponibilidad:', { checkInDate, checkOutDate, roomType });
            const params = new URLSearchParams();
            params.append('checkInDate', checkInDate);
            params.append('checkOutDate', checkOutDate);
            if (roomType) params.append('roomType', roomType);
            
            const result = await axios.get(`${this.BASE_URL}/rooms/available-rooms-by-date-and-type?${params.toString()}`);
            console.log('Disponibilidad verificada:', result.data);
            return result.data;
        } catch (error) {
            console.error('Error verificando disponibilidad:', error);
            throw error;
        }
    }
}