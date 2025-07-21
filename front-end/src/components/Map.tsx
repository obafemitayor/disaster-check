import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box } from '@chakra-ui/react';
import { Coordinates, Disaster } from '../types';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  throw new Error('Mapbox token is required');
}
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapProps {
  coordinates: Coordinates;
  disasters: Disaster[];
}

const CATEGORY_ICONS: Record<string, string> = {
  Wildfires: '🔥',
  Floods: '🌊',
  Earthquakes: '🌋',
  Storms: '🌪️',
  'Severe Storms': '🌪️',
  Volcanoes: '🗻',
  Default: '⚠️'
};

const updateMarkers = (map: mapboxgl.Map, disasters: Disaster[],currentMarkers: mapboxgl.Marker[]): mapboxgl.Marker[] => {
  currentMarkers.forEach(marker => marker.remove());
  return disasters.map(disaster => {
    const markerElement = getMarkerElement(disaster.category);
    const marker = new mapboxgl.Marker({
      element: markerElement
    })
    .setLngLat([disaster.coordinates.longitude, disaster.coordinates.latitude])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${disaster.title}</h3>
           <p>${disaster.category}</p>
           <p>${disaster.description}</p>`
        )
    );

    marker.addTo(map);
    return marker;
  });
};

const getMarkerElement = (category: string) => {
  const el = document.createElement('div');
  el.className = 'disaster-marker';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.backgroundSize = 'cover';
  el.innerHTML = CATEGORY_ICONS[category] || CATEGORY_ICONS.Default;
  el.style.fontSize = '24px';
  el.style.display = 'flex';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
  return el;
};

export const Map = ({ coordinates, disasters }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }
    
    const initMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 3
    });

    map.current = initMap;

    initMap.on('load', () => {
      markersRef.current = updateMarkers(initMap, disasters, markersRef.current);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      initMap.remove();
    };
  }, [coordinates, disasters]);

  return (
    <Box
      ref={mapContainer}
      h="600px"
      w="100%"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="base"
    />
  );
};
