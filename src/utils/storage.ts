const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';
const ROLE_KEY = 'auth_role';

export function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setUser(user: any) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function getUser(): any | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setRole(role?: string) {
  if (role) {
    localStorage.setItem(ROLE_KEY, role);
  }
}
export function getRole(): string | null {
  return localStorage.getItem(ROLE_KEY);
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
}