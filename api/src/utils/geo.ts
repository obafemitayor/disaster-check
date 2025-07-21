import { Coordinates } from '../types/disasters';

export function calculateHaversineDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function isWithinRadius(
  center: Coordinates,
  point: Coordinates,
  radiusKm: number
): boolean {
  return calculateHaversineDistance(center, point) <= radiusKm;
}

export function getMapBoundsForRadius(
  center: Coordinates,
  radiusKm: number
): { north: number; south: number; east: number; west: number } {
  // Rough approximation: 1 degree = 111km at the equator
  const latDelta = (radiusKm / 111);
  const lonDelta = (radiusKm / (111 * Math.cos(toRad(center.latitude))));

  return {
    north: center.latitude + latDelta,
    south: center.latitude - latDelta,
    east: center.longitude + lonDelta,
    west: center.longitude - lonDelta
  };
}
