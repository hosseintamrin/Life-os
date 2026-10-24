# نقشهٔ اجرایی Personal Life OS

## محدودهٔ محصول
Personal Life OS یک پنل شخصی تک‌کاربرهٔ فارسی و RTL است. نسخهٔ اول روی یک shell واقعی و قابل توسعه تمرکز می‌کند: داشبورد امروز، ناوبری ماژول‌ها، جست‌وجوی سراسری در هدر، سوییچ تم، حالت‌های responsive و زیرساخت مسیریابی. مدل‌سازی API و ماژول‌ها به‌صورت افزایشی روی همین ساختار اضافه می‌شود تا هر فاز مستقل قابل استفاده بماند.

## رویکرد فنی
- Vite + React + TypeScript با ساختار ماژولار و React Router.
- CSS سفارشی مبتنی بر CSS Variables برای اینکه توکن‌های تم فقط در `src/styles/globals.css` باشند؛ Tailwind/shadcn در فازهای بعدی می‌تواند روی primitiveهای فعلی سوار شود.
- دادهٔ نمایشی فعلی از لایهٔ `src/data` می‌آید و با APIهای فازهای بعد جایگزین می‌شود؛ هیچ دادهٔ موقت داخل کامپوننت‌های UI پراکنده نمی‌شود.
- server و database پروژه از ابتدا فعال هستند. احراز هویت نهایی از Manus OAuth و session سازگار با Preview استفاده خواهد کرد؛ پس از تکمیل shell، route guard و لایهٔ API پیاده می‌شوند.
- تاریخ‌ها در UI با فرمت جلالی نمایش داده می‌شوند و قرارداد ذخیره‌سازی آینده UTC خواهد بود.
- PWA با manifest پلتفرم و metadata اپلیکیشن تنظیم می‌شود؛ offline caching جزو نیازمندی نیست.

## طراحی و تجربهٔ کاربری

### سبک‌های بررسی‌شده
1. **Neon Glass Observatory** — احتمال 0.08؛ شیشه‌های تیره، هاله‌های آبی و عمق آرام برای یک مرکز فرمان شخصی.
2. **Quiet Editorial Ledger** — احتمال 0.06؛ سطوح روشن، تایپوگرافی تحریریه و تمرکز روی گزارش‌خوانی.
3. **Soft Aurora Utility** — احتمال 0.04؛ گرادیان‌های نرم و کنترل‌های دوستانه با حس ابزار شخصی.

### سبک انتخاب‌شده: Neon Glass Observatory
- **جنبش طراحی:** glassmorphism مینیمال با حال‌وهوای observatory و لایه‌های نور سرد.
- **اصول:** سلسله‌مراتب آرام، اطلاعات قابل اسکن، عمق شیشه‌ای کنترل‌شده، و پاسخ‌گویی بدون فشردگی.
- **فلسفهٔ رنگ:** زمینهٔ سرمه‌ای تقریباً مشکی باعث می‌شود داده‌ها و فعالیت‌ها مثل نقاط نورانی دیده شوند؛ cyan و blue برای جهت‌یابی و تمرکز هستند، نه تزئین اضافی. تم روشن همان حس را با سطوح یخی و آبی عمیق حفظ می‌کند.
- **الگوی چیدمان:** ستون کنترلی راست + بوم محتوای منعطف؛ در موبایل ستون کنترلی به drawer تبدیل می‌شود و کارت‌ها بر اساس حداقل عرض محتوا collapse می‌شوند.
- **عناصر امضادار:** خط نور باریک در مرز کارت‌ها، نشانگرهای عددی با دایرهٔ progress، و لکه‌های نور radial در پس‌زمینه.
- **تعامل:** hover فقط با افزایش ظریف کنتراست مرز؛ focus ring واضح؛ تعاملات لمسی حداقل 44px؛ drawer موبایل با backdrop و بستن با Escape.
- **حرکت:** transitionهای 180–260ms، ورود محتوای اصلی با fade/translate کوتاه؛ بدون parallax یا انیمیشن تزئینی سنگین.
- **تایپوگرافی:** Vazirmatn self-host با وزن 400 برای متن، 500 برای کنترل‌ها، 700 برای تیتر؛ اعداد و KPIها با letter-spacing اندک لاتین اما جهت RTL حفظ می‌شود.
- **جوهرهٔ برند:** اتاق فرمان آرام برای دیدن و ساختن روز شخصی؛ آرام، دقیق، روشن.
- **لحن:** کوتاه، محترمانه و عمل‌گرا. نمونه: «امروزت را سبک‌تر بچین.» و «یک قدم کوچک هم پیشرفت است.»
- **نشان‌واژه و لوگو:** یک قطعهٔ کریستالی/نقطهٔ نور در کنار wordmark «Life OS»؛ در نسخهٔ اول با CSS ساخته می‌شود تا بدون asset خارجی خوانا بماند.
- **رنگ امضادار:** `#22D3EE` به‌عنوان cyan تمرکز.

## ساختار پروژه
- `src/main.tsx`: نقطهٔ ورود React و providerها.
- `src/App.tsx`: router و shell صفحات.
- `src/components/layout`: Sidebar، Header، MobileDrawer و layout responsive.
- `src/components/ui`: GlassCard، Badge، ProgressRing، Button و primitiveهای قابل استفادهٔ مجدد.
- `src/pages`: Dashboard و صفحات placeholder ماژول‌ها با route مستقل.
- `src/data`: دادهٔ نمونهٔ تایپ‌شده برای نمای امروز.
- `src/styles/globals.css`: فونت، توکن‌های dark/light، reset و breakpointها.
- `public/manus-routes.json`: manifest کامل routeهای فعلی.
- `public/manifest.webmanifest`: metadata نصب‌پذیری اپلیکیشن.
- `api/` و `shared/`: در فاز احراز هویت و persistence اضافه می‌شوند.

## فازبندی
- **فاز ۱:** shell responsive، داشبورد امروز، تم، ناوبری، drawer موبایل، search UI، skeleton/empty states و routeهای اصلی.
- **فاز ۲:** auth واقعی، profile/session، tasks، calendar، weekly template، pomodoro و routines با persistence.
- **فاز ۳:** finance، notes، reading/movies، goals، daily reports، global search، export/import و module management.
- **فاز ۴:** PWA نهایی، اتصال production به MongoDB Atlas، سخت‌سازی، تست مسیرها، accessibility و Lighthouse.

## قیود اجرایی
- هیچ رنگ hardcode شده‌ای در کامپوننت‌ها قرار نمی‌گیرد؛ توکن‌ها فقط در globals هستند.
- تمام صفحه‌ها باید در 360px، تبلت و دسکتاپ usable بمانند؛ جدول‌ها و نمودارهای آینده overflow کنترل‌شده دارند.
- هیچ تصویر تزئینی عمومی برای dashboard اضافه نمی‌شود؛ داشبورد ابزار داخلی است و داده باید قهرمان UI باشد.
- Preview با relative URL کار می‌کند و cookieهای آینده برای iframe با `SameSite=None; Secure` تنظیم می‌شوند.
