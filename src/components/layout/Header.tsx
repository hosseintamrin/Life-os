import { Bell, CalendarDays, Command, Menu, Search, SlidersHorizontal } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../state/AuthContext'
import { SoftButton } from '../ui'

const titles: Record<string, string> = {
  '/': 'نمای امروز', '/tasks': 'تسک‌ها', '/calendar': 'تقویم', '/weekly': 'برنامهٔ هفتگی', '/focus': 'تمرکز', '/finance': 'مالی', '/notes': 'یادداشت‌ها', '/routines': 'روتین‌ها', '/reading': 'مطالعه', '/goals': 'اهداف', '/reports': 'گزارش روزانه', '/settings': 'تنظیمات', '/search': 'جست‌وجوی سراسری',
}

function persianDate() {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
}

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const location = useLocation(); const navigate = useNavigate(); const { profile } = useAuth(); const [query, setQuery] = useState('')
  const title = titles[location.pathname] ?? 'نمای امروز'
  const submitSearch = () => { if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`) }
  return (
    <header className="app-header">
      <div className="header-leading">
        <SoftButton variant="icon" className="menu-trigger" onClick={onOpenMenu} aria-label="باز کردن منو"><Menu size={21} /></SoftButton>
        <div>
          <span className="header-kicker">فضای شخصی / {title}</span>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="header-actions">
        <label className="search-field">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') submitSearch() }} placeholder="جست‌وجو در Life OS" aria-label="جست‌وجوی سراسری" />
          <span className="search-shortcut"><Command size={12} /> K</span>
        </label>
        <div className="header-date"><CalendarDays size={16} /><span>{persianDate()}</span></div>
        <button className="icon-button notification-button" aria-label="اعلان‌ها"><Bell size={18} /><i /></button>
        <div className="avatar">{profile?.firstName?.slice(0, 1) || 'ش'}</div>
      </div>
      <div className="mobile-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') submitSearch() }} placeholder="جست‌وجوی سریع" aria-label="جست‌وجوی سریع" /><SlidersHorizontal size={17} /></div>
    </header>
  )
}
