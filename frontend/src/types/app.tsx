import { SxProps, Theme } from '@mui/material'

export interface MenuIconButtonProps {
  menuIsOpen: boolean
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  firstIcon: React.ReactNode
  secondIcon: React.ReactNode
  sx?: SxProps<Theme>
}

type Breakpoints = {
  ['xxs']?: 'xxs'
  ['xs']?: 'xs'
  ['sm']?: 'sm'
  ['md']?: 'md'
  ['lg']?: 'lg'
  ['xl']?: 'xl'
}

export type Background = Partial<Record<keyof Breakpoints, string>>
export type BackgroundSize = string

interface BackgroundImage {
  background: Background
  backgroundSize?: BackgroundSize
}

export type DinamicBackground = Record<string, BackgroundImage>
