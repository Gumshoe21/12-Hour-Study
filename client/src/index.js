import { createRoot } from 'react-dom/client';
import React from 'react';
import 'focus-visible/dist/focus-visible';
import { Global, css } from '@emotion/react';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index';
import '@fontsource/inter/500.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';

import '@fontsource/playfair-display/500.css'
import theme from './theme';

// THEME
const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus  via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}>
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.initialColorMode} />
    <Global styles={GlobalStyles} />
    <App />
  </ChakraProvider>
</Provider>,
)
