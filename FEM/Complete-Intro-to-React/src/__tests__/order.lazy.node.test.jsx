import { expect, test, afterEach, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Order from '../routes/order.lazy'
import { testPizzaOfTheDay } from './constants'

afterEach(cleanup)

test('', async () => {
  vi.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url === '/api/pizzas') {
      return { json: () => Promise.resolve([testPizzaOfTheDay]) }
    }
  })

  vi.fn().mockResolvedValue(testPizzaOfTheDay)

  const screen = render(<Order />)
  const price = await screen.findByTitle('price')
  expect(price.textContent).toBe(`$${testPizzaOfTheDay.sizes.M}`)
})
