import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'restaurant' | 'admin';
  token: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  pendingEmail: string | null;
  pendingRole: 'user' | 'restaurant' | 'admin';
  isLoading: boolean;
  
  login: (email: string, password: string, role?: 'user' | 'restaurant' | 'admin') => Promise<{ otpRequired?: boolean; user?: User }>;
  registerUser: (userData: { name: string; email: string; password?: string; phone?: string; location?: string; description?: string }, role?: 'user' | 'restaurant' | 'admin') => Promise<{ otpRequired?: boolean }>;
  verifyOTP: (otp: string) => Promise<User>;
  resendOTP: () => Promise<void>;
  logout: () => Promise<void>;
  loadStoredUser: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  pendingEmail: null,
  pendingRole: 'user',
  isLoading: false,

  loadStoredUser: async () => {
    try {
      const stored = await AsyncStorage.getItem('authUser');
      if (stored) {
        set({ user: JSON.parse(stored) });
      }
    } catch (err) {
      console.error('Error loading stored user:', err);
    }
  },

  login: async (email, password, role = 'user') => {
    set({ isLoading: true });
    try {
      const res = await client.post('/auth/login', { email, password });
      const data = res.data;

      // Check if OTP is required
      if (data?.message?.includes('OTP') || data?.otpRequired) {
        set({ pendingEmail: email, pendingRole: role, isLoading: false });
        return { otpRequired: true };
      }

      // Check role mismatch (similar to web safety checks)
      const userRole = data.role || 'user';
      if (role === 'restaurant' && userRole !== 'restaurant') {
        throw new Error('You must log in through the Restaurant Portal.');
      }
      if (role === 'admin' && userRole !== 'admin') {
        throw new Error('Unauthorized access — Admins only.');
      }
      if (role === 'user' && userRole !== 'user' && userRole !== 'admin') {
        throw new Error('Please use the Restaurant Login page.');
      }

      const loggedInUser: User = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: userRole,
        token: data.token,
      };

      await AsyncStorage.setItem('authUser', JSON.stringify(loggedInUser));
      set({ user: loggedInUser, isLoading: false });
      return { user: loggedInUser };
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(err.response?.data?.message || err.message || 'Login failed');
    }
  },

  registerUser: async (userData, role = 'user') => {
    set({ isLoading: true });
    try {
      const endpoint = role === 'restaurant' ? '/auth/register-restaurant' : '/auth/register';
      const res = await client.post(endpoint, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        location: userData.location,
        description: userData.description,
      });

      const data = res.data;

      if (data?.message?.includes('OTP') || data?.otpRequired) {
        set({ pendingEmail: userData.email, pendingRole: role, isLoading: false });
        return { otpRequired: true };
      }

      set({ isLoading: false });
      return {};
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(err.response?.data?.message || err.message || 'Registration failed');
    }
  },

  verifyOTP: async (otp) => {
    const { pendingEmail, pendingRole } = get();
    if (!pendingEmail) throw new Error('Missing email for OTP verification');

    set({ isLoading: true });
    try {
      const res = await client.post('/auth/verify-otp', {
        email: pendingEmail,
        otp,
      });

      const backendUser = res.data.user;
      const token = res.data.token;

      if (!backendUser || !token) throw new Error('Invalid OTP verification response');

      const userData: User = {
        _id: backendUser._id,
        name: backendUser.name,
        email: backendUser.email,
        role: backendUser.role || pendingRole,
        token,
      };

      await AsyncStorage.setItem('authUser', JSON.stringify(userData));
      set({ user: userData, pendingEmail: null, pendingRole: 'user', isLoading: false });
      return userData;
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(err.response?.data?.message || err.message || 'Invalid or expired OTP');
    }
  },

  resendOTP: async () => {
    const { pendingEmail } = get();
    if (!pendingEmail) throw new Error('Missing email for OTP resend');

    try {
      await client.post('/auth/resend-otp', { email: pendingEmail });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message || 'Failed to resend OTP');
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('authUser');
    set({ user: null, pendingEmail: null });
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      await client.post('/auth/forgot-password', { email });
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(err.response?.data?.message || err.message || 'Failed to request password reset');
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    set({ isLoading: true });
    try {
      await client.post('/auth/reset-password', { email, otp, newPassword });
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(err.response?.data?.message || err.message || 'Failed to reset password');
    }
  },

  updateUser: async (updatedData) => {
    const { user } = get();
    if (!user) return;

    const nextUser = { ...user, ...updatedData };
    await AsyncStorage.setItem('authUser', JSON.stringify(nextUser));
    set({ user: nextUser });
  },
}));
