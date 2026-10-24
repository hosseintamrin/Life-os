import type { LucideIcon } from 'lucide-react'

export type Theme = 'dark' | 'light'
export type ModuleKey = 'tasks' | 'calendar' | 'weekly' | 'focus' | 'finance' | 'notes' | 'routines' | 'reading' | 'goals' | 'reports' | 'settings'
export type Gender = 'female' | 'male' | 'prefer_not_to_say'
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type BookStatus = 'want' | 'reading' | 'finished'
export type MovieStatus = 'want' | 'watched'

export type NavItem = { label: string; path: string; icon: LucideIcon; badge?: string }
export type UserProfile = { firstName: string; lastName: string; mobile: string; occupation: string; education: string; age: number; gender: Gender }
export type AuthState = 'checking' | 'needs_signup' | 'needs_login' | 'authenticated'

export type Task = { id: string; title: string; description: string; project: string; priority: Priority; status: TaskStatus; tags: string[]; dueDate: string; createdAt: string }
export type CalendarEvent = { id: string; title: string; date: string; time: string; color: string; note: string }
export type WeeklyTemplate = { id: string; title: string; weekday: string; start: string; end: string; category: string; color: string }
export type FocusSession = { id: string; task: string; minutes: number; date: string; type: 'pomodoro' | 'manual' }
export type Transaction = { id: string; type: 'income' | 'expense' | 'loan_given' | 'debt'; amount: number; category: string; counterparty: string; date: string; description: string; status: 'pending' | 'confirmed' }
export type Note = { id: string; title: string; text: string; tags: string[]; pinned: boolean; updatedAt: string }
export type Routine = { id: string; title: string; days: string[]; color: string; logs: Record<string, boolean> }
export type Book = { id: string; title: string; author: string; status: BookStatus; progress: number; tags: string[]; coverUrl: string }
export type Highlight = { id: string; bookId: string; text: string; location: string; tags: string[]; createdAt: string }
export type BookNote = { id: string; bookId: string; text: string; tags: string[]; createdAt: string }
export type ReadingSession = { id: string; bookId: string; minutes: number; date: string }
export type Movie = { id: string; title: string; status: MovieStatus; rating: number; note: string; watchedAt: string }
export type Goal = { id: string; title: string; description: string; horizon: 'short' | 'mid' | 'long'; deadline: string; category: string; steps: { id: string; title: string; done: boolean }[] }
export type DailyReport = { id: string; date: string; journal: string }
export type DayMeta = { date: string; note: string; color: string }

export type LifeOSData = {
  tasks: Task[]
  events: CalendarEvent[]
  weeklyTemplates: WeeklyTemplate[]
  focusSessions: FocusSession[]
  transactions: Transaction[]
  notes: Note[]
  routines: Routine[]
  books: Book[]
  highlights: Highlight[]
  bookNotes: BookNote[]
  readingSessions: ReadingSession[]
  movies: Movie[]
  goals: Goal[]
  dailyReports: DailyReport[]
  dayMeta: DayMeta[]
}

export type ModuleConfig = { title: string; description: string; icon: LucideIcon }
