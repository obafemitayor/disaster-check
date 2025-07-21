export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DisasterEvent {
  id: string;
  title: string;
  description: string;
  link: string;
  categories: {
    id: string;
    title: string;
  }[];
  sources: {
    id: string;
    url: string;
  }[];
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
    date: string;
  }[];
  distance?: number; // Distance from user/search location in km
}

export interface NearbyDisastersQuery {
  coordinates: Coordinates;
  radiusKm?: number;
  days?: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface DisasterMarker {
  id: string;
  coordinates: Coordinates;
  category: string;
  title: string;
  description: string;
}
