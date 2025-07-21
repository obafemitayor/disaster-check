import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { HomePage } from './HomePage';
import { Map } from '../components/Map';
import { SearchBar } from '../components/SearchBar';
import { getNearbyDisasters } from '../services/api';

const testMessages = {
  'homePage.title': 'DisasterCheck',
  'homePage.description': 'Instantly view active natural disasters such as wildfires, storms, and any other hazards in a location',
  'homePage.error': '{error}',
  'homePage.searchLocationPrefix': 'Natural Disasters in or around {location}'
};

jest.mock('../services/api');
jest.mock('../components/SearchBar');
jest.mock('../components/Map');

describe('HomePage', () => {
  const mockDisasters = [
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
  ];

  const mockCoordinates = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (SearchBar as jest.Mock).mockImplementation(({ onLocationSelect }) => (
      <div data-testid="search-bar">
        <input type="text" placeholder="Search location" />
        <button onClick={() => onLocationSelect(mockCoordinates)}>
          Select Location
        </button>
      </div>
    ));

    (Map as jest.Mock).mockImplementation(({ coordinates, disasters }) => (
      <div data-testid="map">
        {disasters?.length > 0 && (
          <div data-testid="disaster-markers">
            {disasters.map((disaster: { id: string; title: string }) => (
              <div key={disaster.id} data-testid="disaster-marker">
                {disaster.title}
              </div>
            ))}
          </div>
        )}
      </div>
    ));

    (getNearbyDisasters as jest.Mock).mockResolvedValue({
      data: {
        disasters: []
      }
    });
  });

  it('renders with search bar on initial load', () => {
    render(
      <ChakraProvider>
        <IntlProvider messages={testMessages} locale="en">
          <HomePage />
        </IntlProvider>
      </ChakraProvider>
    );
    
    expect(screen.getByText(/Instantly view active natural disasters/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });

  it('displays map with disaster markers after successful location selection', async () => {
    const user = userEvent.setup();
    (getNearbyDisasters as jest.Mock).mockResolvedValue({
      data: {
        disasters: mockDisasters
      }
    });

    render(
      <ChakraProvider>
        <IntlProvider messages={testMessages} locale="en">
          <HomePage />
        </IntlProvider>
      </ChakraProvider>
    );

    await user.click(screen.getByText('Select Location'));
    await waitFor(() => {
      expect(screen.getByTestId('disaster-markers')).toBeInTheDocument();
    });
    expect(screen.getByText('Test Wildfire')).toBeInTheDocument();
    expect(screen.queryByText(/Failed to fetch/i)).not.toBeInTheDocument();
  });

  it('displays error message when disaster fetch fails after location selection', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Failed to fetch disasters';
    (getNearbyDisasters as jest.Mock).mockResolvedValue({
      data: {
        disasters: []
      }
    });

    render(
      <ChakraProvider>
        <IntlProvider messages={testMessages} locale="en">
          <HomePage />
        </IntlProvider>
      </ChakraProvider>
    );

    (getNearbyDisasters as jest.Mock).mockRejectedValue(new Error(errorMessage));
    await user.click(screen.getByText('Select Location'));
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toHaveClass('chakra-text');
    expect(errorElement).toHaveStyle({ color: 'var(--chakra-colors-red-500)' });
    expect(screen.queryByTestId('disaster-markers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });
});
