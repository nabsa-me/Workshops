import * as React from 'react'
import { PrimaryNavBar } from './components/navigation'

const navItems = ['Tools', 'Player', 'Rules', 'Sources']

export function Header() {
  return <PrimaryNavBar navItems={navItems} />
}
