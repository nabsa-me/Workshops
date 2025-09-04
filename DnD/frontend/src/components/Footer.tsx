import { Box, useTheme } from '@mui/material'
import { GradientTitle } from './common/typography'
import { LogoToHome } from './common/buttons'

const year = new Date().getFullYear()

export const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 50%, transparent 175%)`,
        backdropFilter: 'blur(15px)',
        borderTop: `1px solid ${theme.palette.base[300]}`,
        height: '85px',
        boxShadow: `0px -3px 15px -5px ${theme.palette.base[200]}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ scale: '0.65', paddingLeft: '1.5rem', marginBottom: '-0.25rem', marginTop: '-0.25rem' }}>
        <LogoToHome />
      </Box>
      <GradientTitle
        sx={{ fontSize: '0.8rem !important', marginTop: '0.1rem', fontFamily: "'Montaga' !important", opacity: '0.8' }}
      >
        {year} nabsa.me | All rights reserved
      </GradientTitle>
    </Box>
  )
}
