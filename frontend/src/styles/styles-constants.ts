export const colors = {
  white: '#ffffff',
  black: '#000000',
  // black
  black1: '#100e0d',
  black2: '#151312',
  black3: '#1d1b1a',
  black4: '#221f1e',
  black5: '#2c2928',
  black6: '#373433',
  // grey
  grey1: '#e8e1df',
  grey2: '#c8c7bd',
  grey3: '#929188',
  grey4: '#474740',
  // gold
  gold1: '#f6c960',
  gold2: '#d8ae48',
  gold3: '#594200',
  gold4: '#3f2e00',
  // green
  gr0: 'color-mix(in oklch, white, #d8c684 40%)',
  gr1: '#d8c684',
  gr2: '#a09054',
  gr3: '#82743b',
  gr4: '#685b25',
  gr5: '#3a3000',
  gr6: '#2c2400'
}

export const metalGradient = `linear-gradient(
  135deg,
  ${colors.white} 0%,
  ${colors.grey1} 10%,
  ${colors.white} 40%,
  ${colors.grey3} 100%)`

export const plainGradient = `linear-gradient(
    135deg,
    ${colors.grey1} 0%,
    ${colors.grey2} 50%,
    ${colors.gr0} 100%)`

export const logoGradient = `linear-gradient(
    135deg,
    ${colors.gr0} 0%,
    ${colors.white} 20%,
    ${colors.grey2} 30%,
    ${colors.white} 45%,
    ${colors.gr0} 65%,
    ${colors.grey1} 85%,
    ${colors.grey3} 100%)`

export const titleShadow = '0px 0px 2px rgba(231, 187, 42, 0.1), 3px 2px 3px rgba(0, 0, 0, 0.6)'
export const titleFilter = `contrast(150%) saturate(205%) drop-shadow(3px 3px ${colors.black})`
