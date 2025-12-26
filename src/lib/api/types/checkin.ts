export interface CheckinResponse {
  drops: number;
  totalDrops: number;
  checkedInToday: boolean;
  lastCheckinDate?: string;
}

export interface CheckinStatusResponse {
  checkedInToday: boolean;
  lastCheckinDate?: string;
  canCheckin: boolean;
}
