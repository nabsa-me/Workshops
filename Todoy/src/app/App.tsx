import { JSX } from 'react'
import useTheme from '../shared/hooks/useTheme'

const App = (): JSX.Element => {
  const { theme, setTheme } = useTheme()

  return <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Hello World</div>
}

export default App
