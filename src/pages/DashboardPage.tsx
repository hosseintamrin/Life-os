import { useState } from 'react'
import { ArrowUpLeft, Check, ChevronLeft, Circle, CircleDollarSign, Clock3, Flame, MoreHorizontal, Play, Plus, Sunrise, Target, TrendingUp } from 'lucide-react'
import { ArrowLink, GlassCard, ProgressBar, ProgressRing, SectionHeading, SoftButton, StatusPill } from '../components/ui'
import { useAuth } from '../state/AuthContext'
import { useLifeOS } from '../state/LifeOSContext'
import { formatMoney, todayISO } from '../utils'

function greeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'صبح بخیر'
  if (hour >= 12 && hour < 17) return 'ظهر بخیر'
  if (hour >= 17 && hour < 21) return 'عصر بخیر'
  return 'شب بخیر'
}

function DashboardTop() {
  const { profile } = useAuth()
  return (
    <section className="dashboard-intro">
      <div>
        <span className="eyebrow eyebrow--glow"><Sunrise size={14} /> {greeting()}، {profile?.firstName || 'دوست من'}</span>
        <h2>امروزت را سبک‌تر بچین<span className="title-dot">.</span></h2>
        <p>سه کار مهمت را جلو ببر؛ بقیهٔ روز خودش راهش را پیدا می‌کند.</p>
      </div>
      <div className="intro-meta">
        <div className="date-orb"><span>شنبه</span><strong>۰۲</strong><small>آبان ۱۴۰۵</small></div>
        <div className="weather-note"><span className="weather-dot" /><div><strong>روز متعادل</strong><small>انرژی امروزت خوب است</small></div></div>
      </div>
    </section>
  )
}

function StatsRow() {
  const { data } = useLifeOS(); const today = todayISO(); const todayTasks = data.tasks.filter((task) => task.dueDate === today); const doneTasks = todayTasks.filter((task) => task.status === 'done').length; const focus = data.focusSessions.filter((session) => session.date === today).reduce((sum, session) => sum + session.minutes, 0); const expense = data.transactions.filter((item) => item.date === today && item.type === 'expense').reduce((sum, item) => sum + item.amount, 0); const routineCount = data.routines.length; const doneRoutines = data.routines.filter((routine) => routine.logs[today]).length
  const stats = [
    { label: 'تسک‌های امروز', value: `${doneTasks} / ${todayTasks.length}`, caption: todayTasks.length ? `${todayTasks.length - doneTasks} مورد باقی مانده` : 'هنوز تسکی برای امروز نیست', icon: Check, tone: 'cyan', progress: todayTasks.length ? Math.round(doneTasks / todayTasks.length * 100) : 0 },
    { label: 'زمان تمرکز', value: `${Math.floor(focus / 60)}س ${focus % 60}د`, caption: focus ? 'زمان ثبت‌شدهٔ امروز' : 'هنوز جلسه‌ای ثبت نشده', icon: Clock3, tone: 'violet', progress: Math.min(100, Math.round(focus / 180 * 100)) },
    { label: 'پایبندی روتین', value: routineCount ? `${Math.round(doneRoutines / routineCount * 100)}٪` : '۰٪', caption: routineCount ? 'از روتین‌های امروز' : 'هنوز روتینی نساخته‌ای', icon: Flame, tone: 'amber', progress: routineCount ? Math.round(doneRoutines / routineCount * 100) : 0 },
    { label: 'هزینهٔ امروز', value: formatMoney(expense), caption: 'تومان · از دادهٔ واقعی تو', icon: CircleDollarSign, tone: 'green', progress: Math.min(100, Math.round(expense / 1000000 * 100)) },
  ]
  return <div className="stats-grid">{stats.map((stat) => { const Icon = stat.icon; return <GlassCard className="stat-card" key={stat.label}><div className={`stat-icon stat-icon--${stat.tone}`}><Icon size={18} /></div><div className="stat-copy"><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.caption}</small></div><div className={`stat-progress stat-progress--${stat.tone}`}><span style={{ height: `${stat.progress}%` }} /></div></GlassCard> })}</div>
}

function ActivityChart() {
  const { data } = useLifeOS(); const chartDays = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); const iso = date.toISOString().slice(0, 10); const minutes = data.focusSessions.filter((session) => session.date === iso).reduce((sum, session) => sum + session.minutes, 0); return { label: new Intl.DateTimeFormat('fa-IR', { weekday: 'short' }).format(date).replace('‌', ''), value: Math.min(100, minutes), focus: Math.min(100, Math.round(minutes * .7)) } })
  const [range, setRange] = useState<'روزانه' | 'هفتگی' | 'ماهانه'>('هفتگی')
  const total = chartDays.reduce((sum, point) => sum + point.value, 0); return <GlassCard className="activity-card"><SectionHeading eyebrow="تصویر کلی" title="ریتم فعالیت" action={<div className="segmented-control">{(['روزانه', 'هفتگی', 'ماهانه'] as const).map((item) => <button className={range === item ? 'is-active' : ''} key={item} onClick={() => setRange(item)}>{item}</button>)}</div>} /><div className="chart-summary"><div><strong>{total ? `${Math.min(100, Math.round(total / 7))}٪` : '۰٪'}</strong><span><TrendingUp size={13} /> بر اساس تمرکز ثبت‌شده</span></div><div className="chart-legend"><span><i className="legend-dot legend-dot--accent" /> فعالیت</span><span><i className="legend-dot legend-dot--muted" /> تمرکز</span></div></div><div className="bar-chart" aria-label={`نمودار فعالیت ${range}`}>{chartDays.map((point) => <div className="bar-group" key={point.label}><div className="bars"><span className="bar bar--muted" style={{ height: `${point.focus}%` }} /><span className="bar bar--accent" style={{ height: `${point.value}%` }} /></div><small>{point.label}</small></div>)}</div></GlassCard>
}

function TodayTasks() {
  const { data, updateData } = useLifeOS(); const today = todayISO(); const items = data.tasks.filter((task) => task.dueDate === today).slice(0, 5); const toggle = (id: string) => updateData((current) => ({ ...current, tasks: current.tasks.map((task) => task.id === id ? { ...task, status: task.status === 'done' ? 'todo' : 'done' } : task) })); return <GlassCard className="tasks-card"><SectionHeading eyebrow="اولویت امروز" title="تسک‌های امروز" action={<ArrowLink>مشاهدهٔ همه</ArrowLink>} /><div className="task-list">{items.length === 0 ? <div className="mini-empty">هنوز تسکی برای امروز نساخته‌ای.</div> : items.map((task) => <button className={`task-row ${task.status === 'done' ? 'task-row--done' : ''}`} key={task.id} onClick={() => toggle(task.id)}><span className={`task-check ${task.status === 'done' ? 'task-check--done' : ''}`}>{task.status === 'done' && <Check size={13} strokeWidth={3} />}</span><span className="task-main"><strong>{task.title}</strong><small>{task.project || 'بدون پروژه'}</small></span><span className={`priority priority--${task.priority === 'urgent' || task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low'}`}>{task.priority}</span><span className="task-time">{task.dueDate}</span><ChevronLeft size={15} className="task-arrow" /></button>)}</div><button className="add-inline"><Plus size={16} /> افزودن تسک جدید</button></GlassCard>
}

function FocusCard() {
  const { data } = useLifeOS(); const today = todayISO(); const minutes = data.focusSessions.filter((session) => session.date === today).reduce((sum, session) => sum + session.minutes, 0); return <GlassCard className="focus-card"><div className="focus-card__top"><div><span className="eyebrow">تمرکز امروز</span><h3>{minutes ? 'جلسه‌های ثبت‌شدهٔ تو' : 'هنوز جلسه‌ای شروع نشده'}</h3><span className="focus-project">از ماژول تمرکز شروع کن</span></div><button className="more-button" aria-label="گزینه‌های بیشتر"><MoreHorizontal size={19} /></button></div><div className="focus-timer"><div className="timer-ring"><div><strong>{`${String(Math.floor(minutes / 60)).padStart(2, '۰')}:${String(minutes % 60).padStart(2, '۰')}`}</strong><span>زمان خالص</span></div></div><div className="focus-side"><div><small>امروز</small><strong>{data.focusSessions.filter((session) => session.date === today).length}</strong><span>جلسه</span></div><div><small>ثبت دستی</small><strong>{data.focusSessions.filter((session) => session.date === today && session.type === 'manual').length}</strong><span>گزارش</span></div></div></div><div className="focus-footer"><StatusPill tone="cyan">آمادهٔ شروع</StatusPill><SoftButton variant="primary"><Play size={15} fill="currentColor" /> شروع تمرکز</SoftButton></div></GlassCard>
}

function RoutinesCard() {
  const { data, updateData } = useLifeOS(); const today = todayISO(); return <GlassCard className="routines-card"><SectionHeading eyebrow="پیوستگی کوچک" title="روتین‌های امروز" action={<ArrowLink>مدیریت</ArrowLink>} /><div className="routine-list">{data.routines.length === 0 ? <div className="mini-empty">هنوز روتینی نساخته‌ای.</div> : data.routines.slice(0, 4).map((routine) => { const done = Boolean(routine.logs[today]); return <div className="routine-row" key={routine.id}><span className="routine-symbol routine-symbol--cyan">{done ? <Check size={15} /> : <Circle size={14} />}</span><span className="routine-title"><strong>{routine.title}</strong><small><Flame size={12} /> {Object.values(routine.logs).filter(Boolean).length} تیک ثبت‌شده</small></span><button className={`routine-toggle ${done ? 'routine-toggle--done' : ''}`} onClick={() => updateData((current) => ({ ...current, routines: current.routines.map((item) => item.id === routine.id ? { ...item, logs: { ...item.logs, [today]: !done } } : item) }))} aria-label={`تغییر وضعیت ${routine.title}`}>{done ? <Check size={14} /> : null}</button></div> })}</div></GlassCard>
}

function GoalsCard() {
  const { data } = useLifeOS(); return <GlassCard className="goals-card"><SectionHeading eyebrow="افق نزدیک" title="اهداف در مسیر" action={<ArrowLink>همهٔ اهداف</ArrowLink>} /><div className="goals-list">{data.goals.length === 0 ? <div className="mini-empty">هنوز هدف فعالی نداری.</div> : data.goals.slice(0, 3).map((goal) => { const progress = goal.steps.length ? Math.round(goal.steps.filter((step) => step.done).length / goal.steps.length * 100) : 0; return <div className="goal-row" key={goal.id}><ProgressRing value={progress} label="پیشرفت" tone="cyan" /><div className="goal-copy"><strong>{goal.title}</strong><small>{goal.deadline || 'بدون deadline'}</small><ProgressBar value={progress} /></div></div> })}</div></GlassCard>
}

function WeeklyPulse() {
  return <GlassCard className="pulse-card"><div className="pulse-glow" /><span className="eyebrow">یادداشت هفته</span><h3>«پیشرفت، بیشتر از سرعت به تداوم نیاز دارد.»</h3><div className="pulse-bottom"><span>بازتاب این هفته</span><button aria-label="باز کردن گزارش"><ArrowUpLeft size={17} /></button></div></GlassCard>
}

export function DashboardPage() {
  const { data } = useLifeOS(); const focusMinutes = data.focusSessions.reduce((sum, session) => sum + session.minutes, 0); return <div className="dashboard-page"><DashboardTop /><StatsRow /><div className="dashboard-grid dashboard-grid--main"><ActivityChart /><FocusCard /></div><div className="dashboard-grid dashboard-grid--secondary"><TodayTasks /><div className="dashboard-stack"><RoutinesCard /><GoalsCard /></div><WeeklyPulse /></div><div className="dashboard-footer-note"><span className="status-dot status-dot--success" /> داده‌ها از فضای شخصی تو خوانده می‌شوند · {focusMinutes} دقیقه تمرکز ثبت شده</div></div>
}
