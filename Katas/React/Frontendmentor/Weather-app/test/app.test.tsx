import { render, screen } from '@testing-library/react'
import App from '../src/App'

jest.mock('../src/ui/hooks/useFetchCity', () => ({
  useFetchCity: () => ({ coords: null })
}))

jest.mock('../src/ui/hooks/useFetchWeather', () => ({
  useFetchWeather: () => null // Simulamos que no hay forecast
}))

describe('App component', () => {
  it('muestra el mensaje de carga cuando no hay forecast', () => {
    render(<App />)

    // Buscamos el texto que debería aparecer
    const loadingText = screen.getByText(/cargando coordenadas.../i)
    expect(loadingText).toBeInTheDocument()
  })
})
