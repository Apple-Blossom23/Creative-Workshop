export interface UserProfile {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'USER' | 'CREATOR' | 'ADMIN';
  level: number;
  lightning: number;
  drops: number;
  inviteCode: string;
  status: 'ACTIVE' | 'BANNED';
  createdAt: string;
}

export interface UpdateProfileRequest {
  nickname?: string;
  avatar?: string;
  bio?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangeEmailRequest {
  newEmail: string;
  password: string;
}
