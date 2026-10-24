# Personal Life OS

پنل شخصی فارسی و RTL برای مدیریت تسک، تقویم، تمرکز، مالی، یادداشت، روتین، مطالعه، بریده‌های کتاب، تگ‌ها، فیلم، اهداف و گزارش روزانه.

## شروع از صفر

در اولین اجرای برنامه، اگر session و پروفایل وجود نداشته باشد صفحهٔ ثبت‌نام نمایش داده می‌شود. بعد از ثبت‌نام، یک کد بازیابی ۱۶ کاراکتری فقط یک‌بار نمایش داده می‌شود. دادهٔ نمونه داخل پروژه وجود ندارد؛ داشبورد با وضعیت خالی کاربر شروع می‌شود.

## توسعهٔ محلی

```bash
pnpm install
pnpm dev
```

برای build و بررسی:

```bash
pnpm run check
pnpm run check:api
pnpm run build
```

## MongoDB Atlas

یک database به نام `lifeos` در MongoDB Atlas بساز و مقدارهای `.env.example` را فقط در environment محلی یا Vercel قرار بده. هیچ secret را داخل Git commit نکن.

- `MONGODB_URI`: connection string خصوصی Atlas
- `MONGODB_DB`: نام database، مقدار پیشنهادی `lifeos`
- `JWT_SECRET`: یک مقدار تصادفی طولانی برای session cookie

APIهای آماده‌شده:

- `POST /api/auth/register` ثبت‌نام یک‌باره و تولید کد بازیابی
- `POST /api/auth/login` ورود با شماره موبایل و رمز
- `GET /api/auth/me` بررسی session
- `POST /api/auth/recovery` بازیابی رمز با کد
- `POST /api/auth/logout` خروج
- `GET|PUT /api/data` خواندن و ذخیرهٔ state کامل کاربر

## Deploy روی Vercel

Repository را به Vercel وصل کن، Framework را روی Vite بگذار و همین environment variableها را در بخش Production و Preview وارد کن. `vercel.json`، build command، خروجی `dist`، SPA fallback و API functions را آماده کرده است.

```bash
pnpm install --frozen-lockfile
pnpm run build
```

در MongoDB Atlas، IP Access List مناسب محیط Vercel را تنظیم کن. برای شروع سریع می‌توانی دسترسی `0.0.0.0/0` را فعال کنی، اما بهتر است بعداً آن را با روش امن‌تر محدود کنی.

## ساختار مهم

- `src/state/AuthContext.tsx`: ثبت‌نام اول‌بار، ورود، recovery و session سمت کلاینت
- `src/state/LifeOSContext.tsx`: state خالی و sync خودکار با MongoDB
- `src/pages/ModulePage.tsx`: ماژول‌های کامل CRUD و بخش مطالعه با کتاب، بریده و تگ
- `api/`: Vercel Functions و اتصال کش‌شدهٔ MongoDB
- `vercel.json`: قرارداد build و SPA routing
