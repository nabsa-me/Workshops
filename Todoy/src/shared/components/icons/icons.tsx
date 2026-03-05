import { IIconButtonProps, IIconFilledProps, IIconProps } from './iconsTypes'

export const Icon = ({ icon, type = '', className = '', role }: IIconProps) => {
  return (
    <span className={`material-symbols-rounded ${className} ${icon} ${type}`} role={role}>
      {icon}
    </span>
  )
}

export const IconButton = ({ icon, type, className }: IIconButtonProps) => {
  return <Icon icon={icon} type={type} className={className} role='button' />
}

export const FilledIconButton = ({ icon, className }: IIconFilledProps) => {
  return <IconButton icon={icon} className={className} type='filled' />
}
