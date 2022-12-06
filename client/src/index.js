import React from 'react'

import 'focus-visible/dist/focus-visible'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import '@fontsource/inter/500.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import '@fontsource/playfair-display/500.css'

import App from './App'
import store from './store/index'
import theme from './theme'

// THEME
const GlobalStyles = css`
  /*
    Hides the focus indicator if an element receives focus via the cursor; 
    the focus indicator will still show on keyboard focus. 
    This is for accessibility reasons.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <Global styles={GlobalStyles} />
      <App />
    </ChakraProvider>
  </Provider>
)
