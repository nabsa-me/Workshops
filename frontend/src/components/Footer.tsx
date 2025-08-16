import { Box, Typography } from '@mui/material'
import { colors } from '../styles/styles-constants'

const year = new Date().getFullYear()
export const Footer = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${colors.black1} 75%, transparent 125%)`,
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid${colors.black4}`,
        height: '85px',
        boxShadow: `5px 0 10px ${colors.black1}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant='logo' sx={{ fontSize: '0.95rem !important', paddingRight: '0', paddingBottom: '0.1rem' }}>
        Drakia
      </Typography>
      <Typography
        variant='h2'
        sx={{ fontSize: '0.8rem !important', marginTop: '0.1rem', fontFamily: "'Montaga' !important", opacity: '0.8' }}
      >
        {year} nabsa.me | All rights reserved
      </Typography>
    </Box>
  )
}
