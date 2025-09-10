import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
    if (form.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 380, margin: '0 auto' }}>
      <h2>Registro</h2>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div>
        <label>Email</label>
        <input name="email" type="email" required value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Nombre</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
      </div>
      <div>
        <label>Apellido</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} />
      </div>
      <div>
        <label>Contraseña</label>
        <input name="password" type="password" required value={form.password} onChange={handleChange} />
      </div>
      <div>
        <label>Confirmar Contraseña</label>
        <input name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Registrarme'}
      </button>
    </form>
  );
};

export default RegisterForm;