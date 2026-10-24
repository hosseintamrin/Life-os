# TODO — Personal Life OS

## Done — محصول

- [x] پروژه با دادهٔ اولیهٔ خالی شروع می‌شود؛ دادهٔ نمونه از dashboard و ماژول‌ها حذف شده است.
- [x] ورود اول‌بار به فرم ثبت‌نام فارسی و RTL شامل نام، نام خانوادگی، موبایل، رمز حداقل ۸ کاراکتر، شغل، تحصیلات، سن و جنسیت می‌رود.
- [x] شمارهٔ موبایل به قالب +98 نرمال می‌شود و بعد از ثبت‌نام کد بازیابی ۱۶ کاراکتری فقط یک‌بار نمایش داده می‌شود.
- [x] ورود، خروج، recovery با کد بازیابی و rate limit محافظتی API آماده است.
- [x] داشبورد واقعی با empty state، آمار داده‌های کاربر، تمرکز، تسک، روتین و هدف آماده است.
- [x] تسک‌ها: ساخت، حذف، تغییر وضعیت، اولویت، پروژه، deadline، توضیحات و tag.
- [x] تقویم جلالی: ماه، انتخاب روز، رویداد و یادداشت روز.
- [x] برنامهٔ هفتگی: قالب‌های تکرارشونده با روز و ساعت.
- [x] تمرکز: تایمر پومودورو با presetهای ۲۵/۵ و ۵۰/۱۰، ثبت دستی و history.
- [x] مالی: income، expense، loan_given، debt، مبلغ، دسته، طرف حساب، تاریخ و حذف.
- [x] یادداشت‌ها: ساخت، متن، tag و حذف.
- [x] روتین‌ها: ساخت، تکرار، log روزانه، شمارش ثبت‌ها و حذف.
- [x] مطالعه: کتاب، وضعیت خواندن، progress، نویسنده، tag و حذف.
- [x] مطالعه: بریدهٔ کتاب با اتصال به کتاب، صفحه/فصل، متن و tag.
- [x] مطالعه: فیلم با وضعیت، امتیاز، یادداشت و تاریخ مشاهده.
- [x] اهداف: افق، deadline، checklist، progress خودکار و حذف.
- [x] گزارش روزانه: ژورنال امروز و archive.
- [x] جست‌وجوی سراسری در تسک، یادداشت، بریدهٔ کتاب و تراکنش.
- [x] تنظیمات: پروفایل، export JSON، import JSON، پاک‌کردن داده با تأیید و logout.

## Done — زیرساخت تولید

- [x] state مرکزی خالی با localStorage و sync اختیاری با API.
- [x] Vercel Functions برای register، login، me، logout، recovery و data.
- [x] اتصال cached MongoDB Atlas با `MONGODB_URI` و `MONGODB_DB`.
- [x] bcryptjs برای password/recovery hash و JWT در httpOnly cookie.
- [x] `vercel.json` برای Vite build، dist output و SPA fallback.
- [x] `.env.example`، README فارسی و API contract آماده؛ secret واقعی در repository نیست.
- [x] `pnpm run check`، `pnpm run check:api` و `pnpm run build` موفق.
- [x] صفحهٔ شروع در desktop و mobile screenshot-checked شده است.

## Before production deploy

- [ ] در Vercel مقدارهای `MONGODB_URI`، `MONGODB_DB` و `JWT_SECRET` برای Preview و Production ثبت شوند.
- [ ] در MongoDB Atlas دسترسی شبکهٔ محیط Vercel تنظیم شود.
- [ ] روی دامنهٔ Vercel یک smoke test برای ثبت‌نام یک‌باره، login، recovery و sync داده با MongoDB انجام شود.

## Follow-up product enhancements

- [ ] افزودن drag & drop واقعی برای Kanban، تقویم و ترتیب ویجت‌های dashboard.
- [ ] افزودن recurrence کامل تسک و materializer برنامهٔ هفتگی.
- [ ] افزودن نمودارهای تفصیلی مالی، مطالعه، routine streak و گزارش خودکار.
