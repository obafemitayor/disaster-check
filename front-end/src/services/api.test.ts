import axios from 'axios';
import { getNearbyDisasters } from './api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.REACT_APP_API_URL = 'http://localhost:3001/api';
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('getNearbyDisasters', () => {
    const mockCoordinates = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const mockResponse = {
      data: {
        success: true,
        data: {
          disasters: [
            {
              id: 'EONET_1',
              coordinates: {
                latitude: 37.7749,
                longitude: -122.4194,
              },
              category: 'Wildfires',
              title: 'Test Wildfire',
              description: 'Test Description',
            },
          ],
        },
      },
    };

    it('makes GET request to correct endpoint with coordinates', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await getNearbyDisasters(mockCoordinates);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/natural-disasters`,
        {
          params: {
            coordinates: mockCoordinates,
          },
        }
      );
    });

    it('returns the data from the response', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getNearbyDisasters(mockCoordinates);

      expect(result).toEqual(mockResponse.data);
    });

    it('throws error when API_BASE_URL is not defined', async () => {
      process.env.REACT_APP_API_URL = undefined;

      await expect(async () => {
        // Need to re-import the module to trigger the API_BASE_URL check
        const { getNearbyDisasters } = require('./api');
        await getNearbyDisasters(mockCoordinates);
      }).rejects.toThrow('API URL is required');
    });

    it('propagates error from API call', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(getNearbyDisasters(mockCoordinates)).rejects.toThrow('API Error');
    });
  });
});
