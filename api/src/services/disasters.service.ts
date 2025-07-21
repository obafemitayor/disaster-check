import axios from 'axios';
import config from '../config/config';
import * as cache from '../utils/cache';
import { isWithinRadius } from '../utils/geo';
import { 
  DisasterEvent, 
  Coordinates, 
  DisasterMarker 
} from '../types/disasters';

export class DisasterService {
  private static readonly CACHE_KEY = 'disasters';
  private static readonly RADIUS_KM = 500;
  private static readonly DAYS = 30;

  private static async fetchNaturalDisasters(): Promise<DisasterEvent[]> {
    const response = await axios.get(`${config.nasa.baseUrls.eonet}/events`, {
      params: {
        status: 'open',
        days: this.DAYS,
        api_key: config.nasa.apiKey
      }
    });

    return response.data.events;
  }



  private static formatResponse(event: DisasterEvent): DisasterMarker {
    const coordinates: Coordinates = {
      latitude: event.geometry[0].coordinates[1],
      longitude: event.geometry[0].coordinates[0]
    };

    return {
      id: event.id,
      coordinates,
      category: event.categories[0].title,
      title: event.title,
      description: event.description || 'No description available'
    };
  }

  public static async getNearbyNaturalDisasters(query: { coordinates: Coordinates }): Promise<DisasterMarker[]> {
    const { coordinates } = query;
    const cacheKey = `${this.CACHE_KEY}_${coordinates.latitude}_${coordinates.longitude}`;
    const cachedData = cache.get<DisasterMarker[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const disasters = await this.fetchNaturalDisasters();
    const nearbyDisasters = disasters
      .filter(disaster => {
        const disasterCoords: Coordinates = {
          latitude: disaster.geometry[0].coordinates[1],
          longitude: disaster.geometry[0].coordinates[0]
        };
        return isWithinRadius(coordinates, disasterCoords, this.RADIUS_KM);
      })
      .map(disaster => this.formatResponse(disaster));

    cache.set(cacheKey, nearbyDisasters, config.cache.ttl.disasters);

    return nearbyDisasters;
  }


}
