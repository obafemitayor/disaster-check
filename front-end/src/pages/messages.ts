import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  pageTitle: {
    id: 'homePage.title',
    defaultMessage: 'DisasterCheck',
  },
  pageDescription: {
    id: 'homePage.description',
    defaultMessage: 'Instantly view active natural disasters such as wildfires, storms, and any other hazards in a location',
  },
  errorMessage: {
    id: 'homePage.error',
    defaultMessage: '{error}',
  },
  searchLocationPrefix: {
    id: 'homePage.searchLocationPrefix',
    defaultMessage: 'Natural Disasters in or around {location}',
  },
});
