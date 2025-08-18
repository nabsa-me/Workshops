import { Box, useTheme } from '@mui/material'
import { GradientTitle, Logo } from './common/typography'

const year = new Date().getFullYear()

export function Footer() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 50%, transparent 175%)`,
        backdropFilter: 'blur(15px)',
        borderTop: `1px solid ${theme.palette.base[300]}`,
        height: '85px',
        boxShadow: `0px -3px 15px -5px ${theme.palette.base[300]}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Logo sx={{ fontSize: '0.95rem !important', paddingRight: '0', paddingBottom: '0.1rem' }}>Drakia</Logo>
      <GradientTitle
        sx={{ fontSize: '0.8rem !important', marginTop: '0.1rem', fontFamily: "'Montaga' !important", opacity: '0.8' }}
      >
        {year} nabsa.me | All rights reserved
      </GradientTitle>
    </Box>
  )
}
