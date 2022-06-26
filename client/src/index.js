import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools"
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index';
import '@fontsource/inter/700.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/raleway/600.css';
import theme from "./theme"

// COLORS
const buttonBgDark = 'purple.700';
const buttonBgLight = 'gray.500';

// THEME

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
