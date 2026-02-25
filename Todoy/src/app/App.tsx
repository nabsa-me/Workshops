import { JSX } from 'react'
import useTheme from '../shared/hooks/useTheme'
import DesktopLayout from '../layouts/Desktop/DesktopLayout'
import { AppProvider } from './context/appContext'

const App = (): JSX.Element => {
  useTheme()

  return (
    <AppProvider>
      <div className='appRoot'>
        <DesktopLayout />
      </div>
    </AppProvider>
  )
}

export default App
