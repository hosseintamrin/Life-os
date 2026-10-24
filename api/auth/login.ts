import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { getDb } from '../_lib/mongo'
import { setSession } from '../_lib/auth'
import { allowAuthAttempt } from '../_lib/rateLimit'
function mobile(value: string) { const digits = String(value || '').replace(/[^0-9+]/g, '').replace(/^00/, '+'); return digits.startsWith('+98') ? digits : digits.startsWith('09') ? `+98${digits.slice(1)}` : digits }
export default async function handler(req: VercelRequest, res: VercelResponse) { if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' }); const normalized = mobile(req.body?.mobile); if (!allowAuthAttempt(`${req.headers['x-forwarded-for'] || 'unknown'}:${normalized}`)) return res.status(429).json({ message: 'تلاش‌های زیاد؛ ۱۵ دقیقه دیگر دوباره امتحان کن.' }); try { const db = await getDb(); const user = await db.collection('users').findOne({ 'profile.mobile': normalized }); if (!user || !(await bcrypt.compare(String(req.body?.password || ''), user.passwordHash))) return res.status(401).json({ message: 'شماره موبایل یا رمز عبور نادرست است' }); setSession(res, user._id); return res.status(200).json({ profile: user.profile }) } catch { return res.status(500).json({ message: 'ورود در حال حاضر ممکن نیست' }) } }
