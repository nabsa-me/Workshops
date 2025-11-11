import { render, screen } from '@testing-library/react'
import { Menu } from './Menu'

describe('Menu component', () => {
  it('render component and its children', () => {
    render(<Menu />)
    const buttonsBox = document.getElementsByClassName('buttons-box')
    expect(buttonsBox[0]).toBeInTheDocument()

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})
