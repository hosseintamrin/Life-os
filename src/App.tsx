import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { ModulePage } from './pages/ModulePage'
import { NotFound } from './pages/NotFound'
import { SearchPage } from './pages/SearchPage'
import { AuthPage } from './pages/AuthPage'
import { AuthProvider, useAuth } from './state/AuthContext'
import { LifeOSProvider } from './state/LifeOSContext'

function AuthGate() {
  const auth = useAuth()
  if (auth.state === 'checking') return <div className="auth-loading"><div className="brand-mark"><span /></div><span>در حال آماده‌سازی فضای شخصی…</span></div>
  if (auth.state !== 'authenticated' || auth.recoveryCode) return <AuthPage />
  return <LifeOSProvider authenticated><Routes><Route element={<AppShell />}><Route index element={<DashboardPage />} /><Route path="tasks" element={<ModulePage module="tasks" />} /><Route path="calendar" element={<ModulePage module="calendar" />} /><Route path="weekly" element={<ModulePage module="weekly" />} /><Route path="focus" element={<ModulePage module="focus" />} /><Route path="finance" element={<ModulePage module="finance" />} /><Route path="notes" element={<ModulePage module="notes" />} /><Route path="routines" element={<ModulePage module="routines" />} /><Route path="reading" element={<ModulePage module="reading" />} /><Route path="goals" element={<ModulePage module="goals" />} /><Route path="reports" element={<ModulePage module="reports" />} /><Route path="settings" element={<ModulePage module="settings" />} /><Route path="search" element={<SearchPage />} /></Route><Route path="/404" element={<NotFound />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes></LifeOSProvider>
}

export default function App() { return <AuthProvider><AuthGate /></AuthProvider> }
