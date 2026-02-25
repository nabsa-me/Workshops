import { JSX } from 'react'
import useTheme from '../shared/hooks/useTheme'
import DesktopLayout from '../layouts/Desktop/DesktopLayout'

const App = (): JSX.Element => {
  useTheme()

  return (
    <div className='appRoot'>
      <DesktopLayout />
    </div>
  )
}

export default App
