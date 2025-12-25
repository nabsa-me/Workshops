import React, { useState } from 'react'
import { MainRoutesListProps, mainRouteType, routeItemType, siteMapType, SubRoutesListProps } from '../../utils/siteMap'

const MainRoutesList = ({ handleMouseEnter, siteMap }: MainRoutesListProps) => {
  return (
    <li style={{ flexFlow: 'row' }}>
      {Object.keys(siteMap).length
        ? Object.keys(siteMap).map((mainRoute, index) => (
            <ul
              onMouseEnter={() => handleMouseEnter(mainRoute as mainRouteType)}
              className='route-label'
              key={mainRoute + index}
            >
              {mainRoute}
            </ul>
          ))
        : null}
    </li>
  )
}

const SubRoutesList = ({ mainRoute, auxNavbarVisibility }: SubRoutesListProps) => {
  return (
    <li>
      {mainRoute.map((subRoute: routeItemType, index: number) => (
        <ul
          className={`route-label ${auxNavbarVisibility} ${!subRoute.route && 'disabled'}`}
          key={subRoute.label + index}
        >
          {subRoute.label}
        </ul>
      ))}
    </li>
  )
}

export const DesktopNavBar = ({ siteMap }: { siteMap: siteMapType }) => {
  const [mainRoute, setMainRoute] = useState<mainRouteType | ''>('')
  const [auxNavbarVisibility, setAuxNavbarVisibitlity] = useState<'hide' | 'show'>('hide')

  const handleMouseEnter = (label: mainRouteType) => {
    setMainRoute(label)
    setAuxNavbarVisibitlity('show')
  }

  const handleMouseLeave = () => {
    setAuxNavbarVisibitlity('hide')
    setTimeout(() => setMainRoute(''), 150)
  }

  return (
    <header className='desktop-header' onMouseLeave={handleMouseLeave}>
      <div className='blur main-navbar'>
        <div>LOGO</div>
        <MainRoutesList handleMouseEnter={handleMouseEnter} siteMap={siteMap} />
      </div>
      <div className={`blur aux-navbar ${auxNavbarVisibility}`}>
        {mainRoute.length && mainRoute !== '' ? (
          <SubRoutesList mainRoute={siteMap[mainRoute]} auxNavbarVisibility={auxNavbarVisibility} />
        ) : null}
      </div>
    </header>
  )
}
