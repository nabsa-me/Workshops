import { expect, test, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import createFetchMock from 'vitest-fetch-mock'
import { usePizzaOfTheDay } from '../usePizzaOfTheDay'
import { testPizza } from './constants'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

test('gives null when first called', async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza))
  const { result } = renderHook(() => usePizzaOfTheDay())
  expect(result.current).toBeNull()
})

test('to call the API and give back the pizza of the day', async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza))
  const { result } = renderHook(() => usePizzaOfTheDay())
  await waitFor(() => {
    expect(result.current).toEqual(testPizza)
  })
  expect(fetchMocker).toBeCalledWith('/api/pizza-of-the-day')
})
