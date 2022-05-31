import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/index';
import '@fontsource/inter/700.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/raleway/600.css';

// COLORS
const buttonBgDark = 'purple.700';
const buttonBgLight = 'gray.500';

// THEME
const theme = extendTheme({
  // DEFAULT COLOR MODE SETTINGS
  initialColorMode: 'dark',
  useSystemColorMode: true,

  colors: {
    primary: {
      100: '#9C7DAC',
      200: '#784E8E',
      300: '#592A71',
      400: '#3D1055',
      500: '#260238'
    },
    tint: {
      100: '#ffffff',
      200: '#e6e6e6',
      300: '#cccccc',
      400: '#b3b3b3',
      500: '#999999',
      600: '#808080'
    },
    shade: {
      100: '#000000',
      200: '#1a1a1a',
      300: '#333333',
      400: '#4d4d4d',
      500: '#666666',
      600: '#808080'
    }
  },

  // Variables

  // COMPONENT OVERRIDES
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          outline: 'none'
        },
        _focus: {
          textDecoration: 'none',
          outline: 'none'
        },
        _active: {
          textDecoration: 'none',
          outline: 'none'
        }
      }
    },
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? buttonBgDark : buttonBgLight,
          color:
            props.colorMode === 'dark' ? 'whiteAlpha.900' : 'whiteAlpha.900',
          _hover: {
            bg: props.colorMode === 'dark' ? buttonBgDark : buttonBgLight
          },
          _active: {
            bg: props.colorMode === 'dark' ? buttonBgDark : buttonBgLight
          }
        })
      }
    }
  },
  /*
  GLOBAL STYLES
  */
  styles: {
    global: (props) => ({
      html: {
        height: '100vh',
        fontSize: '62.5%'
      },
      body: {
        padding: '0',
        margin: '0',
        boxSizing: 'border-box'
      },
      '#root': {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }
    })
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>
);
