import request from 'supertest';
import { app } from '../../../src/app';
import * as cache from '../../utils/cache';
import { DisasterService } from '../../services/disasters.service';
import { setupApiMocks, cleanupApiMocks } from '../mocks/api.mock';

describe('Disaster Endpoints', () => {
  beforeAll(() => {
    setupApiMocks();
  });

  afterAll(() => {
    cleanupApiMocks();
  });

  beforeEach(() => {
    cache.clear();
  });

  describe('GET /natural-disasters', () => {
    it('should return nearby disasters', async () => {
      const response = await request(app)
        .get('/api/natural-disasters')
        .query({
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194
          }
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('disasters');
    });

    it('should validate coordinates', async () => {
      const response = await request(app)
        .get('/api/natural-disasters')
        .query({
          coordinates: {
            latitude: 'invalid',
            longitude: -122.4194
          }
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty('error');
    });

    it('should require coordinates object', async () => {
      const response = await request(app)
        .get('/api/natural-disasters')
        .query({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Caching', () => {
    it('should cache and return cached results', async () => {
      // Mock the fetchDisasters method to track calls
      const fetchSpy = jest.spyOn(DisasterService as any, 'fetchNaturalDisasters');

      // First call - should fetch from API
      const response1 = await request(app)
        .get('/api/natural-disasters')
        .query({
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194
          }
        });

      // Second call with same parameters - should use cache
      const response2 = await request(app)
        .get('/api/natural-disasters')
        .query({
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194
          }
        });

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(response1.body).toEqual(response2.body);

      fetchSpy.mockRestore();
    });
  });
});
