import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Inspections from './pages/Inspections';
import Layout from './components/Layout';
import { login, logout } from './services/authService';
import { User } from './types';
import { NotificationProvider } from './context/NotificationContext';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session (mock)
  useEffect(() => {
    const storedUser = localStorage.getItem('sst_pro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    // Call mock service
    const userData = await login(email, pass);
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('sst_pro_user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sst_pro_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <HashRouter>
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} isLoading={false} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                user?.role === 'admin' ? (
                  <Layout user={user} onLogout={handleLogout}>
                    <Dashboard />
                  </Layout>
                ) : (
                  // If user is not admin (Company), redirect to Inspections as their "Home"
                  <Navigate to="/inspections" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route 
            path="/schedule" 
            element={
              isAuthenticated ? (
                <Layout user={user} onLogout={handleLogout}>
                  <Schedule />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route 
            path="/inspections" 
            element={
              isAuthenticated ? (
                <Layout user={user} onLogout={handleLogout}>
                  <Inspections />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </NotificationProvider>
  );
};

export default App;