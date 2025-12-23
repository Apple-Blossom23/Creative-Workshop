const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = this.getToken();
      
      // 准备headers
      const headers: Record<string, string> = {};
      
      // 如果body是FormData，不要设置Content-Type，让浏览器自动设置
      if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }
      
      // 合并用户自定义headers，但不要覆盖浏览器设置的Content-Type
      if (options.headers) {
        for (const [key, value] of Object.entries(options.headers as Record<string, string>)) {
          if (!(key.toLowerCase() === 'content-type' && options.body instanceof FormData)) {
            headers[key] = value;
          }
        }
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
        }
        throw new Error('未授权，请重新登录');
      }

      if (response.status === 403) {
        throw new Error('没有权限访问');
      }

      if (!response.ok) {
        throw new Error(data.message || '请求失败');
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    // 如果是FormData，直接发送，不需要JSON.stringify
    if (body instanceof FormData) {
      return this.request<T>(endpoint, {
        method: 'POST',
        body: body,
      });
    }
    
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
