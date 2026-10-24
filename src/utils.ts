export function uid(prefix = 'item') { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
export function todayISO() { return new Date().toISOString().slice(0, 10) }
export function formatMoney(value: number) { return new Intl.NumberFormat('fa-IR').format(value) }
export function formatDate(value: string) { if (!value) return 'بدون تاریخ'; const date = new Date(`${value}T12:00:00`); return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { day: 'numeric', month: 'short' }).format(date) }
export function formatLongDate(value: string) { const date = new Date(`${value}T12:00:00`); return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date) }
export function joinTags(tags: string) { return tags.split(',').map((tag) => tag.trim()).filter(Boolean) }
