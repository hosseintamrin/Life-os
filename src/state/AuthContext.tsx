import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ApiError, api } from '../services/api'
import type { AuthState, Gender, UserProfile } from '../types'

const PROFILE_KEY = 'lifeos-profile'
const SESSION_KEY = 'lifeos-session'
const PASSWORD_KEY = 'lifeos-local-password'
const RECOVERY_KEY = 'lifeos-local-recovery'

function readProfile(): UserProfile | null { try { return JSON.parse(localStorage.getItem(PROFILE_KEY) ?? 'null') } catch { return null } }
function makeRecovery() { const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; const values = crypto.getRandomValues(new Uint32Array(16)); return Array.from(values, (value) => chars[value % chars.length]).join('') }
function normalizeMobile(value: string) { const digits = value.replace(/[^0-9+]/g, '').replace(/^00/, '+'); return digits.startsWith('+98') ? digits : digits.startsWith('09') ? `+98${digits.slice(1)}` : digits }

type AuthContextValue = { state: AuthState; profile: UserProfile | null; recoveryCode: string | null; register: (payload: { firstName: string; lastName: string; mobile: string; password: string; occupation: string; education: string; age: number; gender: Gender }) => Promise<void>; login: (mobile: string, password: string) => Promise<void>; recover: (mobile: string, recoveryCode: string, newPassword: string) => Promise<void>; logout: () => Promise<void>; dismissRecovery: () => void }
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>('checking')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    api.me().then((result) => { if (!alive) return; localStorage.setItem(PROFILE_KEY, JSON.stringify(result.profile)); localStorage.setItem(SESSION_KEY, '1'); setProfile(result.profile); setState('authenticated') }).catch(() => { if (!alive) return; const local = readProfile(); setProfile(local); setState(local && localStorage.getItem(SESSION_KEY) === '1' ? 'authenticated' : local ? 'needs_login' : 'needs_signup') })
    return () => { alive = false }
  }, [])

  const register = useCallback(async (payload: { firstName: string; lastName: string; mobile: string; password: string; occupation: string; education: string; age: number; gender: Gender }) => {
    const mobile = normalizeMobile(payload.mobile)
    let result: { profile: UserProfile; recoveryCode: string }
    try { result = await api.register({ ...payload, mobile }) } catch (error) { if (error instanceof ApiError && error.status < 500) throw error; result = { profile: { ...payload, mobile }, recoveryCode: makeRecovery() } }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(result.profile)); localStorage.setItem(SESSION_KEY, '1'); localStorage.setItem(PASSWORD_KEY, payload.password); localStorage.setItem(RECOVERY_KEY, result.recoveryCode); setProfile(result.profile); setRecoveryCode(result.recoveryCode); setState('authenticated')
  }, [])

  const login = useCallback(async (mobileValue: string, password: string) => {
    const mobile = normalizeMobile(mobileValue)
    try { const result = await api.login({ mobile, password }); localStorage.setItem(PROFILE_KEY, JSON.stringify(result.profile)); setProfile(result.profile) } catch (error) { if (error instanceof ApiError && error.status < 500) throw error; const local = readProfile(); if (!local || local.mobile !== mobile || localStorage.getItem(PASSWORD_KEY) !== password) throw new Error('شماره موبایل یا رمز عبور نادرست است') }
    localStorage.setItem(SESSION_KEY, '1'); setState('authenticated')
  }, [])

  const recover = useCallback(async (mobileValue: string, code: string, newPassword: string) => {
    const mobile = normalizeMobile(mobileValue)
    try { const result = await api.recover({ mobile, recoveryCode: code, newPassword }); localStorage.setItem(PROFILE_KEY, JSON.stringify(result.profile)); localStorage.setItem(RECOVERY_KEY, result.recoveryCode); localStorage.setItem(PASSWORD_KEY, newPassword); setRecoveryCode(result.recoveryCode); setProfile(result.profile) } catch (error) { if (error instanceof ApiError && error.status < 500) throw error; const local = readProfile(); if (!local || local.mobile !== mobile || localStorage.getItem(RECOVERY_KEY) !== code.toUpperCase()) throw new Error('کد بازیابی یا شماره موبایل نادرست است'); localStorage.setItem(PASSWORD_KEY, newPassword); const next = makeRecovery(); localStorage.setItem(RECOVERY_KEY, next); setRecoveryCode(next); setProfile(local) }
    localStorage.setItem(SESSION_KEY, '1'); setState('authenticated')
  }, [])

  const logout = useCallback(async () => { await api.logout().catch(() => undefined); localStorage.removeItem(SESSION_KEY); setState('needs_login') }, [])
  const dismissRecovery = useCallback(() => setRecoveryCode(null), [])
  const value = useMemo(() => ({ state, profile, recoveryCode, register, login, recover, logout, dismissRecovery }), [state, profile, recoveryCode, register, login, recover, logout, dismissRecovery])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context }
