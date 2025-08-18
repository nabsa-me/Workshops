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
          background: {
            xxs: `
          linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 50%,  transparent 100%), 
          linear-gradient(to right, ${theme.palette.base[100]} 40%,  transparent 150%), 
          url(/005-00-005.goblins.webp)`,
            md: `
          linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 50%,  transparent 100%), 
          linear-gradient(to right, ${theme.palette.base[100]} 30%,  transparent 170%), 
          url(/005-00-005.goblins.webp)`,
            lg: `
          linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 40%,  transparent 100%), 
          linear-gradient(to right, ${theme.palette.base[100]} 30%,  transparent 180%), 
          url(/005-00-005.goblins.webp)`,
            xl: `
          linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 30%,  transparent 100%), 
          linear-gradient(to right, ${theme.palette.base[100]} 20%,  transparent 150%), 
          url(/005-00-005.goblins.webp)`,
            backgroundSize: 'cover'
          }
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
