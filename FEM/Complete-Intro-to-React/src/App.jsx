import React from 'react'
import { createRoot } from 'react-dom/client'
import { Pizza } from './Pizza'

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order now</h1>
      <Pizza name='Peperoni' description='pep, cheese, n stuff' image={'/public/pizzas/pepperoni.webp'} />
      <Pizza name='Hawaiian' description='ham, pineapple, n stuff' image={'/public/pizzas/hawaiian.webp'} />
      <Pizza name='Americano' description='french fries, hot dogs, n stuff' image={'/public/pizzas/big_SXmeat.webp'} />
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(React.createElement(App))
