import { JSX } from 'react'
import useTheme from '../shared/hooks/useTheme'
import DesktopLayout from '../layouts/desktop/DesktopLayout'
import { AppProvider } from '../shared/context/appContext'

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
