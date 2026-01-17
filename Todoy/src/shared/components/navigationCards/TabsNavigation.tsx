import { ITabsCard, ITabsNavigation } from './navigationCardsTypes'

const TabsNavigation = ({ setActiveTab, activeTab, tabsList }: ITabsNavigation) => {
  return (
    <div className='tabsList'>
      {tabsList.map((tab: string) => (
        <TabNavigationCard setActiveTab={setActiveTab} activeTab={activeTab} title={tab} key={`tabsList-${tab}`} />
      ))}
    </div>
  )
}

const TabNavigationCard = ({ setActiveTab, activeTab, title }: ITabsCard) => {
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
