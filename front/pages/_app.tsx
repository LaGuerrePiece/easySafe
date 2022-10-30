import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {Fonts} from './Fonts'

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
        global: {
            fonts: {
                heading: `'Catamaran', sans-serif`,
                body: `'Catamaran', sans-serif`,
            },
            Button: {
                // 1. We can update the base styles
                baseStyle: {
                    fontWeight: 'bold', // Normally, it is "semibold"
                }
            },
            body: {
                bg: '#F6F7F8',
                font: 'Averta',
                color: 'black',
            },
            button: {
                bg: '#F6F7F8',
                _hover:{
                    bg: '#005546'
                }
            },
            // styles for the `a`
            a: {
                color: 'green.400',
                _hover: {
                    textDecoration: 'underline',
                },
            },
        },
    },
    colors: {
        brand: {
            100: "#f7fafc",
            // ...
            900: "#1a202c",
        },
    },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp