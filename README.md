# Palata98 — Интернет-магазин одежды

> Сайт интернет-магазина одежды с необычной концепцией
> React + TypeScript + Express + Prisma
> NECLOCER DEV · 2025  
> Проект закрыт — разработка приостановлена

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

## Что реализовано

- Главная страница с видео-баннером
- Каталог товаров
- Страница отдельного товара
- Страница "О нас", "Контакты", "Доставка"
- Панель администратора (базовая)
- REST API: товары, заказы, клиенты, админ
- JWT middleware для защищённых роутов
- Rate limiting и security headers (helmet)

---

## Что не реализовано

- **Корзина** — страница `CartPage.tsx` существует, но нет полноценной логики добавления/удаления, подсчёта итогов и оформления
- **Авторизация пользователей** — JWT middleware есть, но нет страницы входа и регистрации
- **Оформление заказа** — роут в API есть, UI отсутствует
- **Личный кабинет покупателя** — не реализован
- **Поиск и фильтрация товаров** — в каталоге нет фильтров по цене, категории и т.д.
- **Пагинация** — каталог загружает все товары сразу
- **Оплата** — интеграция с платёжными системами не подключена
- **Адаптив** — мобильная версия частично сырая

---

## Структура

```
palata98/
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx       — главная с видео-баннером ✅
│   │   ├── CatalogPage.tsx    — каталог товаров ✅
│   │   ├── ProductPage.tsx    — страница товара ✅
│   │   ├── CartPage.tsx       — корзина ❌ не доделана
│   │   ├── AboutPage.tsx      — о нас ✅
│   │   ├── ContactsPage.tsx   — контакты ✅
│   │   ├── ShippingPage.tsx   — доставка ✅
│   │   └── AdminPage.tsx      — панель админа ⚠️ базовая
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/                — shadcn компоненты
│   ├── contexts/
│   │   ├── CartContext.tsx    — состояние корзины ⚠️ частично
│   │   └── ProductsContext.tsx
│   └── data/
│       └── products.ts
└── server/
    ├── src/
    │   ├── routes/
    │   │   ├── products.ts    ✅
    │   │   ├── orders.ts      ⚠️ без UI
    │   │   ├── customers.ts   ⚠️ без UI
    │   │   └── admin.ts       ✅
    │   ├── middleware/
    │   │   └── auth.ts        ✅
    │   └── index.ts
    └── script/
        ├── seed.ts
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
