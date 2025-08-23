import { Header } from './components/header/Header'
import { Homepage } from './components/routes/Homepage'
import { Footer } from './components/Footer'
import { darkTheme, lightTheme } from './styles/theme'
import { Box, CssBaseline, Theme, ThemeProvider, useMediaQuery, useTheme } from '@mui/material'
import { GlobalStyles } from './styles/GlobalStyles'
import { Context, initialContext } from './context'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { DesktopLayout } from './components/layout/DesktopLayout'
import { Monsters } from './components/routes/Monsters'
import { MobileLayout } from './components/layout/MobileLayout'

const image = '/005-00-005.goblins.webp'

const App = () => {
  const [mode] = useState<'dark' | 'light'>('dark')
  const theme: Theme = useTheme()
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('md'))

  const currentTheme = mode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles />
      <Context.Provider value={{ ...initialContext, isSmallScreen }}>
        <BackgroundImage>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route element={isSmallScreen ? <MobileLayout /> : <DesktopLayout />}>
              <Route path='/monsters' element={<Monsters />} />
            </Route>
          </Routes>
          <Footer />
        </BackgroundImage>
      </Context.Provider>
    </ThemeProvider>
  )
}

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  const theme: Theme = useTheme()
  const backgroundGradientBase = `
          linear-gradient(to right, ${theme.palette.base[0]} 0%, ${theme.palette.base[100]}`

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        zIndex: -100,
        background: {
          xxs: `${backgroundGradientBase} 50%, transparent 150%), url(${image})`,
          md: `${backgroundGradientBase} 50%, transparent 130%), url(${image})`,
          lg: `${backgroundGradientBase} 50%, transparent 110%), url(${image})`,
          xl: `${backgroundGradientBase} 40%, transparent 90%), url(${image})`,
          backgroundSize: 'cover !important'
        }
      }}
    >
      {children}
    </Box>
  )
}

export default App
