import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'

export function NotFound() {
  return <main className="not-found"><div className="not-found__orb"><Compass size={34} /></div><span className="eyebrow">مسیر پیدا نشد</span><h1>این صفحه در نقشهٔ امروزت نیست.</h1><p>ممکن است آدرس تغییر کرده باشد یا هنوز این بخش را نساخته باشیم.</p><Link className="soft-button soft-button--primary" to="/"><ArrowRight size={16} /> برگشت به داشبورد</Link></main>
}
