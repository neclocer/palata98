# Palata98 — Интернет-магазин одежды

> Сайт интернет-магазина одежды с необычной концепцией
> React + TypeScript + Express + Prisma
> NECLOCER DEV · 2025

---

## Стек

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion — анимации
- React Router — навигация

**Backend:**
- Express.js + TypeScript
- Prisma ORM
- SQLite
- JWT авторизация

---

## Структура

```
palata98/
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx       — главная с видео-баннером
│   │   ├── CatalogPage.tsx    — каталог товаров
│   │   ├── ProductPage.tsx    — страница товара
│   │   ├── CartPage.tsx       — корзина
│   │   ├── AboutPage.tsx      — о нас
│   │   ├── ContactsPage.tsx   — контакты
│   │   ├── ShippingPage.tsx   — доставка
│   │   └── AdminPage.tsx      — панель админа
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── ui/                — shadcn компоненты
│   ├── contexts/
│   │   ├── CartContext.tsx    — состояние корзины
│   │   └── ProductsContext.tsx
│   └── data/
│       └── products.ts        — типы и данные товаров
└── server/
    ├── src/
    │   ├── routes/
    │   │   ├── products.ts
    │   │   ├── orders.ts
    │   │   ├── customers.ts
    │   │   └── admin.ts
    │   ├── middleware/
    │   │   └── auth.ts        — JWT middleware
    │   └── index.ts           — Express сервер
    └── script/
        ├── seed.ts            — заполнение БД
        └── reset-db.ts
```

---

## Запуск

```bash
# Установка зависимостей
npm install

# Запуск фронтенда
npm run dev

# Запуск бэкенда
cd server && npm install && npm run dev
```

---

## Переменные окружения

Создай `.env` в папке `server/`:

```env
PORT=3001
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

*NECLOCER DEV · 2025 · Telegram: @neclocer*
