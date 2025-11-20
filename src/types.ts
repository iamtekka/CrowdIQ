export interface Location {
  id: string;
  name: string;
  type: 'dining' | 'cafe' | 'restaurant';
  currentBusyness: number;
  lastReported: string;
  description: string;
  deals?: string[];
  hours: string;
  historicalData: BusynessDataPoint[];
}

export interface BusynessDataPoint {
  hour: number;
  busyness: number;
}

export interface BusynessReport {
  locationId: string;
  rating: number;
  comment?: string;
  timestamp: string;
  userId: string;
  isFlagged?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}