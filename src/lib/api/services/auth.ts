import { apiClient } from '../client';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth';

export const authApi = {
  register: async (data: RegisterRequest) => {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  login: async (data: LoginRequest) => {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  saveAuth: (authData: AuthResponse) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify({
        userId: authData.userId,
        username: authData.username,
        nickname: authData.nickname,
        role: authData.role,
      }));
    }
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  },
};
