import { extendTheme, useColorModeValue } from '@chakra-ui/react';
import { getColor, mode } from '@chakra-ui/theme-tools'
const buttonBgDark = 'purple.700';
const buttonBgLight = 'gray.500';

const theme = extendTheme({

  initialColorMode: 'light',

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


  // Component overrides 
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
        active: {
          textDecoration: 'none',
          outline: 'none'
        }
      }
    },
    Button: {
      variants: {
        solid: ({ colorMode }) => ({
          bg: colorMode === 'dark' ? buttonBgDark : buttonBgLight,
          color:
            colorMode === 'dark' ? 'whiteAlpha.900' : 'whiteAlpha.900',
          _hover: {
            bg: colorMode === 'dark' ? buttonBgDark : buttonBgLight
          },
          _active: {
            bg: colorMode === 'dark' ? buttonBgDark : buttonBgLight
          }
        })
      }
    },
    Tabs: {
      parts: ['root', 'tab', 'tablist', 'tabpanel', 'tabpanels', 'indicator'],
      baseStyle: (props) => ({
        // This is the "Tabs" part.
        root: {
          bg: mode('gray.400', 'gray.700')(props)
        },
        tab: {
          color: mode('gray.700', 'gray.700')(props),
          bg: mode('gray.300', 'gray.600'),
          _selected: {
            color: mode('gray.900', 'gray.100')(props),
            bg: mode('gray.400', 'gray.700')(props)
          },
        },
        tablist: {
        },
        tabpanel: {

        },
        tabpanels: {
        }
      })
    },
  },

  // Globals
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

export default theme;
