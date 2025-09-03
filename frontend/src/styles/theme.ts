import { createTheme, ThemeOptions } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { colors } from './styles-constants'
import { PaletteColorOptions } from '@mui/material/styles'

//#region EXTENDED INTERFACES
declare module '@mui/material/styles' {
  interface Palette {
    base: PaletteColor
    negative: PaletteColor
    accent: PaletteColor
    neutral: PaletteColor
  }

  interface PaletteColor {
    0?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    main: string
  }
  interface PaletteOptions {
    base?: PaletteColorOptions
    negative?: PaletteColorOptions
    accent?: PaletteColorOptions
    neutral?: PaletteColorOptions
  }

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
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    hero: true
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    base: true
    negative: true
    accent: true
    neutral: true
  }
}
//#endregion

const commonThemeProps: ThemeOptions = {
  breakpoints: {
    values: {
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
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px'
        }
      }
    }
  }
}

const darkPalette = {
  base: {
    0: colors['black'],
    100: colors['black1'],
    200: colors['black2'],
    300: colors['black3'],
    400: colors['black4'],
    500: colors['black5'],
    600: colors['black6']
  },
  negative: {
    0: colors['white'],
    100: colors['grey1'],
    200: colors['grey2'],
    300: colors['grey3'],
    400: colors['grey4']
  },
  primary: {
    100: colors['gold1'],
    200: colors['gold2'],
    300: colors['gold3'],
    400: colors['gold4'],
    main: colors['gold1']
  },
  secondary: {
    0: colors['gr0'],
    100: colors['gr1'],
    200: colors['gr2'],
    300: colors['gr3'],
    400: colors['gr4'],
    500: colors['gr5'],
    600: colors['gr6'],
    main: colors['gr1']
  }
}

const lightPalette = {
  negative: {
    0: colors['black'],
    100: colors['black1'],
    200: colors['black2'],
    300: colors['black3'],
    400: colors['black4'],
    500: colors['black5'],
    600: colors['black6']
  },
  base: {
    400: colors['white'],
    300: colors['grey1'],
    200: colors['grey2'],
    100: colors['grey3'],
    0: colors['grey4']
  },
  primary: {
    100: colors['gold1'],
    200: colors['gold2'],
    300: colors['gold3'],
    400: colors['gold4'],
    main: colors['gold1']
  },
  secondary: {
    600: colors['gr0'],
    500: colors['gr1'],
    400: colors['gr2'],
    300: colors['gr3'],
    200: colors['gr4'],
    100: colors['gr5'],
    0: colors['gr6'],
    main: colors['gr1']
  }
}

export const darkTheme = createTheme(deepmerge({ palette: { ...darkPalette, mode: 'dark' }, ...commonThemeProps }, {}))
export const lightTheme = createTheme(
  deepmerge({ palette: { ...lightPalette, mode: 'light' }, ...commonThemeProps }, {})
)
