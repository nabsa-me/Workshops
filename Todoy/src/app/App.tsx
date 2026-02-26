import { JSX, useEffect } from 'react'
import useTheme from '../shared/hooks/useTheme'
import DesktopLayout from '../layouts/Desktop/DesktopLayout'
import { useTasks } from '../shared/hooks/useTasks'

const App = (): JSX.Element => {
  useTheme()

  const { loadTasks } = useTasks()
  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className='appRoot'>
      <DesktopLayout />
    </div>
  )
}

export default App
