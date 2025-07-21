export interface Config {
  nasa: {
    apiKey: string;
    baseUrls: {
      eonet: string;
      donki: string;
      neows: string;
    };
  };

  cache: {
    ttl: {
      disasters: number;
      asteroids: number;
    };
  };
  server: {
    port: number;
    env: string;
  };
}

export interface DisasterEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: string | null;
  categories: Array<{
    id: string;
    title: string;
  }>;
  sources: Array<{
    id: string;
    url: string;
  }>;
  geometry: Array<{
    magnitudeValue: number | null;
    magnitudeUnit: string | null;
    date: string;
    type: string;
    coordinates: [number, number];
  }>;
  country?: string;
}

export interface Asteroid {
  id: string;
  name: string;
  size: {
    min: number;
    max: number;
  };
  approach: {
    date: string;
    velocity: number;
    distance: number;
  };
  isPotentiallyHazardous: boolean;
}

export interface AsteroidData {
  closest: Asteroid;
  all: Asteroid[];
  totalCount: number;
  hazardousCount: number;
}
