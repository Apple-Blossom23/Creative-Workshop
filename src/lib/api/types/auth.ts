export interface RegisterRequest {
  username: string;
  nickname: string;
  email: string;
  password: string;
  inviteCode?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: number;
  username: string;
  nickname: string;
  role: string;
}

export interface User {
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
