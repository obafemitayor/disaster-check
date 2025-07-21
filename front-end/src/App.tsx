import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { HomePage } from './pages/HomePage';

const App = () => (
  <IntlProvider messages={{}} locale="en">
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </IntlProvider>
);

export default App;
