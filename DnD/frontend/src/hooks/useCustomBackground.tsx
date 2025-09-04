import { Theme, useTheme } from '@mui/material'
import { useLocation } from 'react-router'
import { HOMEPAGE, MONSTERS } from '../constants'
import type { Location } from 'react-router'
import { Background, BackgroundSize, DinamicBackground } from '../types/app'

export const useCustomBackground = () => {
  const theme: Theme = useTheme()
  const location: Location = useLocation()

  const homepageBaseGradient = `linear-gradient(to right, ${theme.palette.base[0]} 0%, ${theme.palette.base[100]} 50%`
  const homepageImage = '/005-00-005.goblins.webp'

  const dinamicBackground: DinamicBackground = {
    [HOMEPAGE]: {
      background: {
        xxs: `${homepageBaseGradient} 50%, transparent 150%), url(${homepageImage})`,
        md: `${homepageBaseGradient} 50%, transparent 130%), url(${homepageImage})`,
        lg: `${homepageBaseGradient} 50%, transparent 110%), url(${homepageImage})`,
        xl: `${homepageBaseGradient} 40%, transparent 90%), url(${homepageImage})`
      },
      backgroundSize: 'cover !important'
    },
    [MONSTERS]: {
      background: {
        xxs: `linear-gradient(to bottom, ${theme.palette.base[0]} calc(0% + 50px), ${theme.palette.base[100]} calc(0% + 200px), transparent calc(0% + 5000px), transparent 100%), url(/01-062.unicorn-lair.webp)`
      }
    }
  }

  return {
    background: dinamicBackground[location.pathname].background as Background,
    backgroundSize: dinamicBackground[location.pathname].backgroundSize as BackgroundSize
  }
}
