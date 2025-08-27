import * as React from 'react'
import { Box } from '@mui/material'
import { GradientTitle } from '../common/typography'

import { Context } from '../../context'
import { SectionDivider } from '../common/boxes'

export const Monsters = () => {
  const { isSmallScreen } = React.useContext(Context)

  return (
    <Box sx={{ width: '100%', height: '100%', padding: '0 3rem', marginTop: isSmallScreen ? '14rem' : '4rem' }}>
      <GradientTitle sx={{ fontSize: '1.75rem !important' }}>Monsters</GradientTitle>
      <SectionDivider />
    </Box>
  )
}
