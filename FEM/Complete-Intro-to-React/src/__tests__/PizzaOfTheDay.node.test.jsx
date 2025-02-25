import { expect, test, afterEach, vi, describe } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import PizzaOfTheDay from '../PizzaOfTheDay'
import { testPizzaOfTheDay } from './constants'
import { usePizzaOfTheDay } from '../usePizzaOfTheDay'

afterEach(cleanup)

test('If there is no pizza, show Loading...', async () => {
  vi.mock('../usePizzaOfTheDay', () => ({
    usePizzaOfTheDay: vi.fn()
  }))
  usePizzaOfTheDay.mockReturnValue(null)
  const screen = render(<PizzaOfTheDay />)
  const loading = await screen.findByTitle('loading')
  expect(loading.innerText).toBe('Loading...')
})

describe('Pizza of the day is loaded and...', () => {
  test('Render title', async () => {
    vi.mock('../usePizzaOfTheDay', () => ({
      usePizzaOfTheDay: vi.fn()
    }))
    usePizzaOfTheDay.mockReturnValue(testPizzaOfTheDay)

    const screen = render(<PizzaOfTheDay />)
    const h2 = await screen.findByRole('heading', { level: 2 })
    expect(h2.innerText).toBe('Pizza of the Day')
  })

  test('Render Pizza of the Day data correctly', async () => {
    vi.mock('../usePizzaOfTheDay', () => ({
      usePizzaOfTheDay: vi.fn()
    }))
    usePizzaOfTheDay.mockReturnValue(testPizzaOfTheDay)

    const screen = render(<PizzaOfTheDay />)
    const name = await screen.findByRole('heading', { level: 3 })
    const description = await screen.findByTitle('description')
    const price = await screen.findByTitle('price')

    expect(name.innerText).toBe(testPizzaOfTheDay.name)
    expect(description.innerText).toBe(testPizzaOfTheDay.description)
    expect(price.innerText).toBe(`From: $${testPizzaOfTheDay.sizes.S}`)
  })
})
