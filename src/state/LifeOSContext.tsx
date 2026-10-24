import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { api } from '../services/api'
import type { LifeOSData } from '../types'

const STORAGE_KEY = 'lifeos-data-v2'

export function emptyData(): LifeOSData {
  return { tasks: [], events: [], weeklyTemplates: [], focusSessions: [], transactions: [], notes: [], routines: [], books: [], highlights: [], bookNotes: [], readingSessions: [], movies: [], goals: [], dailyReports: [], dayMeta: [] }
}

function loadLocal(): LifeOSData {
  try { const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'); return parsed ? { ...emptyData(), ...parsed } : emptyData() } catch { return emptyData() }
}

type LifeOSContextValue = { data: LifeOSData; updateData: (updater: (current: LifeOSData) => LifeOSData) => void; refreshFromServer: () => Promise<void> }
const LifeOSContext = createContext<LifeOSContextValue | null>(null)

export function LifeOSProvider({ children, authenticated }: { children: ReactNode; authenticated: boolean }) {
  const [data, setData] = useState<LifeOSData>(loadLocal)
  const firstLoad = useRef(true)
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const refreshFromServer = useCallback(async () => {
    if (!authenticated) return
    try { const remote = await api.getData(); setData({ ...emptyData(), ...remote }); localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)) } catch { /* local fallback is intentional when Mongo is not configured in Preview */ }
  }, [authenticated])

  useEffect(() => { void refreshFromServer() }, [refreshFromServer])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    if (firstLoad.current) { firstLoad.current = false; return }
    if (!authenticated) return
    if (syncTimer.current) clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(() => { void api.saveData(data).catch(() => undefined) }, 650)
    return () => { if (syncTimer.current) clearTimeout(syncTimer.current) }
  }, [data, authenticated])

  const updateData = useCallback((updater: (current: LifeOSData) => LifeOSData) => setData((current) => updater(current)), [])
  const value = useMemo(() => ({ data, updateData, refreshFromServer }), [data, updateData, refreshFromServer])
  return <LifeOSContext.Provider value={value}>{children}</LifeOSContext.Provider>
}

export function useLifeOS() {
  const context = useContext(LifeOSContext)
  if (!context) throw new Error('useLifeOS must be used inside LifeOSProvider')
  return context
}
