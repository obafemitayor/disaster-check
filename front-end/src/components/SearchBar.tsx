import React, { useEffect, useRef } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { messages } from './messages';

import { Coordinates } from '../types';

interface SearchBarProps {
  onLocationSelect: (coordinates: Coordinates, locationName: string) => void;
}

export const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const intl = useIntl();
  const searchContainer = useRef<HTMLDivElement>(null);
  const token = process.env.REACT_APP_MAPBOX_TOKEN || '';
  if (!token) {
    throw new Error('Mapbox token is required');
  }

  useEffect(() => {
    if (!searchContainer.current){
      return;
    }

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      types: 'place,locality,neighborhood',
      placeholder: intl.formatMessage(messages.searchPlaceholder),
    });

    geocoder.addTo(searchContainer.current);

    const handleResult = (e: { result: { center: [number, number], place_name: string } }) => {
      const [longitude, latitude] = e.result.center;
      onLocationSelect({ latitude, longitude }, e.result.place_name);
    };

    geocoder.on('result', handleResult);

    return () => {
      geocoder.off('result', handleResult);
      geocoder.onRemove();
    };
  }, [onLocationSelect, token, intl]);

  return (
    <Box
      ref={searchContainer}
      mb={4}
      className="geocoder-container"
      sx={{
        '.mapboxgl-ctrl-geocoder': {
          width: '100% !important',
          maxWidth: 'none !important',
          boxShadow: 'var(--chakra-shadows-md)',
          borderRadius: 'var(--chakra-radii-lg)',
          '@media (max-width: 48em)': {
            minWidth: '100% !important',
          },
          '@media (min-width: 48em)': {
            minWidth: '400px !important',
          },
          '@media (min-width: 62em)': {
            minWidth: '600px !important',
          }
        },
        '.mapboxgl-ctrl-geocoder--input': {
          '@media (max-width: 48em)': {
            height: '3rem !important',
            padding: '0 2.5rem !important',
            fontSize: '1rem !important',
          },
          '@media (min-width: 48em)': {
            height: '4rem !important',
            padding: '0 3rem !important',
            fontSize: '1.25rem !important',
          }
        },
        '.mapboxgl-ctrl-geocoder--icon': {
          '@media (max-width: 48em)': {
            top: '0.75rem !important',
          },
          '@media (min-width: 48em)': {
            top: '1.25rem !important',
          }
        },
        '.mapboxgl-ctrl-geocoder--icon-search': {
          left: '1rem !important',
        },
        '.mapboxgl-ctrl-geocoder--icon-close': {
          right: '1rem !important',
        }
      }}
    />
  );
};
