import { Component } from 'react'
import { Link } from '@tanstack/react-router'
import { usePizzaOfTheDay } from './usePizzaOfTheDay'

class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Error boundary caught some error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <h2>Uh oh!!</h2>
          <p>There was an error with this page.</p>
          <Link to={'/'}>Click here</Link> to go back to the home page.
        </div>
      )
    }

    return this.props.children
  }
}

function EBWithHooks() {
  const potd = usePizzaOfTheDay()
  return <ErrorBoundary potd={potd} />
}

export default ErrorBoundary
