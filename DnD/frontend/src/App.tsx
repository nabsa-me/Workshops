import { createRoot } from 'react-dom/client'
import { Header } from './components/header/Header'
import { Body } from './components/Body'
import { Footer } from './components/Footer'
import { darkTheme, lightTheme } from './styles/theme'
import { Box, CssBaseline, Theme, ThemeProvider, useMediaQuery, useTheme } from '@mui/material'
import { GlobalStyles } from './styles/GlobalStyles'
import { Context } from './context'
import { useState } from 'react'

const App = () => {
  const [mode] = useState<'dark' | 'light'>('dark')
  const currentTheme = mode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles />
      <AppContent />
    </ThemeProvider>
  )
}

const AppContent = () => {
  const theme: Theme = useTheme()
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Context.Provider value={{ isSmallScreen }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          zIndex: -100,
          background: `linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[200]} 50%, transparent 125%), url(/005-00-005.goblins.webp)`,
          backgroundSize: 'cover'
        }}
      >
        <Header />
        <Body />
        <Footer />
      </Box>
    </Context.Provider>
  )
}

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)
