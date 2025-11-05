import { render, screen } from '@testing-library/react'
import { MainCard } from '../src/ui/components/cards'

describe('MainCard component', () => {
  const forecast = undefined
  it('renders correctly', () => {
    render(<MainCard coords={{ name: 'Barcelona', latitude: '41.38', longitude: '2.17' }} forecast={forecast} />)
    expect(screen.getByText(/Barcelona/i)).toBeInTheDocument()
  })
})
