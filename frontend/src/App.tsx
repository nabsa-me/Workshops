import { createRoot } from 'react-dom/client'
import { Header } from './Header'
import { Body } from './Body'
import { Footer } from './Footer'
import { ThemeProvider } from '@emotion/react'
import { theme } from './styles/theme'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'
import { GlobalStyles } from './styles/GlobalStyles'
import { colors } from './styles/styles-constants'
import { Context } from './context'

const App = () => {
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Context.Provider value={{ isSmallScreen }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100vh',
            zIndex: -100,
            background: `linear-gradient(to right, ${colors.black1} 25%, ${colors.black2} 45%, transparent 150%), url(/005-00-005.goblins.webp)`,
            backgroundSize: 'cover'
          }}
        >
          <Header />
          <Body />
          <Footer />
        </Box>
      </Context.Provider>
    </ThemeProvider>
  )
}

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)
