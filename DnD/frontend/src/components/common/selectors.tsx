import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormControl, InputLabel, styled, Theme, useTheme } from '@mui/material'
import { getInputProps } from './helper'
import { QUICK_TRANSITION } from '../../styles/styles-constants'
import { useRef, useState } from 'react'

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

const MultipleSelector = styled(Select)(({ theme }: { theme: Theme }) => {
  const props = getInputProps(theme)

  return {
    ...props.COMMON_PROPERTIES,
    '& .MuiOutlinedInput-notchedOutline': {
      border: props.BORDER_IDLE,
      transition: QUICK_TRANSITION
    },
    '&:hover .MuiOutlinedInput-notchedOutline': { border: props.BORDER_HOVER },
    '& .MuiOutlinedInput-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
      { border: props.BORDER_FOCUS_HOVER },
    '& em': { color: props.PLACEHOLDER_COLOR, fontStyle: 'normal' },
    '& .MuiSvgIcon-root': { color: theme.palette.negative[300] }
  }
})

const SelectorInputLabel = styled(InputLabel)(({ theme }: { theme: Theme }) => {
  const props = getInputProps(theme)

  return {
    color: props.LABEL_COLOR,
    fontFamily: props.FONT_FAMILY,
    fontSize: props.LABEL_FONTSIZE,
    '&.Mui-focused': {
      color: props.LABEL_COLOR
    }
  }
})

const DropDownListItem = styled(MenuItem)(({ theme }: { theme: Theme }) => {
  const props = getInputProps(theme)

  return {
    backgroundColor: theme.palette.base[0],
    fontSize: '0.9rem',
    color: theme.palette.negative[300],
    height: '35px',
    transition: QUICK_TRANSITION,
    fontFamily: props.FONT_FAMILY,
    ':first-of-type': {
      fontWeight: 'bold'
    },
    '&:hover': {
      backgroundColor: `${theme.palette.base[200]} !important`,
      opacity: 1,
      color: theme.palette.negative[200]
    },
    '&.Mui-selected': {
      boxSizing: 'border-box',
      border: `1px solid ${theme.palette.base[500]}`,
      backgroundColor: theme.palette.base[100],
      color: theme.palette.negative[100],
      fontWeight: 'bold'
    }
  }
})

export function MultipleSelectorPlaceholder({ label, placeholder }: { label: string; placeholder: string }) {
  const [personName, setPersonName] = useState<string[]>([])
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom')
  const inputRef = useRef<HTMLDivElement | null>(null)
  const theme = useTheme()

  const handleOnOpen = () => {
    if (inputRef.current) {
      const { bottom } = inputRef.current.getBoundingClientRect()
      const menuSpace = window.innerHeight - bottom
      setMenuPosition(menuSpace < 300 ? 'top' : 'bottom')
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value }
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  const renderSelectedValues = (selected: string[]): React.ReactNode => {
    if (selected.length === 0) {
      return <em>{placeholder}</em>
    }
    return selected.join(', ')
  }

  return (
    <FormControl>
      <SelectorInputLabel shrink>{label}</SelectorInputLabel>
      <MultipleSelector
        multiple
        displayEmpty
        ref={inputRef}
        label={label}
        value={personName}
        onOpen={handleOnOpen}
        onChange={(event) => handleChange(event as SelectChangeEvent)}
        renderValue={(selected) => renderSelectedValues(selected as string[])}
        MenuProps={{
          anchorOrigin: {
            vertical: menuPosition === 'bottom' ? 'bottom' : 'top',
            horizontal: 'center'
          },
          transformOrigin: {
            vertical: menuPosition === 'bottom' ? 'top' : 'bottom',
            horizontal: 'center'
          },
          PaperProps: {
            sx: {
              marginTop: menuPosition === 'top' ? '-10px !important' : '1px !important',
              maxHeight: '300px',
              border: `1px solid ${theme.palette.base[500]}`,
              boxShadow:
                menuPosition === 'top'
                  ? `0px -1px 5px ${theme.palette.negative[400]}, 0px -8px 15px 8px ${theme.palette.base[0]}`
                  : `0px 1px 5px ${theme.palette.negative[400]}, 0px 8px 15px 8px ${theme.palette.base[0]}`
            }
          }
        }}
      >
        <DropDownListItem value=''>
          <em>Select All / Select None</em>
        </DropDownListItem>
        {names.map((name) => (
          <DropDownListItem key={name} value={name}>
            {name}
          </DropDownListItem>
        ))}
      </MultipleSelector>
    </FormControl>
  )
}
