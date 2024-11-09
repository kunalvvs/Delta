import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    phone: '1234567890',
    role: 'user',
    email: 'john@example.com'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    role: 'worker',
    email: 'rajesh@example.com'
  }
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phone) => {
    try {
      localStorage.setItem('tempPhone', phone);
      toast.success('OTP sent successfully! Use 123456 for testing');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const verifyOtp = async (phone, otp) => {
    try {
      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }

      let currentUser = MOCK_USERS.find(u => u.phone === phone);
      
      if (!currentUser) {
        currentUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: `User ${phone.slice(-4)}`,
          phone,
          role: 'user'
        };
      }

      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.removeItem('tempPhone');
      
      navigate(currentUser.role === 'worker' ? '/worker-dashboard' : '/user-dashboard');
      toast.success('Login successful!');
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        ...userData
      };

      MOCK_USERS.push(newUser);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tempPhone');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, verifyOtp, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

