import axios from 'axios';
import { getAccessToken, clearAuth } from '../utils/storage';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const http = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  resp => resp,
  error => {
    if (error?.response?.status === 401) {
      // Token inválido o expirado
      clearAuth();
      // Opcional: redirigir
      // window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);