import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';
import { AuthState, User } from './types';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  const handleAuthSuccess = (user: User) => {
    setAuthState({
      isAuthenticated: true,
      user
    });
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <>
      <Toaster />
      {authState.isAuthenticated && authState.user ? (
        <Dashboard user={authState.user} onLogout={handleLogout} />
      ) : (
        <LandingPage onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}