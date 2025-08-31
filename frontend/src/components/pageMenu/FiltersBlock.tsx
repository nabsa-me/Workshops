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
  const [stackAvailable, setStackAvailable] = useState<boolean>(true)
  const [contentHeight, setContentHeight] = useState<number>(1000)

  const contentRef = useRef<HTMLDivElement>(null)
  const { top } = contentRef.current?.getBoundingClientRect() || { top: 0 }

  useLayoutEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight)
  }, [children])

  const handleFilterIsOpen = () => {
    if (filterIsOpen) {
      setFilterIsOpen(!filterIsOpen)
      setTimeout(() => {
        setStackAvailable(!stackAvailable)
      }, 300)
    } else {
      setStackAvailable(!stackAvailable)
      setTimeout(() => {
        setFilterIsOpen(!filterIsOpen)
      }, 300)
    }
  }

  return (
    <Stack ref={contentRef} width='100%'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <TextBody>{props.title}</TextBody>
        <MenuIconButton
          sx={{ scale: '0.75', opacity: '0.7', marginBottom: '-0.5rem' }}
          firstIcon={<RemoveIcon />}
          secondIcon={<AddIcon />}
          menuIsOpen={filterIsOpen}
          setMenuIsOpen={handleFilterIsOpen}
        />
      </Box>
      <SectionDivider sx={{ marginBottom: '1.5rem' }} />
      <Stack
        spacing={3}
        sx={{
          maxHeight: filterIsOpen ? contentHeight : '0px',
          transition: `${QUICK_TRANSITION}`,
          transform: stackAvailable ? 'translateY(0px)' : `translateY(calc(-${top}px - ${contentHeight}px))`,
          opacity: filterIsOpen ? 1 : 0,
          marginBottom: filterIsOpen ? '2rem' : '0rem'
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}
