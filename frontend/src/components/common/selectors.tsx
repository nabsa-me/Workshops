import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormControl, InputLabel, styled, Theme, useTheme } from '@mui/material'
import { getInputProps } from './helper'
import { QUICK_TRANSITION } from '../../styles/styles-constants'
import { useRef, useState } from 'react'
import { SelectorPlaceholderProps } from '../../types/selectors'

const Selector = styled(Select)(({ theme }: { theme: Theme }) => {
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

export const SelectorPlaceholder = ({ label, placeholder, options }: SelectorPlaceholderProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom')
  const inputRef = useRef<HTMLDivElement | null>(null)
  const theme = useTheme()

  const handleOnOpen = () => {
    if (inputRef.current) {
      const { bottom } = inputRef.current.getBoundingClientRect()
      const menuSpace = window.innerHeight - bottom
      setMenuPosition(menuSpace < 300 ? 'top' : 'bottom')
    }
    requestAnimationFrame(() => {
      document.getElementsByClassName('MuiPopover-paper')[0]?.scrollTo(0, 0)
    })
  }

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value

    if (value.includes('Select All')) {
      setSelectedValues(options || [])
      requestAnimationFrame(() => {
        document.getElementsByClassName('MuiPopover-paper')[0].scrollTo(0, 0)
      })
    } else if (value.includes('Select None')) {
      setSelectedValues([])
    } else {
      setSelectedValues(typeof value === 'string' ? value.split(',') : value)
    }
  }

  const renderSelectedValues = (selected: string[]): React.ReactNode => {
    if (selected.length === 0) {
      return <em>{placeholder}</em>
    }
    return selected.join(', ')
  }

  return (
    <FormControl className={options.length ? '' : 'disabled'} disabled={!options.length}>
      <SelectorInputLabel shrink>{label}</SelectorInputLabel>
      <Selector
        multiple
        displayEmpty
        ref={inputRef}
        label={label}
        value={selectedValues}
        onOpen={handleOnOpen}
        onChange={(event) => handleChange(event as SelectChangeEvent)}
        renderValue={(selected) => renderSelectedValues(selected as string[])}
        MenuProps={{
          ref: inputRef,
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
        <DropDownListItem value={selectedValues.length === options.length ? 'Select None' : 'Select All'}>
          <em>{selectedValues.length === options.length ? 'Select None' : 'Select All'}</em>
        </DropDownListItem>
        {options.map((option) => (
          <DropDownListItem key={option} value={option}>
            {option}
          </DropDownListItem>
        ))}
      </Selector>
    </FormControl>
  )
}
