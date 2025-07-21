export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Disaster {
  id: string;
  title: string;
  description: string;
  category: string;
  coordinates: Coordinates;
  severity: string;
  timestamp: string;
}

export interface DisastersResponse {
  success: boolean;
  data: {
    disasters: Disaster[];
  };
  error?: string;
}
