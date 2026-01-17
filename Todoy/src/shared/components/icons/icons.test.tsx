import React from 'react'
import { render } from '@testing-library/react'
import { Icon, IconButton, FilledIconButton } from './icons'
import { IIconProps, IIconButtonProps, IIconFilledProps } from './iconsTypes'

describe('Icon', () => {
  it('renders the icon with correct classes and role', () => {
    const props: IIconProps = {
      icon: 'add',
      type: 'thin',
      className: 'custom-class',
      role: 'button'
    }

    const { getByText } = render(<Icon {...props} />)
    const el = getByText('add')

    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('material-symbols-rounded')
    expect(el).toHaveClass('custom-class')
    expect(el).toHaveClass('add')
    expect(el).toHaveClass('thin')
    expect(el).toHaveAttribute('role', 'button')
  })
})

describe('IconButton', () => {
  it('renders Icon with role button', () => {
    const props: IIconButtonProps = {
      icon: 'delete',
      type: 'bold',
      className: 'btn-class'
    }

    const { getByText } = render(<IconButton {...props} />)
    const el = getByText('delete')

    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('material-symbols-rounded')
    expect(el).toHaveClass('btn-class')
    expect(el).toHaveClass('delete')
    expect(el).toHaveClass('bold')
    expect(el).toHaveAttribute('role', 'button')
  })
})

describe('FilledIconButton', () => {
  it('renders IconButton with type filled', () => {
    const props: IIconFilledProps = {
      icon: 'check',
      className: 'filled-class'
    }

    const { getByText } = render(<FilledIconButton {...props} />)
    const el = getByText('check')

    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('material-symbols-rounded')
    expect(el).toHaveClass('filled-class')
    expect(el).toHaveClass('check')
    expect(el).toHaveClass('filled')
    expect(el).toHaveAttribute('role', 'button')
  })
})
