// import { Link, Routes, Route } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import AdoptedPetContext from './AdoptedPetContext'
// import { useState, lazy, Suspense } from 'react'
// import { Pet } from './APIResponsesTypes'
// import { createRoot } from 'react-dom/client'

// const Details = lazy(() => import('./Details'))
// const SearchParams = lazy(() => import('./SearchParams'))

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       cacheTime: Infinity,
//       suspense: true
//     }
//   }
// })

// const App = () => {
//   const adoptedPetHook = useState(null as Pet | null)

//   return (
//     <div className='p-0 m-0' style={{ background: 'url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)' }}>
//       <QueryClientProvider client={queryClient}>
//         <Suspense
//           fallback={
//             <div className='loading-pane'>
//               <h2 className='loader'>🌀</h2>
//             </div>
//           }
//         >
//           <AdoptedPetContext.Provider value={adoptedPetHook}>
//             <header className='w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to bg-red-500'>
//               <Link className='text-6xl text-white hover:text-gray-200' to='/'>
//                 Adopt Me!
//               </Link>
//             </header>
//             <Routes>
//               <Route path='/details/:id' element={<Details />} />
//               <Route path='/' element={<SearchParams />} />
//             </Routes>
//           </AdoptedPetContext.Provider>
//         </Suspense>
//       </QueryClientProvider>
//     </div>
//   )
// }
// const container = document.getElementById("root");

// if (!container) {
//   throw new Error("no container to render to");
// }

// const root = createRoot(container);
// root.render(<App />);
// export default App

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import AdoptedPetContext from './AdoptedPetContext'
import Details from './Details'
import SearchParams from './SearchParams'
import { Pet } from './APIResponsesTypes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
})

const App = () => {
  const adoptedPet = useState(null as Pet | null)
  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
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
        </AdoptedPetContext.Provider>
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
