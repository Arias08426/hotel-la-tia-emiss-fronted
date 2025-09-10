import { http } from './httpClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  // Ajusta estos campos a tu entidad User real:
  firstName?: string;
  lastName?: string;
  phone?: string;
  // Si el backend requiere role en el registro (en tu UserService se fuerza USER si viene null):
  role?: string;
}

export interface BackendResponse<T = any> {
  statusCode: number;
  message?: string;
  token?: string;
  role?: string;
  expirationTime?: string;
  bookingConfirmationCode?: string;
  user?: any;
  userList?: any[];
  room?: any;
  roomList?: any[];
  booking?: any;
  bookingList?: any[];
  // Otras propiedades si las agregas
  data?: any; // Por si luego el backend añade un wrapper
}

function ensureSuccess(resp: BackendResponse) {
  if (resp.statusCode !== 200) {
    throw new Error(resp.message || 'Error en la petición');
  }
}

export const authService = {
  async register(data: RegisterData): Promise<BackendResponse> {
    const resp = await http.post<BackendResponse>('/auth/register', data);
    ensureSuccess(resp.data);
    return resp.data;
  },

  async login(credentials: LoginCredentials): Promise<{ token: string; role?: string; expirationTime?: string; }> {
    const resp = await http.post<BackendResponse>('/auth/login', credentials);
    ensureSuccess(resp.data);
    if (!resp.data.token) {
      throw new Error('El backend no devolvió token en el login');
    }
    return {
      token: resp.data.token,
      role: resp.data.role,
      expirationTime: resp.data.expirationTime
    };
  },

  async fetchProfile(): Promise<any> {
    const resp = await http.get<BackendResponse>('/users/get-logged-in-profile-info');
    ensureSuccess(resp.data);
    if (!resp.data.user) {
      throw new Error('El backend no devolvió el usuario en /users/get-logged-in-profile-info');
    }
    return resp.data.user;
  }
};