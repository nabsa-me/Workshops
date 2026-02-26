import { JSX, useEffect } from 'react'
import useTheme from '../shared/hooks/useTheme'
import DesktopLayout from '../layouts/Desktop/DesktopLayout'
import { useTasks } from '../shared/hooks/useTasks'

const App = (): JSX.Element => {
  const { loadTasks } = useTasks()
  const { setTheme } = useTheme()

  useEffect(() => {
    loadTasks()
    setTheme('light')
  }, [])

  return (
    <div className='appRoot'>
      <DesktopLayout />
    </div>
  )
}

export default App
