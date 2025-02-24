// import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import Header from '../Header'
import { render } from '@testing-library/react'
import { RouterProvider, createRouter, createRootRoute } from '@tanstack/react-router'
import { CartContext } from '../contexts'

test('correctly renders a header with a zero cart count', async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <CartContext.Provider value={[[]]}>
        <Header />
      </CartContext.Provider>
    )
  })

  const router = createRouter({ routeTree: rootRoute })
  const screen = render(<RouterProvider router={router}></RouterProvider>)

  const itemsInCart = await screen.getByTestId('cart-number')
  expect(itemsInCart.innerText).toBe('0')
})

test('correctly renders a header with a three cart count', async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <CartContext.Provider value={[[{ pizza: 1 }, { pizza: 2 }, { pizza: 3 }]]}>
        <Header />
      </CartContext.Provider>
    )
  })

  const router = createRouter({ routeTree: rootRoute })
  const screen = render(<RouterProvider router={router}></RouterProvider>)

  const itemsInCart = await screen.getAllByTestId('cart-number')

  expect(itemsInCart[itemsInCart.length - 1].innerText).toBe('3')
})
