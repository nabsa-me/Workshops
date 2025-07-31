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
//#endregion

const palette = {
  mode: 'dark' as const,
  primary: { main: colors.gold1 },
  secondary: { main: colors.gold1 },
  text: { primary: colors.grey1, secondary: colors.gold1 },
  background: { default: 'transparent', paper: colors.black }
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
