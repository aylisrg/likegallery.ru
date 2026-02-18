# Галерея ЛИК — likegallery.ru

Сайт галереи восточного искусства. Фокус на inbound sourcing — конверсия посетителей в покупателей через WhatsApp / Telegram / WeChat.

## Стек

- **Next.js 15** (App Router, TypeScript)
- **Sanity.io** (headless CMS, Studio встроен по `/studio`)
- **Tailwind CSS**
- **Vercel** (автодеплой при пуше в main)

## Быстрый старт

```bash
npm install
cp .env.local.example .env.local
# Заполнить .env.local — Sanity project ID и контакты
npm run dev
```

## Настройка Sanity

1. Создать проект: `npx sanity init` (или создать вручную на sanity.io/manage)
2. Скопировать `projectId` в `.env.local`
3. Открыть `http://localhost:3000/studio` — Sanity Studio встроен

## Настройка ISR Webhook (для обновления страниц при изменениях в CMS)

1. В sanity.io → Manage → API → Webhooks → Add webhook
2. URL: `https://likegallery.ru/api/revalidate`
3. HTTP Method: POST
4. Trigger: Create, Update, Delete
5. Filter: `_type == "item" || _type == "serviceCase"`
6. Projection: `{ _type, "slug": slug.current }`
7. HTTP Headers: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`

## Переменные окружения (Vercel)

Добавить в Vercel Dashboard → Project → Settings → Environment Variables:
- все переменные из `.env.local.example`

## Структура

```
src/app/           — страницы (Next.js App Router)
src/components/    — React компоненты
src/lib/sanity/    — Sanity client, image builder, GROQ queries
src/sanity/schemas/ — Sanity схемы данных
src/types/         — TypeScript типы
sanity.config.ts   — Конфигурация Sanity Studio
```
