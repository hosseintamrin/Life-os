import { LogOut, X, Moon, Settings2, Sun, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navGroups, settingsNav } from '../../data/navigation'
import type { Theme } from '../../types'
import { SoftButton } from '../ui'
import { useAuth } from '../../state/AuthContext'

export function Sidebar({ isOpen, onClose, theme, onToggleTheme }: { isOpen: boolean; onClose: () => void; theme: Theme; onToggleTheme: () => void }) {
  const { profile, logout } = useAuth()
  const SettingsIcon = settingsNav.icon
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-label="ناوبری اصلی">
      <div className="sidebar__topline" />
      <div className="sidebar__brand-row">
        <div className="brand-mark" aria-hidden="true"><span /></div>
        <div className="brand-copy">
          <strong>Life OS</strong>
          <span>اتاق فرمان تو</span>
        </div>
        <SoftButton variant="icon" className="sidebar__close" onClick={onClose} aria-label="بستن منو"><X size={19} /></SoftButton>
      </div>

      <div className="sidebar__scroll">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <span className="nav-group__label">{group.label}</span>
            <nav>
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}>
                    <Icon size={18} strokeWidth={1.9} />
                    <span>{item.label}</span>
                    {item.badge ? <b>{item.badge}</b> : null}
                  </NavLink>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="sidebar__footer">
        <NavLink to={settingsNav.path} onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}><SettingsIcon size={18} /><span>{settingsNav.label}</span></NavLink>
        <div className="theme-row">
          <div className="theme-row__label"><span className="theme-icon">{theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}</span><span>{theme === 'dark' ? 'حالت تاریک' : 'حالت روشن'}</span></div>
          <button className={`theme-switch ${theme === 'light' ? 'theme-switch--light' : ''}`} onClick={onToggleTheme} aria-label="تغییر تم"><span /></button>
        </div>
        <div className="profile-chip">
          <div className="avatar avatar--small">{profile?.firstName?.slice(0, 1) || 'ش'}</div>
          <div><strong>{profile ? `${profile.firstName} ${profile.lastName}` : 'کاربر Life OS'}</strong><span>{profile?.occupation || 'مدیر زندگی'}</span></div>
          <button className="profile-logout" onClick={() => void logout()} aria-label="خروج"><LogOut size={14} /></button>
          <UserRound size={15} className="profile-chip__icon" />
        </div>
      </div>
    </aside>
  )
}
