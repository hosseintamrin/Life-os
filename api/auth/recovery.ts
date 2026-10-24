import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'
import { getDb } from '../_lib/mongo'
import { setSession } from '../_lib/auth'
import { allowAuthAttempt } from '../_lib/rateLimit'
function mobile(value: string) { const digits = String(value || '').replace(/[^0-9+]/g, '').replace(/^00/, '+'); return digits.startsWith('+98') ? digits : digits.startsWith('09') ? `+98${digits.slice(1)}` : digits }
function recovery() { return randomBytes(10).toString('base64url').slice(0, 16).toUpperCase() }
export default async function handler(req: VercelRequest, res: VercelResponse) { if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' }); const normalized = mobile(req.body?.mobile); if (!allowAuthAttempt(`${req.headers['x-forwarded-for'] || 'unknown'}:${normalized}:recovery`)) return res.status(429).json({ message: 'تلاش‌های زیاد؛ ۱۵ دقیقه دیگر دوباره امتحان کن.' }); try { const db = await getDb(); const user = await db.collection('users').findOne({ 'profile.mobile': normalized }); if (!user || !(await bcrypt.compare(String(req.body?.recoveryCode || '').toUpperCase(), user.recoveryCodeHash)) || String(req.body?.newPassword || '').length < 8) return res.status(400).json({ message: 'کد بازیابی یا اطلاعات واردشده نادرست است' }); const code = recovery(); await db.collection('users').updateOne({ _id: user._id }, { $set: { passwordHash: await bcrypt.hash(String(req.body.newPassword), 12), recoveryCodeHash: await bcrypt.hash(code, 12), updatedAt: new Date() } }); setSession(res, user._id); return res.status(200).json({ profile: user.profile, recoveryCode: code }) } catch { return res.status(500).json({ message: 'بازیابی در حال حاضر ممکن نیست' }) } }
