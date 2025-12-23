import { apiClient } from '../client';
import type { UserProfile, UpdateProfileRequest, ChangePasswordRequest, ChangeEmailRequest } from '../types/user';

export const userApi = {
  getProfile: async () => {
    return apiClient.get<UserProfile>('/user/profile');
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    return apiClient.put<UserProfile>('/user/profile', data);
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post<string>('/user/avatar', formData);
  },

  removeAvatar: async () => {
    return apiClient.delete('/user/avatar');
  },

  changePassword: async (data: ChangePasswordRequest) => {
    return apiClient.post('/user/password', data);
  },

  changeEmail: async (data: ChangeEmailRequest) => {
    return apiClient.post('/user/email', data);
  },
};
