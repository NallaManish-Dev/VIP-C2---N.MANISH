import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getProfile, loginUser, registerUser } from '../services/authService.js';
import { getErrorMessage } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('bookADoctorToken'));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();
        setUser(response.data.data);
      } catch {
        localStorage.removeItem('bookADoctorToken');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const login = async (payload) => {
    try {
      const response = await loginUser(payload);
      localStorage.setItem('bookADoctorToken', response.data.data.token);
      setToken(response.data.data.token);
      setUser(response.data.data.user);
      toast.success(response.data.message);
      return response.data.data.user;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const register = async (payload) => {
    try {
      const response = await registerUser(payload);
      localStorage.setItem('bookADoctorToken', response.data.data.token);
      setToken(response.data.data.token);
      setUser(response.data.data.user);
      toast.success(response.data.message);
      return response.data.data.user;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('bookADoctorToken');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
