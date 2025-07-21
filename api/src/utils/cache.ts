import NodeCache from 'node-cache';

// Initialize cache with different TTLs for different types of data
const cache = new NodeCache({
  stdTTL: 300, // Default TTL of 5 minutes
  checkperiod: 60 // Check for expired keys every 60 seconds
});

export const get = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

export const set = <T>(key: string, value: T, ttl = 300): boolean => {
  return cache.set(key, value, ttl);
};

export const del = (key: string): number => {
  return cache.del(key);
};

export const clear = (): void => {
  cache.flushAll();
};

export const keys = {
  disasters: 'disasters',
  asteroids: 'asteroids',
  geocoding: (query: string): string => `geocoding_${query}`
};
