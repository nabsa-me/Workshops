/**
 * @jest-environment node
 */

import { getWindowSize } from './useMediaQuery'

test('SSR: getWindowSize returns fallback values when window is undefined', () => {
  expect(getWindowSize()).toEqual({
    width: 0,
    height: 0,
    orientation: 'vertical'
  })
})
