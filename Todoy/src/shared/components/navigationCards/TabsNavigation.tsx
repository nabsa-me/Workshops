import { Dispatch, SetStateAction } from 'react'

const TabsNavigation = ({
  setActiveTab,
  activeTab,
  tabsList
}: {
  setActiveTab: Dispatch<SetStateAction<string>>
  activeTab: string
  tabsList: string[]
}) => {
  return (
    <div className='tabsList'>
      {tabsList.map((tab: string) => (
        <TabNavigationCard setActiveTab={setActiveTab} activeTab={activeTab} title={tab} key={`tabsList-${tab}`} />
      ))}
    </div>
  )
}

const TabNavigationCard = ({
  setActiveTab,
  activeTab,
  title
}: {
  setActiveTab: Dispatch<SetStateAction<string>>
  activeTab: string
  title: string
}) => {
  return (
    <span
      className={`tabNavigationCard ${activeTab === title ? 'active' : ''}`}
      role='tab'
      onClick={() => setActiveTab(title)}
    >
      {title}
      <div className={`tabNavigationCard-decoration ${activeTab === title ? 'active' : ''}`}></div>
    </span>
  )
}

export default TabsNavigation
