import { apiClient } from '../client';
import type { CheckinResponse, CheckinStatusResponse } from '../types/checkin';

export const checkinApi = {
  checkin: async () => {
    return apiClient.post<CheckinResponse>('/checkin');
  },

  getStatus: async () => {
    return apiClient.get<CheckinStatusResponse>('/checkin/status');
  },
};
