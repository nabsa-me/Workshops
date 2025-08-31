import { styled, TextField, TextFieldProps, Theme } from '@mui/material'
import { QUICK_TRANSITION } from '../../styles/styles-constants'
import { getInputProps } from './helper'

const Input = styled(TextField)(({ theme }: { theme: Theme }) => {
  const props = getInputProps(theme)

  return {
    '& .MuiInputBase-root': {
      ...props.COMMON_PROPERTIES
    },
    '& .MuiOutlinedInput-notchedOutline': {
      transition: QUICK_TRANSITION,
      border: props.BORDER_IDLE
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: props.BORDER_HOVER
    },
    '& .MuiOutlinedInput-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
      border: props.BORDER_FOCUS_HOVER
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: props.BORDER_FOCUS
    },
    '& .MuiInputLabel-root': {
      fontSize: props.LABEL_FONTSIZE,
      top: '-7px'
    },
    '& .MuiInputLabel-shrink': {
      top: '0',
      color: props.LABEL_COLOR,
      fontFamily: props.FONT_FAMILY
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: props.LABEL_COLOR
    },
    '& .MuiInputBase-input::placeholder': {
      color: props.PLACEHOLDER_COLOR,
      opacity: 1
    }
  }
})

export const InputField = (props: TextFieldProps) => {
  return <Input slotProps={{ inputLabel: { shrink: true } }} {...props} />
}
