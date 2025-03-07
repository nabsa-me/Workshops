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
    <div className='p-0 m-0' style={{ background: 'url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)' }}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <header className='w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to bg-red-500'>
              <Link className='text-6xl text-white hover:text-gray-200' to='/'>
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path='/details/:id' element={<Details />} />
              <Route path='/' element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
