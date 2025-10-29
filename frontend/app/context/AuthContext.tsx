// frontend/app/context/AuthContext.tsx
'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// NOTE: API_URL is defined but not needed here. Removed to clean up the code.

// Define the context state and functions
interface AuthContextType {
  user: { username: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
const [user, setUser] = useState<{ username: string } | null>(null);
const [token, setToken] = useState<string | null>(null);
const [loading, setLoading] = useState(true); // <-- NEW
const isAuthenticated = !!token;

// Load token from localStorage on initial load
useEffect(() => {
  const storedToken = localStorage.getItem('access_token');
  const storedUsername = localStorage.getItem('username');
  if (storedToken && storedUsername) {
    setToken(storedToken);
    setUser({ username: storedUsername });
  }
  setLoading(false); // <-- Mark done after checking
}, []);
 // Run only once on mount


  // FIX 2: Set or Clear Axios default header whenever the token state changes
  // This ensures the header is set after initial load AND after login/logout.
  useEffect(() => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Clear the header on logout or if the token state becomes null
        delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);


  // 3. Login function: stores token and username
  const login = (username: string, newToken: string) => {
    localStorage.setItem('access_token', newToken);
    localStorage.setItem('username', username);
    setToken(newToken);
    setUser({ username });
    // Note: The Authorization header is now set by the useEffect above.
  };

  // 4. Logout function: clears storage and state
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
    // Note: The Authorization header is now cleared by the useEffect above.
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};