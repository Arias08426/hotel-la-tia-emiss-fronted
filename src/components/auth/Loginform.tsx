import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div style={{ marginBottom: 8 }}>
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;