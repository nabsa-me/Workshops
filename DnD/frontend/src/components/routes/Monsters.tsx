import * as React from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import { GradientTitle } from '../common/typography'

import { Context } from '../../context'

export function Monsters() {
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
      <GradientTitle sx={{ fontSize: '1.75rem !important' }}>Monsters</GradientTitle>
      <Divider sx={{ boxShadow: `0px 2px 5px ${theme.palette.secondary[300]}60` }} />
    </Box>
  )
}
