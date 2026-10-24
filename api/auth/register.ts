import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'
import { getDb } from '../_lib/mongo'
import { setSession } from '../_lib/auth'
import { allowAuthAttempt } from '../_lib/rateLimit'

function mobile(value: string) { const digits = String(value || '').replace(/[^0-9+]/g, '').replace(/^00/, '+'); return digits.startsWith('+98') ? digits : digits.startsWith('09') ? `+98${digits.slice(1)}` : digits }
function recovery() { return randomBytes(10).toString('base64url').slice(0, 16).toUpperCase() }
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  try {
    const body = req.body || {}; const normalized = mobile(body.mobile); if (!allowAuthAttempt(`${req.headers['x-forwarded-for'] || 'unknown'}:${normalized}:register`)) return res.status(429).json({ message: 'تلاش‌های زیاد؛ ۱۵ دقیقه دیگر دوباره امتحان کن.' }); if (!body.firstName || !body.lastName || !normalized || String(body.password).length < 8) return res.status(400).json({ message: 'اطلاعات ضروری ناقص است' })
    const db = await getDb(); const users = db.collection('users'); if (await users.countDocuments({}) > 0) return res.status(409).json({ message: 'ثبت‌نام قبلاً انجام شده است؛ وارد شوید.' });
    const recoveryCode = recovery(); const profile = { firstName: String(body.firstName), lastName: String(body.lastName), mobile: normalized, occupation: String(body.occupation || ''), education: String(body.education || ''), age: Number(body.age || 0), gender: body.gender || 'prefer_not_to_say' }; const result = await users.insertOne({ profile, passwordHash: await bcrypt.hash(String(body.password), 12), recoveryCodeHash: await bcrypt.hash(recoveryCode, 12), createdAt: new Date() }); setSession(res, result.insertedId); await db.collection('userData').insertOne({ userId: result.insertedId.toString(), data: { tasks: [], events: [], weeklyTemplates: [], focusSessions: [], transactions: [], notes: [], routines: [], books: [], highlights: [], bookNotes: [], readingSessions: [], movies: [], goals: [], dailyReports: [], dayMeta: [] }, updatedAt: new Date() }); return res.status(201).json({ profile, recoveryCode })
  } catch (error) { console.error('register_error', error); return res.status(500).json({ message: 'ثبت‌نام در حال حاضر ممکن نیست' }) }
}
