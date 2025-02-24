import { expect, test, afterEach, vi, beforeEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { testOrderValue, testPastOrders } from './constants'
import { Route } from '../routes/past.lazy'
import createFetchMock from 'vitest-fetch-mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

afterEach(cleanup)
beforeEach(() => {
  fetch.resetMocks()
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true
    }
  }
})

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

test('', async () => {
  const modal = document.createElement('div')
  modal.id = 'modal'
  document.querySelector('body').appendChild(modal)

  fetchMocker.mockResponse(JSON.stringify(testOrderValue))

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  )

  const focusedOrder = await screen.findByTitle('order')
  focusedOrder.click()
  fetchMocker.mockResponse(JSON.stringify(testPastOrders))

  const price = await screen.findByTitle('price')
  expect(price.textContent).toBe(`$${testPastOrders.orderItems[0].price}`)
  const total = await screen.findByTitle('total')
  expect(total.textContent).toBe(`$${testPastOrders.orderItems[0].total}`)
})
