import { Header } from './components/header/Header'
import { Homepage } from './components/routes/Homepage'
import { Footer } from './components/Footer'
import { darkTheme, lightTheme } from './styles/theme'
import { Box, CssBaseline, Theme, ThemeProvider, useMediaQuery, useTheme } from '@mui/material'
import { GlobalStyles } from './styles/GlobalStyles'
import { Context, initialContext } from './context'
import { JSX, useState } from 'react'
import { Route, Routes } from 'react-router'
import { DesktopLayout } from './components/layout/DesktopLayout'
import { Monsters } from './components/routes/Monsters'
import { MobileLayout } from './components/layout/MobileLayout'
import { HOMEPAGE, MONSTERS } from './constants'
import { useCustomBackground } from './hooks/useCustomBackground'

const App = (): JSX.Element => {
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
            <Route path={HOMEPAGE} element={<Homepage />} />
            <Route element={isSmallScreen ? <MobileLayout /> : <DesktopLayout />}>
              <Route path={MONSTERS} element={<Monsters />} />
            </Route>
          </Routes>
          <Footer />
        </BackgroundImage>
      </Context.Provider>
    </ThemeProvider>
  )
}

const BackgroundImage = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { background, backgroundSize } = useCustomBackground()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        zIndex: -100,
        background,
        backgroundSize,
        backgroundRepeat: 'no-repeat !important',
        backgroundPositionX: 'center !important'
      }}
    >
      {children}
    </Box>
  )
}

export default App
