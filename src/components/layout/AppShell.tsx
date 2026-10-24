import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import type { Theme } from '../../types'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('lifeos-theme') as Theme | null) ?? 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('lifeos-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <div className="app-shell">
      <div className={`drawer-backdrop ${mobileMenuOpen ? 'drawer-backdrop--visible' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <div className="main-column">
        <Header onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  )
}
