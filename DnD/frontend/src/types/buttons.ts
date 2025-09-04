import { SxProps, Theme } from '@mui/material'

export interface MenuIconButtonProps {
  menuIsOpen: boolean
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  firstIcon: React.ReactNode
  secondIcon: React.ReactNode
  sx?: SxProps<Theme>
}
