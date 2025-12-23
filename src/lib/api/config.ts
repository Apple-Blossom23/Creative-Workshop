/**
 * API统一配置
 * 在这里维护所有的API相关配置
 */

// 后端服务器地址
export const API_SERVER_URL = 'http://154.21.90.113:8080/api';

// 获取API基础URL
export function getApiBaseUrl(): string {
  return API_SERVER_URL;
}