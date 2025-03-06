import { createRoot } from 'react-dom/client'
import SearchParams from './SearchParams'
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom'
import Details from './Details'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext'
import { useState } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
})

const App = () => {
  const adoptedPetHook = useState(null)

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPetHook}>
          <header>
            <Link to='/'>Adopt Me!</Link>
          </header>
          <Routes>
            <Route path='/details/:id' element={<Details />} />
            <Route path='/' element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
