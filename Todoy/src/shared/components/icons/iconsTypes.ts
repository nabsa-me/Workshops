type IconType = 'bold' | 'filled' | 'thin' | ''
type IconRole = 'button'

export interface IIconProps {
  icon: string
  className?: string
  type?: IconType
  role?: IconRole
}

export interface IIconButtonProps {
  icon: string
  className?: string
  type?: 'bold' | 'filled' | 'thin'
}

export interface IIconFilledProps {
  icon: string
  className?: string
}
