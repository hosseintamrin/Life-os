export class ApiError extends Error {
  status: number
  constructor(message: string, status = 500) { super(message); this.name = 'ApiError'; this.status = status }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) }, ...options })
  const text = await response.text()
  let body: unknown = null
  try { body = text ? JSON.parse(text) : null } catch { body = null }
  if (!response.ok) throw new ApiError((body as { message?: string } | null)?.message ?? 'درخواست انجام نشد', response.status)
  return body as T
}

export const api = {
  me: () => request<{ profile: import('../types').UserProfile }>('/api/auth/me'),
  register: (payload: object) => request<{ profile: import('../types').UserProfile; recoveryCode: string }>('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: object) => request<{ profile: import('../types').UserProfile }>('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  recover: (payload: object) => request<{ profile: import('../types').UserProfile; recoveryCode: string }>('/api/auth/recovery', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request<{ ok: true }>('/api/auth/logout', { method: 'POST' }),
  getData: () => request<import('../types').LifeOSData>('/api/data'),
  saveData: (data: import('../types').LifeOSData) => request<{ ok: true }>('/api/data', { method: 'PUT', body: JSON.stringify(data) }),
}
