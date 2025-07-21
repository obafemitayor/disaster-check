import React, { useState, useEffect } from 'react';
import { Container, Heading, VStack, Text, Spinner, Box, useColorModeValue, Center } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Map } from '../components/Map';
import { SearchBar } from '../components/SearchBar';
import { getNearbyDisasters } from '../services/api';
import { Coordinates, Disaster } from '../types';
import { messages } from './messages';

export function HomePage() {
  const intl = useIntl();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const containerBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const errorBg = useColorModeValue('red.50', 'red.900');
  const errorBorderColor = useColorModeValue('red.100', 'red.700');
  const errorTextColor = useColorModeValue('red.600', 'red.200');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [disastersLoading, setDisastersLoading] = useState(false);
  const [disastersError, setDisastersError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisasters = async () => {
      if (!coordinates) {
        return;
      }

      setDisastersLoading(true);
      try {
        const response = await getNearbyDisasters(coordinates);
        setDisasters(response.data.disasters);
        setDisastersError(null);
      } catch (err) {
        setDisastersError(err instanceof Error ? err.message : 'Failed to fetch disasters');
        setDisasters([]);
      } finally {
        setDisastersLoading(false);
      }
    };

    fetchDisasters();
  }, [coordinates]);

  const handleLocationSelect = (coords: Coordinates, name: string) => {
    setLocationName(name);
    setCoordinates(coords);
  };

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      py={{ base: 6, md: 12 }}
    >
      <Container
        maxW="container.2xl"
        bg={containerBg}
        boxShadow="lg"
        rounded="xl"
        p={{ base: 4, md: 8 }}
      >
      <VStack gap={6} alignItems="stretch">
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={{ base: 3, md: 4 }}
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        >
          {intl.formatMessage(messages.pageTitle)}
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          textAlign="center"
          mb={{ base: 6, md: 8 }}
          maxW="2xl"
          mx="auto"
        >
          {intl.formatMessage(messages.pageDescription)}
        </Text>
        <Box maxW="4xl" mx="auto" mb={8}>
          <SearchBar onLocationSelect={handleLocationSelect} />
        </Box>
        
        {coordinates && !disastersError && (
          <>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="medium"
              textAlign="center"
              color={textColor}
              mb={4}
            >
              {intl.formatMessage(messages.searchLocationPrefix, { location: locationName })}
            </Text>
            {disastersLoading ? (
              <Center py={8}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Center>
            ) : (
              <Map 
                coordinates={coordinates}
                disasters={disasters}
              />
            )}
          </>
        )}
        
        {disastersError && (
          <Box
            p={4}
            bg={errorBg}
            border="1px solid"
            borderColor={errorBorderColor}
            rounded="md"
            maxW="2xl"
            mx="auto"
          >
            <Text
              color={errorTextColor}
              textAlign="center"
              fontSize="lg"
              fontWeight="medium"
            >
            {intl.formatMessage(messages.errorMessage, { error: disastersError })}
            </Text>
          </Box>
        )}
      </VStack>
      </Container>
    </Box>
  );
}
