import { render, screen, fireEvent } from '@testing-library/react'
import TabsNavigation from './TabsNavigation'
import React from 'react'
import SideBarNavigationCard from './SideBarNavigationCard'

describe('TabNavigationCard', () => {
  const tabsList = ['Active', 'Completed', 'Deleted']

  it('renders all tabs from tabsList', () => {
    render(<TabsNavigation activeTab='Active' setActiveTab={jest.fn()} tabsList={tabsList} />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(tabsList.length)

    tabsList.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument()
    })
  })

  it('applies active class only to the active tab', () => {
    render(<TabsNavigation activeTab='Completed' setActiveTab={jest.fn()} tabsList={tabsList} />)

    const activeTab = screen.getByText('Completed')
    const inactiveTab = screen.getByText('Active')

    expect(activeTab).toHaveClass('active')
    expect(inactiveTab).not.toHaveClass('active')
  })

  it('renders active decoration only for the active tab', () => {
    render(<TabsNavigation activeTab='Deleted' setActiveTab={jest.fn()} tabsList={tabsList} />)

    const deletedTab = screen.getByText('Deleted')
    const decoration = deletedTab.querySelector('.tabNavigationCard-decoration')

    expect(decoration).toHaveClass('active')
  })

  it('calls setActiveTab with correct title when a tab is clicked', () => {
    const setActiveTab = jest.fn()

    render(<TabsNavigation activeTab='Active' setActiveTab={setActiveTab} tabsList={tabsList} />)

    fireEvent.click(screen.getByText('Completed'))

    expect(setActiveTab).toHaveBeenCalledTimes(1)
    expect(setActiveTab).toHaveBeenCalledWith('Completed')
  })

  it('still calls setActiveTab when clicking the already-active tab', () => {
    const setActiveTab = jest.fn()
    render(<TabsNavigation activeTab='Active' setActiveTab={setActiveTab} tabsList={tabsList} />)

    fireEvent.click(screen.getByText('Active'))
    expect(setActiveTab).toHaveBeenCalledWith('Active')
  })

  it('renders no tabs when tabsList is empty', () => {
    const setActiveTab = jest.fn()
    render(<TabsNavigation activeTab='' setActiveTab={setActiveTab} tabsList={[]} />)

    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })

  it('renders tabs but no active class when activeTab is not in list', () => {
    const setActiveTab = jest.fn()
    render(<TabsNavigation activeTab='Unknown' setActiveTab={setActiveTab} tabsList={tabsList} />)

    const tabs = screen.getAllByRole('tab')
    tabs.forEach((tab) => {
      expect(tab).not.toHaveClass('active')
      const decoration = tab.querySelector('.tabNavigationCard-decoration')
      expect(decoration).not.toHaveClass('active')
    })
  })
})

describe('TabsNavigation', () => {
  const tabsList = ['Active', 'Completed', 'Deleted']

  const TabsNavigationWrapper = () => {
    const [activeTab, setActiveTab] = React.useState('Active')

    return (
      <>
        <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabsList={tabsList} />
        <div data-testid='active-tab'>{activeTab}</div>
      </>
    )
  }

  it('changes active tab when another tab is clicked (full integration)', () => {
    render(<TabsNavigationWrapper />)

    const activeTab = screen.getByRole('tab', { name: 'Active' })
    const completedTab = screen.getByRole('tab', { name: 'Completed' })

    expect(activeTab).toHaveClass('active')
    expect(completedTab).not.toHaveClass('active')

    fireEvent.click(completedTab)

    expect(completedTab).toHaveClass('active')
    expect(activeTab).not.toHaveClass('active')
  })
})

describe('SideBarNavigationCard', () => {
  it('renders the icon and label correctly', () => {
    render(<SideBarNavigationCard label='Dashboard' icon='home' />)

    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders the correct DOM structure', () => {
    render(<SideBarNavigationCard label='Settings' icon='settings' />)

    const icon = screen.getByText('settings')
    const label = screen.getByText('Settings')

    expect(icon).toHaveClass('sideBar-icon')
    expect(label.tagName.toLowerCase()).toBe('p')

    const container = icon.closest('.sideBar-navigationCard')
    expect(container).toBeInTheDocument()
  })

  it('renders different values for different props', () => {
    render(<SideBarNavigationCard label='Profile' icon='person' />)

    expect(screen.getByText('person')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('handles empty label or icon gracefully', () => {
    render(<SideBarNavigationCard label='' icon='' />)
    // component should render with empty text but still have structure
    const container = document.querySelector('.sideBar-navigationCard')
    expect(container).toBeTruthy()
    const icon = container?.querySelector('.sideBar-icon')
    expect(icon).toBeTruthy()
    const paragraph = container?.querySelector('p')
    expect(paragraph).toBeTruthy()
  })
})
