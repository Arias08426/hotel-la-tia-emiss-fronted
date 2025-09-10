import React from 'react';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user, role, logout } = useAuth();

  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Rol: {role}</p>
      <pre style={{ background: '#f5f5f5', padding: '8px' }}>
        {JSON.stringify(user, null, 2)}
      </pre>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default DashboardPage;