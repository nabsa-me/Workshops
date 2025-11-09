import { Dispatch, SetStateAction } from 'react'

export const Header = ({
  theme,
  setTheme
}: {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}) => {
  return (
    <header>
      <h1>Todoy</h1>
      <p onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>☀️</p>
    </header>
  )
}
