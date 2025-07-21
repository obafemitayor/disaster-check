import dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

const config: Config = {
  nasa: {
    apiKey: process.env.NASA_API_KEY || 'DEMO_KEY',
    baseUrls: {
      eonet: 'https://eonet.gsfc.nasa.gov/api/v3',
      donki: 'https://api.nasa.gov/DONKI',
      neows: 'https://api.nasa.gov/neo/rest/v1'
    }
  },

  cache: {
    ttl: {
      disasters: 300,
      asteroids: 300
    }
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    env: process.env.NODE_ENV || 'development'
  }
};

export default config;
