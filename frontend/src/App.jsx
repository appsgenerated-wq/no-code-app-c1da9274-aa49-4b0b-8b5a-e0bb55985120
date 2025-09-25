import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import config from './constants';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const manifest = new Manifest(config.APP_ID);

  useEffect(() => {
    // Check if user is logged in using Manifest SDK
    manifest.from('users').me()
      .then(userData => {
        if (userData) {
          setUser(userData);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      await manifest.login('users', email, password);
      const loggedInUser = await manifest.from('users').me();
      setUser(loggedInUser);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      alert('Login failed. Please check your credentials.');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      await manifest.from('users').create({ name, email, password });
      await login(email, password);
    } catch (error) {
      console.error("Signup failed:", error);
      alert('Signup failed. The email might already be in use.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading Application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {!user ? (
        <LandingPage onLogin={login} onSignup={signup} />
      ) : (
        <DashboardPage 
          user={user} 
          onLogout={logout} 
          manifest={manifest}
        />
      )}
    </div>
  );
}

export default App;
