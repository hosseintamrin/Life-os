import type { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { getDb } from './mongo'

const COOKIE_NAME = 'lifeos_session'
function secret() { const value = process.env.JWT_SECRET; if (!value) throw new Error('JWT_SECRET is not configured'); return value }
function parseCookies(header = '') { return Object.fromEntries(header.split(';').map((part) => part.trim().split('=' as string)).filter(([key, value]) => key && value).map(([key, value]) => [key, decodeURIComponent(value)])) }
function cookie(value: string, maxAge: number) { return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}` }
export function setSession(res: VercelResponse, userId: ObjectId) { const token = jwt.sign({ sub: userId.toString() }, secret(), { expiresIn: '30d' }); res.setHeader('Set-Cookie', cookie(token, 60 * 60 * 24 * 30)) }
export function clearSession(res: VercelResponse) { res.setHeader('Set-Cookie', cookie('', 0)) }
export function userIdFromRequest(req: VercelRequest) { const token = parseCookies(req.headers.cookie).lifeos_session; if (!token) return null; try { const payload = jwt.verify(token, secret()) as jwt.JwtPayload; return typeof payload.sub === 'string' && ObjectId.isValid(payload.sub) ? new ObjectId(payload.sub) : null } catch { return null } }
export async function requireUser(req: VercelRequest, res: VercelResponse) { const userId = userIdFromRequest(req); if (!userId) { res.status(401).json({ message: 'نیاز به ورود است' }); return null } const user = await (await getDb()).collection('users').findOne({ _id: userId }); if (!user) { res.status(401).json({ message: 'کاربر پیدا نشد' }); return null } return user }
export function profileOf(user: { profile: unknown }) { return user.profile }
