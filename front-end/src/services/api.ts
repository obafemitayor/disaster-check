import axios from 'axios';
import { Coordinates, DisastersResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  throw new Error('API URL is required');
}

export const getNearbyDisasters = async (coordinates: Coordinates) => {
  const response = await axios.get<DisastersResponse>(`${API_BASE_URL}/natural-disasters`, {
    params: {
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }
    }
  });
  return response.data;
};
