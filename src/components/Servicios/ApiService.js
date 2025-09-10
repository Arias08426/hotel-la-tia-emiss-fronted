import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080"; // Ajusta si usas proxy o deploy

  /* ==================== HELPERS ==================== */
  static jsonHeaders() {
    return { "Content-Type": "application/json" };
  }

  /* ==================== AUTH ==================== */
  static async registerUser(registration) {
    const res = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration,
      { headers: this.jsonHeaders() }
    );
    return res.data;
  }

  static async loginUser(loginDetails) {
    // Tu backend actual (según mencionaste) no emite token, solo datos del usuario
    const res = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails,
      { headers: this.jsonHeaders() }
    );
    return res.data;
  }

  /* ==================== USERS ==================== */
  static async getAllUsers() {
    const res = await axios.get(`${this.BASE_URL}/users/all`);
    return res.data;
  }

  static async getUserProfileByEmail(email) {
    if (!email) throw new Error("Email requerido");
    const res = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      { params: { email } }
    );
    return res.data;
  }

  static async getUser(userId) {
    const res = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`);
    return res.data;
  }

  static async getUserBookings(userId) {
    const res = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`);
    return res.data;
  }

  static async deleteUser(userId) {
    const res = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`);
    return res.data;
  }

  /* ==================== ROOMS ==================== */
  static async addRoom(formData) {
    const res = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  }

  static async getAllRooms() {
    const res = await axios.get(`${this.BASE_URL}/rooms/all`);
    return res.data;
  }

  static async getAllAvailableRooms() {
    const res = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
    return res.data;
  }

  static async getRoomById(roomId) {
    const res = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
    return res.data;
  }

  static async deleteRoom(roomId) {
    const res = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`);
    return res.data;
  }

  static async updateRoom(roomId, formData) {
    const res = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  }

  static async getRoomTypes() {
    const res = await axios.get(`${this.BASE_URL}/rooms/types`);
    return res.data;
  }

  static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
    const params = { checkInDate, checkOutDate };
    if (roomType) params.roomType = roomType;
    const res = await axios.get(
      `${this.BASE_URL}/rooms/available-rooms-by-date-and-type`,
      { params }
    );
    return res.data;
  }

  /* ==================== BOOKINGS ==================== */
  // Endpoint real que mencionaste: /bookings/book-room/{roomId}/{userId}
  static async bookRoom(roomId, userId, booking) {
    const res = await axios.post(
      `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
      booking,
      { headers: this.jsonHeaders() }
    );
    return res.data;
  }

  static async getAllBookings() {
    const res = await axios.get(`${this.BASE_URL}/bookings/all`);
    return res.data;
  }

  static async getBookingByConfirmationCode(bookingCode) {
    const res = await axios.get(
      `${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`
    );
    return res.data;
  }

  static async cancelBooking(bookingId) {
    const res = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`);
    return res.data;
  }

  /* ==================== ADAPTERS para ReservasPage ==================== */
  static async createBooking(roomId, userId, booking) {
    return this.bookRoom(roomId, userId, booking);
  }

  static async getBookingByConfirmation(code) {
    return this.getBookingByConfirmationCode(code);
  }

  static async checkRoomAvailability({ checkInDate, checkOutDate, roomType }) {
    return this.getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType);
  }

  static async searchAvailableRooms({ checkInDate, checkOutDate, roomType }) {
    return this.getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType);
  }

  /* ==================== SESSION SIMPLE (sin token) ==================== */
  static logout() {
    localStorage.removeItem("user");
  }

  static isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  static isAdmin() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role === "ADMIN";
    } catch {
      return false;
    }
  }

  /* ==================== UTILS ==================== */
  static async testConnection() {
    try {
      await axios.get(`${this.BASE_URL}/rooms/all`);
      return true;
    } catch {
      return false;
    }
  }
}