import nock from 'nock';
import { mockDisasterEvents } from './mockData';

export const setupApiMocks = (): void => {
  // Mock NASA EONET API for disaster data
  nock('https://eonet.gsfc.nasa.gov')
    .persist()
    .get('/api/v3/events')
    .query(true)
    .reply(200, {
      events: mockDisasterEvents
    });

  // Mock Mapbox Static Images API for map generation
  nock('https://api.mapbox.com')
    .persist()
    .get(/\/styles\/v1\/mapbox\/.*/)
    .query(true)
    .reply(200, Buffer.from('fake-image-data'), {
      'content-type': 'image/png'
    });
};

export const cleanupApiMocks = (): void => {
  nock.cleanAll();
};
