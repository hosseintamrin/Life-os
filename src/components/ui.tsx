import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ArrowUpLeft, Check, Circle } from 'lucide-react'

export function GlassCard({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function SoftButton({ variant = 'ghost', className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'ghost' | 'primary' | 'icon' }) {
  return (
    <button className={`soft-button soft-button--${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function StatusPill({ tone, children }: { tone: 'success' | 'warning' | 'neutral' | 'cyan'; children: ReactNode }) {
  return <span className={`status-pill status-pill--${tone}`}><span className="status-dot" />{children}</span>
}

export function ProgressBar({ value, tone = 'cyan' }: { value: number; tone?: string }) {
  return <div className="progress-bar" aria-label={`${value} درصد`}><span className={`progress-bar__fill progress-bar__fill--${tone}`} style={{ width: `${value}%` }} /></div>
}

export function ProgressRing({ value, label, tone = 'cyan' }: { value: number; label: string; tone?: string }) {
  const degrees = Math.min(value, 100) * 3.6
  return (
    <div className={`progress-ring progress-ring--${tone}`} style={{ '--progress': `${degrees}deg` } as React.CSSProperties}>
      <div className="progress-ring__inner">
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

export function EmptyIcon({ checked = false }: { checked?: boolean }) {
  return checked ? <span className="task-check task-check--done"><Check size={14} strokeWidth={3} /></span> : <span className="task-check"><Circle size={14} /></span>
}

export function ArrowLink({ children }: { children: ReactNode }) {
  return <button className="arrow-link">{children}<ArrowUpLeft size={15} /></button>
}
