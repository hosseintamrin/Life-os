const attempts = new Map<string, { count: number; resetAt: number }>()

export function allowAuthAttempt(key: string) {
  const now = Date.now(); const current = attempts.get(key)
  if (!current || current.resetAt <= now) { attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 }); return true }
  if (current.count >= 5) return false
  current.count += 1; attempts.set(key, current); return true
}
