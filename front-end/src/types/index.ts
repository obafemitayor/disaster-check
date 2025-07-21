export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Disaster {
  id: string;
  coordinates: Coordinates;
  category: string;
  title: string;
  description: string;
}

export interface DisastersResponse {
  success: boolean;
  data: {
    disasters: Disaster[];
  };
}
