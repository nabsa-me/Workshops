import { expect, test, afterEach, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Cart from '../Cart'
import { testCart } from './constants'
import createFetchMock from 'vitest-fetch-mock'

// test('snapshot with nothing in card', () => {
//   const { asFragment } = render(<Cart cart={[]} />)
//   expect(asFragment()).toMatchSnapshot()
// })

afterEach(cleanup)

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

test('Print the header', async () => {
  const screen = render(<Cart cart={testCart} />)
  const h2 = await screen.findByRole('heading', { level: 2 })
  expect(h2.innerText).toBe('Cart')
})

test('Print as many complete products as they are in the cart', async () => {
  const screen = render(<Cart cart={testCart} />)
  const items = await screen.findAllByTitle('item')
  expect(items.length).toBe(3)

  const sizes = await screen.findAllByTitle('item-size')
  const types = await screen.findAllByTitle('item-type')
  const prices = await screen.findAllByTitle('item-price')

  sizes.forEach((size, index) => expect(size.innerText).toBe(testCart[index].size))
  types.forEach((type, index) => expect(type.innerText).toBe(testCart[index].pizza.name))
  prices.forEach((price, index) => expect(price.innerText).toBe(testCart[index].price))
})

test('Total price to be correct and in US format', async () => {
  const screen = render(<Cart cart={testCart} />)
  const p = await screen.findByTitle('total')
  expect(p.innerText).toBe('Total: $37.50')
})

test('Print checkout button and call the api', async () => {
  const mockCheckout = vi.fn()
  const screen = render(<Cart cart={testCart} checkout={mockCheckout} />)

  const button = screen.getByRole('button')
  expect(button.innerText).toBe('Checkout')

  expect(mockCheckout).toBeCalledTimes(0)
  button.click()
  expect(mockCheckout).toBeCalledTimes(1)
})
