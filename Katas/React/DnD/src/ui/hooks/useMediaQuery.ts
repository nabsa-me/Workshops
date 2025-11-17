import { useLayoutEffect, useState } from 'react'
import { PORTRAIT, VERTICAL } from '../../utils/constants'
type windowSizeType = { width: number; height: number; orientation: 'portrait' | 'vertical' }

export const getWindowSize = (): windowSizeType => {
  if (typeof window === 'undefined') return { width: 0, height: 0, orientation: VERTICAL }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    orientation: window.innerWidth / window.innerHeight > 1 ? PORTRAIT : VERTICAL
  }
}

export function useMediaQuery() {
  const [windowSize, setWindowSize] = useState<windowSizeType>(() => getWindowSize())
  const isMobile: boolean = windowSize.width < 425

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const orientation = width > height ? PORTRAIT : VERTICAL

      setWindowSize((prev) =>
        prev.width === width && prev.height === height && prev.orientation === orientation
          ? prev
          : { width, height, orientation }
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { windowSize, isMobile }
}
