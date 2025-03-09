import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Details from './Details'
import SearchParams from './SearchParams'
import { Provider } from 'react-redux'
import store from './store'
import { Suspense } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
})

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className='loading-pane'>
              <h2 className='loader'>🌀</h2>
            </div>
          }
        >
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <header className='w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to bg-red-500'>
                <Link className='text-6xl text-white hover:text-gray-200' to='/'>
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path='/details/:id' element={<Details />} />
                <Route path='/' element={<SearchParams />} />
              </Routes>
            </QueryClientProvider>
          </Provider>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

const container = document.getElementById('root')

if (!container) {
  throw new Error('no container to render to')
}

const root = createRoot(container)
root.render(<App />)
