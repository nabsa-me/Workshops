import * as React from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import { CTAButton } from '../common/buttons'
import { HeroSubtitle } from '../common/typography'

import { useNavigate } from 'react-router'
import { Context } from '../../context'
import { HOMEPAGE } from '../../constants'

export function Monsters() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { isSmallScreen } = React.useContext(Context)

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '0 3rem',
        marginTop: isSmallScreen ? '14rem' : '4rem'
      }}
    >
      <HeroSubtitle>Monsters</HeroSubtitle>
      <Divider
        sx={{
          borderWidth: '1px',
          borderColor: `${theme.palette.negative[200]}60`,
          boxShadow: `-1px 1px 5px ${theme.palette.secondary[300]}80, -2px 2px 10px ${theme.palette.base[300]}`
        }}
      />

      <CTAButton onClick={() => navigate(HOMEPAGE)} sx={{ alignSelf: 'center', mt: '3rem' }}>
        Play Now!
      </CTAButton>
    </Box>
  )
}
