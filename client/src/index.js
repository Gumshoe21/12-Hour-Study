import React from 'react';
import 'focus-visible/dist/focus-visible';
import { Global, css } from '@emotion/react';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index';
import '@fontsource/inter/700.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/raleway/600.css';
import theme from './theme';

// COLORS
const buttonBgDark = 'purple.700';
const buttonBgLight = 'gray.500';

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
ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <Global styles={GlobalStyles} />
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
