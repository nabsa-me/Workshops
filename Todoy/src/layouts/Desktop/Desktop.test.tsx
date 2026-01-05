import { act, fireEvent, render } from '@testing-library/react'
import DesktopLayout from './DesktopLayout'
import DesktopSideBar from './DesktopSideBar'

const DESKTOP_NAVBAR = '.desktop-navBar'
const DESKTOP_SIDEBAR = '.desktop-sideBar'

describe('DesktopLayout', () => {
  it('renders layout structure', () => {
    render(<DesktopLayout />)

    expect(document.querySelector('.desktop-appRoot-fullPage')).toBeInTheDocument()
    expect(document.querySelector('.desktop-main')).toBeInTheDocument()
  })

  it('renders all layout children', () => {
    render(<DesktopLayout />)

    expect(document.querySelector(DESKTOP_NAVBAR)).toBeInTheDocument()
    expect(document.querySelector(DESKTOP_SIDEBAR)).toBeInTheDocument()
    expect(document.querySelector('.homePage-wrapper')).toBeInTheDocument()
  })

  it('sidebar is visible by default', () => {
    render(<DesktopLayout />)

    const sideBar = document.querySelector(DESKTOP_SIDEBAR)
    expect(sideBar).not.toHaveClass('hidden')
  })

  it('clicking navbar toggle hides and shows sidebar', () => {
    render(<DesktopLayout />)

    const navBar = document.querySelector(DESKTOP_NAVBAR)
    const sideBar = document.querySelector(DESKTOP_SIDEBAR)

    expect(sideBar).not.toHaveClass('hidden')

    act(() => fireEvent.click(navBar!))
    expect(sideBar).toHaveClass('hidden')

    fireEvent.click(navBar!)
    expect(sideBar).not.toHaveClass('hidden')
  })
})

describe('DesktopSideBar', () => {
  it('renders the component and children', () => {
    render(<DesktopSideBar sideBarHidden='' />)

    expect(document.querySelector('.desktop-sideBar')).toBeInTheDocument()
    expect(document.querySelector('.desktop-sideBar-body-topLinks')).toBeInTheDocument()
    expect(document.querySelector('.desktop-sideBar-footer')).toBeInTheDocument()
  })

  it('scrollBar is hidden at first render', () => {
    render(<DesktopSideBar sideBarHidden='' />)

    const scrollableSideBar = document.querySelector('.desktop-sideBar-body-scrollable')
    expect(scrollableSideBar).toHaveClass('hidden')
  })

  it('scrollBar shows and hide on mouse enter and leave', () => {
    render(<DesktopSideBar sideBarHidden='' />)

    const scrollableSideBar = document.querySelector('.desktop-sideBar-body-scrollable')
    expect(scrollableSideBar).toHaveClass('hidden')

    act(() => fireEvent.mouseEnter(scrollableSideBar!))
    expect(scrollableSideBar).not.toHaveClass('hidden')

    act(() => fireEvent.mouseLeave(scrollableSideBar!))
    expect(scrollableSideBar).toHaveClass('hidden')
  })
})
