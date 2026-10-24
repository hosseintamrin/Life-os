import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUser } from '../_lib/auth'
export default async function handler(req: VercelRequest, res: VercelResponse) { if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' }); try { const user = await requireUser(req, res); if (!user) return; return res.status(200).json({ profile: user.profile }) } catch { return res.status(500).json({ message: 'بررسی session ممکن نیست' }) } }
