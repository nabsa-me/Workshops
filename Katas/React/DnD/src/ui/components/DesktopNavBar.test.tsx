import { fireEvent, render, screen } from '@testing-library/react'
import { DesktopNavBar } from './DesktopNavBar'
import { siteMapType } from '../../utils/siteMap'

const mockedSiteMap = {
  ['Tools']: [{ label: 'Loots', route: '' }],
  ['Player']: [{ label: 'Classes', route: '' }],
  ['Rules']: [{ label: 'Monsters', route: '' }],
  ['Sources']: [{ label: 'Adventures', route: '' }]
}

describe('initial, basic and dinamic render', () => {
  test('logo item is properly rendered', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)
    expect(screen.getByText('LOGO')).toBeInTheDocument()
  })

  test('header is rendered properly', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  test('main navbar and aux navbar renders', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)
    expect(document.querySelector('.main-navbar')).toBeInTheDocument()
    expect(document.querySelector('.aux-navbar')).toBeInTheDocument()
  })

  test('MainRoutesList renders as many mainRoutes as there are in the SiteMap correctly', () => {
    const { container } = render(<DesktopNavBar siteMap={mockedSiteMap} />)

    Object.keys(mockedSiteMap).forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument()
    })
    expect(container.getElementsByClassName('route-label')).toHaveLength(Object.keys(mockedSiteMap).length)
  })

  test('MainRoutesList renders nothing if SiteMap is {}', () => {
    const { container } = render(<DesktopNavBar siteMap={{} as siteMapType} />)
    expect(container.getElementsByClassName('route-label')).toHaveLength(0)
  })
})

describe('mainRoute state', () => {
  test('its initial state is "" and there is no SubRouteList elements rendered', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)
    const auxNavBar = document.querySelector('.aux-navbar')
    expect(auxNavBar?.querySelector('li')).not.toBeInTheDocument()
  })

  test('on hover on Tools, mainRoute changes to Tools', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)

    const tools = screen.getByText('Tools')
    fireEvent.mouseEnter(tools)

    const auxNavbar = document.querySelector('.aux-navbar')
    expect(auxNavbar).toHaveClass('show')
    expect(screen.getByText('Loots')).toBeInTheDocument()
  })

  test('on several hover mainRoute changes correctly and shows siteMaps elements', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)

    fireEvent.mouseEnter(screen.getByText('Tools'))
    expect(screen.getByText('Loots')).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByText('Player'))
    expect(screen.getByText('Classes')).toBeInTheDocument()
  })
  // test('it is "" after timeout', () => {})
})

describe('auxNavbarVisibility state', () => {
  test('its initial state is "hide"', () => {
    render(<DesktopNavBar siteMap={mockedSiteMap} />)
    const auxNavBar = document.querySelector('.aux-navbar')
    expect(auxNavBar).toHaveClass('hide')
    expect(auxNavBar).not.toHaveClass('show')
  })

  // test('changes back to "hide" on MouseLeave', () => {})
})

describe.skip('SubRoutesList render and state', () => {
  test('it renders when mainRoute is !== ""', () => {})
  test('it renders as many elements as there are in the SiteMap route', () => {})
  test('the labels rendered are correct', () => {})
  test('element renders disabled when route is ""', () => {})
  test('SubRoutesList elements are updaetd when mainRoute changes', () => {})
})
