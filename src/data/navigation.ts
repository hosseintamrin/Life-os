import { BookOpen, CalendarDays, CheckSquare2, LayoutDashboard, NotebookPen, PanelsTopLeft, ScrollText, Settings2, Sparkles, Target, Timer, WalletCards } from 'lucide-react'
import type { NavItem } from '../types'

export const navGroups: { label: string; items: NavItem[] }[] = [
  { label: 'فضای من', items: [{ label: 'داشبورد', path: '/', icon: LayoutDashboard }, { label: 'تسک‌ها', path: '/tasks', icon: CheckSquare2 }, { label: 'تقویم', path: '/calendar', icon: CalendarDays }, { label: 'برنامهٔ هفتگی', path: '/weekly', icon: PanelsTopLeft }] },
  { label: 'تمرکز و رشد', items: [{ label: 'تمرکز', path: '/focus', icon: Timer }, { label: 'مالی', path: '/finance', icon: WalletCards }, { label: 'یادداشت‌ها', path: '/notes', icon: NotebookPen }, { label: 'روتین‌ها', path: '/routines', icon: Sparkles }, { label: 'مطالعه', path: '/reading', icon: BookOpen }, { label: 'اهداف', path: '/goals', icon: Target }] },
  { label: 'بازتاب', items: [{ label: 'گزارش روزانه', path: '/reports', icon: ScrollText }] },
]

export const settingsNav: NavItem = { label: 'تنظیمات', path: '/settings', icon: Settings2 }
