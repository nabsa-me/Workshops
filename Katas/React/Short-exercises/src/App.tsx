import { JSX } from 'react'
import { Query } from './components/Query'
import { Debounce } from './components/Debounce'
import { ItemList } from './components/React-memo'
import { Abort } from './components/AbortController'
import { DebounceVSAbort } from './components/DebouceVSAbort'

const App = (): JSX.Element => {
  return (
    <>
      <Query />
      <Debounce />
      <ItemList items={['noelia, abalo, sanchez']} />
      <Abort />
      <DebounceVSAbort />
    </>
  )
}

export default App
