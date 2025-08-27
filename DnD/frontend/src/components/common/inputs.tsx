import { styled, TextField, TextFieldProps } from '@mui/material'
import { QUICK_TRANSITION } from '../../styles/styles-constants'

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    color: theme.palette.negative[100],
    backgroundColor: theme.palette.base[100],
    fontSize: '0.95rem',
    fontFamily: "'Montaga', serif",
    height: '40px'
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.negative[400],
    transition: QUICK_TRANSITION
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.negative[300]}95`
  },
  '& .MuiOutlinedInput-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.negative[300]
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.negative[300]}95`,
    borderWidth: '1px'
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
    top: '-7px'
  },
  '& .MuiInputLabel-shrink': {
    top: '0'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.negative[200]
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.negative[300]
  }
}))

export const InputField = (props: TextFieldProps) => {
  return <Input slotProps={{ inputLabel: { shrink: true } }} {...props} />
}
