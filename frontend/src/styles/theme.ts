import { createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { colors } from './styles-constants'
import { typographyVariants } from './variants/tipography'
import { CTAButtonProps } from './variants/button'

//#region EXTENDED INTERFACES
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logo: true
    hero: true
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    CTA: true
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsVariantOverrides {
    glass: true
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true
    xs: true
    sm: true
    md: true
    mdd: true
    lg: true
    xl: true
  }
}
//#endregion

const palette = {
  mode: 'dark' as const,
  primary: { main: colors.gold1 },
  secondary: { main: colors.grey1 },
  text: { primary: colors.grey1, secondary: colors.grey1 },
  background: { default: 'transparent' }
}

export const theme = createTheme(
  deepmerge(
    {
      palette,
      typography: typographyVariants,
      breakpoints: {
        values: {
          z: 0,
          xxs: 320,
          xs: 375,
          sm: 425,
          md: 600,
          mdd: 768,
          lg: 1024,
          xl: 1440
        }
      },
      components: {
        MuiButton: {
          variants: [
            {
              props: { variant: 'CTA' },
              style: CTAButtonProps
            }
          ],
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: '0.5rem'
            }
          }
        }
      }
    },
    {}
  )
)
