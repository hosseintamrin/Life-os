import { Search, ArrowUpLeft, CheckSquare2, BookOpen, NotebookPen, WalletCards } from 'lucide-react'
import { useSearchParams, Link } from 'react-router-dom'
import { GlassCard, SectionHeading, StatusPill } from '../components/ui'
import { useLifeOS } from '../state/LifeOSContext'

export function SearchPage() {
  const [params] = useSearchParams(); const query = (params.get('q') ?? '').trim().toLowerCase(); const { data } = useLifeOS()
  const results = [
    ...data.tasks.filter((item) => `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(query)).map((item) => ({ type: 'تسک', title: item.title, detail: item.project || 'بدون پروژه', icon: CheckSquare2, path: '/tasks' })),
    ...data.notes.filter((item) => `${item.title} ${item.text} ${item.tags.join(' ')}`.toLowerCase().includes(query)).map((item) => ({ type: 'یادداشت', title: item.title, detail: item.text.slice(0, 70), icon: NotebookPen, path: '/notes' })),
    ...data.highlights.filter((item) => `${item.text} ${item.tags.join(' ')}`.toLowerCase().includes(query)).map((item) => ({ type: 'بریدهٔ کتاب', title: item.text.slice(0, 80), detail: item.location || 'بدون صفحه', icon: BookOpen, path: '/reading' })),
    ...data.transactions.filter((item) => `${item.category} ${item.counterparty} ${item.description}`.toLowerCase().includes(query)).map((item) => ({ type: 'تراکنش', title: item.category || 'تراکنش مالی', detail: `${item.amount.toLocaleString('fa-IR')} تومان`, icon: WalletCards, path: '/finance' })),
  ]
  return <div className="search-page"><div className="search-page__top"><span className="eyebrow"><Search size={14} /> جست‌وجوی سراسری</span><h2>{query ? `نتایج برای «${query}»` : 'چه چیزی را پیدا کنیم؟'}</h2><p>در تسک‌ها، یادداشت‌ها، بریده‌های کتاب و تراکنش‌ها جست‌وجو کن.</p></div><GlassCard className="search-results-card">{!query ? <div className="empty-state"><Search size={24} /><h3>جست‌وجو را از هدر شروع کن.</h3><p>برای دیدن نتیجه، یک عبارت وارد کن.</p></div> : results.length === 0 ? <div className="empty-state"><Search size={24} /><h3>نتیجه‌ای پیدا نشد.</h3><p>عبارت دیگری امتحان کن یا بعداً یک مورد جدید بساز.</p></div> : <><SectionHeading title={`${results.length.toLocaleString('fa-IR')} نتیجه`} action={<StatusPill tone="cyan">زنده</StatusPill>} /><div className="search-result-list">{results.map((item, index) => { const Icon = item.icon; return <Link to={item.path} className="search-result-row" key={`${item.type}-${index}`}><span className="search-result-icon"><Icon size={17} /></span><span><strong>{item.title}</strong><small>{item.type} · {item.detail}</small></span><ArrowUpLeft size={16} /></Link> })}</div></>}</GlassCard></div>
}
