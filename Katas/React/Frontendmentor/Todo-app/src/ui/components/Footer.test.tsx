import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer component', () => {
  it('Render with proper title and icon', () => {
    render(<Footer />)

    const footerText = screen.getByText('This is my footer')

    expect(footerText).toBeInTheDocument()
  })
})
