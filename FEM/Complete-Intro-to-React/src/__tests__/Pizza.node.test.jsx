import { render, cleanup } from '@testing-library/react'
import { expect, test, afterEach } from 'vitest'
import Pizza from '../Pizza'

afterEach(cleanup)
test('alt text renders on Pizza image', () => {
  const name = 'My favourite Pizza'
  const src = 'https://picsum.photos/200'

  const screen = render(<Pizza name={name} description='my super Pizza' image={src} />)
  const img = screen.getByRole('img')
  expect(img.src).toBe(src)
  expect(img.alt).toBe(name)
})

test('to have default image of none is provided', () => {
  const screen = render(<Pizza name='some name' description='some description' />)

  const img = screen.getByRole('img')
  expect(img.src).not.toBe('')
})
