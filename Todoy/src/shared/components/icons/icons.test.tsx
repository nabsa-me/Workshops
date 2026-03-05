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

  it('renders with minimal props (defaults)', () => {
    const { getByText } = render(<Icon icon='home' />)
    const el = getByText('home')

    expect(el).toBeInTheDocument()
    // className undefined results in just base plus icon, type undefined is empty string
    expect(el.className).toMatch(/material-symbols-rounded/)
    expect(el.className).toMatch(/home/)
    // should not include "undefined" or extra spaces (two spaces allowed)
    expect(el.className).not.toContain('undefined')
    expect(el).not.toHaveAttribute('role')
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

  it('applies defaults when optional props omitted', () => {
    const { getByText } = render(<IconButton icon='star' />)
    const el = getByText('star')

    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('material-symbols-rounded')
    expect(el).toHaveClass('star')
    // no type or className -> no extra class segments except blanks
    expect(el.className).not.toContain('undefined')
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

  it('renders without className prop', () => {
    const { getByText } = render(<FilledIconButton icon='close' />)
    const el = getByText('close')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('filled')
    expect(el.className).not.toContain('undefined')
  })
})
