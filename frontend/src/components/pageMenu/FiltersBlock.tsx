import { Box, Stack } from '@mui/material'
import { useLayoutEffect, useRef, useState } from 'react'
import { TextBody } from '../common/typography'
import { MenuIconButton } from '../common/buttons'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { SectionDivider } from '../common/boxes'
import { QUICK_TRANSITION } from '../../styles/styles-constants'

export const FiltersBlock = ({ children, ...props }: { children: React.ReactNode; title: string }) => {
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(true)
  const [contentHeight, setContentHeight] = useState<number>(1000)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight)
  }, [children])

  return (
    <Stack ref={contentRef}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <TextBody>{props.title}</TextBody>
        <MenuIconButton
          sx={{ scale: '0.75', opacity: '0.7', marginBottom: '-0.5rem' }}
          firstIcon={<RemoveIcon />}
          secondIcon={<AddIcon />}
          menuIsOpen={filterIsOpen}
          setMenuIsOpen={setFilterIsOpen}
        />
      </Box>
      <SectionDivider sx={{ marginBottom: '1.75rem' }} />
      <Stack
        spacing={2.5}
        sx={{
          maxHeight: filterIsOpen ? contentHeight : '0px',
          transition: `${QUICK_TRANSITION}`,
          opacity: filterIsOpen ? 1 : 0,
          marginBottom: filterIsOpen ? '2rem' : '0rem'
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}
