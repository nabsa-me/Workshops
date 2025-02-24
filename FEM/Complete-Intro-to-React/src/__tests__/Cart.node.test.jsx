import { expect, test, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Cart from '../Cart'
import { testCart } from './constants'

// test('snapshot with nothing in card', () => {
//   const { asFragment } = render(<Cart cart={[]} />)
//   expect(asFragment()).toMatchSnapshot()
// })

afterEach(cleanup)

test('Print the header', async () => {
  const screen = render(<Cart cart={testCart} />)
  const h2 = await screen.findByRole('heading', { level: 2 })
  expect(h2.innerText).toBe('Cart')
})

test.skip('Print as many complete products as they are in the cart', () => {})
test.skip('Print the total correctly, amount and format', () => {})

test('Price to be correct and in US format', async () => {
  const screen = render(<Cart cart={testCart} />)
  const p = await screen.findByTitle('total')
  expect(p.innerText).toBe('Total: $37.50')
})
test.skip('Print checkout button')
test.skip('Run checkout button, call the api?')
